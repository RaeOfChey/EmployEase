import { useState, FormEvent } from 'react';
import { Container, Col, Button, Row, Modal } from 'react-bootstrap';
import Auth from '../utils/auth';
import { searchMuseJobs } from '../../../server/src/routes/api/API';
import type { Job } from '../models/Job';
import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import FilterBar from '../components/FilterBar';
import { MuseApiInfo } from '../models/MuseApiJobs';
import SaveJobForm from '../components/SaveJobForm';

const SearchJobs = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [location, setLocation] = useState<string[]>(['']);
  const [industry, setIndustry] = useState<string[]>(['']);
  const [experience, setExperience] = useState<string[]>(['']);
  const [searchJobs, setSearchJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [recentParams, setRecentParams] = useState({
    location: [''],
    industry: [''],
    experience: [''],
  });

  const [saveJob] = useMutation(SAVE_JOB, {
    refetchQueries: [
      {
        query: GET_ME,
      }
    ]
  });

  const formatArrayForQuery = (array: string[], prefix: string) => {
    return array
      .filter((item) => item) // Ensure no empty strings
      .map((item) => `${prefix}${encodeURIComponent(item)}`) // Prepend the prefix and encode
      .join('&'); // Join with "&"
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  
    // Format each array with the appropriate prefix
    const locationParam = formatArrayForQuery(location, 'location=');
    const industryParam = formatArrayForQuery(industry, 'category=');
    const experienceParam = formatArrayForQuery(experience, 'level=');

    setCurrentPage(1);
    setRecentParams({ location, industry, experience });

    try {
      const response = await searchMuseJobs([locationParam], [industryParam], [experienceParam], 1);

      const queryParams = [locationParam, industryParam, experienceParam]
      .filter((param) => param) // Ensure no empty sections
      .join('&'); // Join with "&"
      console.log('Query Parameters:', queryParams);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }


      // const data = await response.json();
      // console.log('Full response data:', data);

      const { results, page_count } = await response.json();

      const jobData: Job[] = results.map((job: MuseApiInfo) => {
        return {
          jobId: job.id,
          content: job.contents,
          jobTitle: job.name,
          datePublished: job.publication_date,
          refs: { landingPage: job.refs.landing_page },
          levels: job.levels.map(level => ({ name: level.name })),
          locations: job.locations.map(location => ({ name: location.name })),
          company: { name: job.company.name },
        };
      });

      setSearchJobs(jobData);
      setPageCount(page_count);

    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > pageCount) {
      return;
    }

    setCurrentPage(page);

    const locationParam = formatArrayForQuery(recentParams.location, 'location=');
    const industryParam = formatArrayForQuery(recentParams.industry, 'category=');
    const experienceParam = formatArrayForQuery(recentParams.experience, 'level=');

    try {
      const response = await searchMuseJobs([locationParam], [industryParam], [experienceParam], page);

    if (!response.ok) {
      throw new Error('something went wrong!');
    }

    const { results } = await response.json();
    const jobData: Job[] = results.map((job: MuseApiInfo) => {
      return {
        jobId: job.id,
        content: job.contents,
        jobTitle: job.name,
        datePublished: job.publication_date,
        refs: { landingPage: job.refs.landing_page },
        levels: job.levels.map(level => ({ name: level.name })),
        locations: job.locations.map(location => ({ name: location.name })),
        company: { name: job.company.name },
      };
    });

    setSearchJobs(jobData);

    } catch (err) {
      console.error(err);
    }
  }

  // create function to handle saving a job to our database
  const handleSaveJob = async (jobId: number) => {
    // find the job in `searchedjobs` state by the matching id

    const jobToSave: Job = searchJobs.find((job) => job.jobId === jobId)!;
    console.log(jobToSave);
    console.log("jobId type:", typeof jobToSave.jobId);
    console.log("jobToSave (before mutation):", JSON.stringify(jobToSave.jobId, null, 2));
    console.log("Mutation variables:", { input: jobToSave });

    if (!jobToSave) {
      console.error('Job not found in searchJobs');
      return;
    }

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveJob({ variables: { input: jobToSave } });
      console.log(`this is after the save`, jobToSave)

    } catch (err) {
      console.error(err);
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <div className="text-light">
        <Container>
          <FilterBar
            location={location}
            setLocation={setLocation}
            industry={industry}
            setIndustry={setIndustry}
            experience={experience}
            setExperience={setExperience}
            handleFormSubmit={handleFormSubmit}
          />
        </Container>
      </div>
  
      <Container>
        {/* Header */}
        <h2 className="search-page-header">
          {searchJobs.length
            ? `Viewing ${searchJobs.length} results on page ${currentPage}:`
            : 'No results found. please change your parameters and try again.'}
        </h2>
        {pageCount > 1?
          <div>
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <span>
              Page {currentPage} of {pageCount - 1}
            </span>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount -1}>
              Next
            </Button>
          </div>: null}
  
        {/* Save Job Form Toggle Button */}
        <Button
          variant="success"
          className="mb-4"
          onClick={() => setShowJobForm(!showJobForm)}
        >
          {showJobForm ? 'Cancel' : 'Add a Job'}
        </Button>
  
        {/* Conditionally render SaveJobForm */}
        {showJobForm && (
          <SaveJobForm
            onSaveJob={(job) => {
              console.log("Saved job:", job);
              setShowJobForm(false); // Optionally close form after saving
            }}
          />
        )}
  
        {/* Job Cards Container */}
        <Row
          id="job-cards-container"
          className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 d-flex flex-wrap"
        >
          {searchJobs.map((job) => (
            <Col md={4} sm={6} xs={12} key={job.jobId}>
              <div className="job-card d-flex flex-column h-100">
                <h3>{job.jobTitle}</h3>
                <p>{job.company.name}</p>
                <p>{job.locations.map((loc) => loc.name).join(', ')}</p>
  
                <div className="d-flex justify-content-between mt-auto">
                  <Button
                    id={`see-more-job-btn`}
                    variant="secondary"
                    onClick={() => handleJobClick(job)}
                  >
                    See More
                  </Button>
  
                  <Button
                    id={`save-job-btn`}
                    variant="primary"
                    onClick={() => handleSaveJob(job.jobId)}
                  >
                    Save Job
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
  
      {/* Job Detail Modal */}
      {selectedJob && (
        <Modal show={Boolean(selectedJob)} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob.jobTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedJob.content}</p>
            <p>Company: {selectedJob.company.name}</p>
            <p>
              Location: {selectedJob.locations.map((loc) => loc.name).join(', ')}
            </p>
            <p>
              Experience Level: {selectedJob.levels
                .map((level) => level.name)
                .join(', ')}
            </p>
            <p>Published: {selectedJob.datePublished}</p>
            <Button
              variant="primary"
              onClick={() => handleSaveJob(selectedJob.jobId)}
            >
              Save Job
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </>
  );  
}
export default SearchJobs;
