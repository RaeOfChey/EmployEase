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

  const [saveJob] = useMutation(SAVE_JOB, {
    refetchQueries: [
      {
        query: GET_ME,
      }
    ]
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formatArrayForQuery = (array: string[], prefix: string) => {
      return array
        .filter((item) => item) // Ensure no empty strings
        .map((item) => `${prefix}${encodeURIComponent(item)}`) // Prepend the prefix and encode
        .join('&'); // Join with "&"
    };
  
    // Format each array with the appropriate prefix
    const locationParam = formatArrayForQuery(location, 'location=');
    const industryParam = formatArrayForQuery(industry, 'category=');
    const experienceParam = formatArrayForQuery(experience, 'level=');

    try {
      const response = await searchMuseJobs([locationParam], [industryParam], [experienceParam]);

      const queryParams = [locationParam, industryParam, experienceParam]
      .filter((param) => param) // Ensure no empty sections
      .join('&'); // Join with "&"
      console.log('Query Parameters:', queryParams);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }


      // const data = await response.json();
      // console.log('Full response data:', data);

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
  };

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
            ? `Viewing ${searchJobs.length} results:`
            : 'No results found. please change your parameters and try again.'}
        </h2>
  
        {/* Save Job Form Toggle Button */}
        <Button
          variant="success"
          className="mb-4"
          onClick={() => setShowJobForm(!showJobForm)}
        >
          {showJobForm ? 'Cancel' : 'Add a Job'}
        </Button>
<<<<<<< HEAD

        {/* Conditionally render the SaveJobForm */}
        {/* {showJobForm && <SaveJobForm />} */}

        <Row>
          {/* Render searched job results here */}
          {searchJobs.map((job) => {
            return (
              <Col key={job.jobId} md={4}>
                <Card className="custom-job-card">
                  <Card.Body>
                    <Card.Title>{job.jobTitle}</Card.Title>
                    <Card.Text>{job.content}</Card.Text>
                    <Card.Text>Company: {job.company.name}</Card.Text>
                    <Card.Text>Location: {job.locations.map(location => location.name).join(', ')}</Card.Text>
                    <Card.Text>Experience Level: {job.levels.map(level => level.name).join(', ')}</Card.Text>
                    <Card.Text>Published: {job.datePublished}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleSaveJob(job.jobId)}
                    >
                      Save Job
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
=======
  
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
>>>>>>> develop
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
