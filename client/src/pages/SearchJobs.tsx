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
  const [location, setLocation] = useState<string[]>(['United States']);
  const [industry, setIndustry] = useState<string[]>(['IT']);
  const [experience, setExperience] = useState<string[]>(['Entry Level']);
  const [searchJobs, setSearchJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [saveJob] = useMutation(SAVE_JOB, {
    update(cache, { data: { saveJob } }) {
      try {
        const { me }: any = cache.readQuery({ query: GET_ME });

        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...me,
              savedJobs: [...me.savedJobs, saveJob],
            },
          },
        });
      } catch (err) {
        console.error('Error updating cache:', err);
      }
    },
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await searchMuseJobs(location.join(', '), industry.join(', '), experience.join(', '));

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
  };

  const handleSaveJob = async (jobId: string) => {
    const jobToSave: Job = searchJobs.find((job) => job.jobId === jobId)!;

    if (!jobToSave) {
      console.error('Job not found in searchJobs');
      return;
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveJob({ variables: { input: jobToSave } });
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
            : 'Job Results'}
        </h2>
  
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
