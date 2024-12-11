import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import type { User } from '../models/User';
import type { Job } from '../models/Job';
import { REMOVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { APPLY_JOB } from '../utils/mutations';

const SavedJobs = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeJob] = useMutation(REMOVE_JOB, { refetchQueries: [{ query: GET_ME }] });
  const [applyJob] = useMutation(APPLY_JOB, { refetchQueries: [{ query: GET_ME }] });

  const userData: User = data?.me || {};

  const [jobStatuses, setJobStatuses] = useState<{ [key: number]: string }>({});

  // Function to handle the job application status
  const handleJobApply = async (jobId: number, status: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await applyJob({ variables: { jobId, status } });

      if (!response) {
        throw new Error('something went wrong!');
      }

      // Update status of the job in the state
      setJobStatuses((prevState) => ({
        ...prevState,
        [jobId]: status,
      }));
    } catch (err) {
      console.error('err: ', err);
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeJob({ variables: { jobId } });

      if (!response) {
        throw new Error('something went wrong!');
      }
    } catch (err) {
      console.error('err: ', err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light">
        <Container>
          {userData?.username ? (
            <h2 className="filter-bar-header">{userData?.username}, here are your saved jobs</h2>
          ) : (
            <h2 className="filter-bar-header">Saved jobs</h2>
          )}
        </Container>
      </div>
      <Container>
        <p className="intro-text">
          {userData?.savedJobs?.length
            ? `Viewing ${userData?.savedJobs?.length} saved ${userData?.savedJobs?.length === 1 ? 'job' : 'jobs'}:`
            : 'You have no saved jobs. Search for jobs and save them to view later here.'}
        </p>
        <Row id="job-cards-container" className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 d-flex flex-wrap">
          {userData?.savedJobs?.map((job: Job) => {
            // Retrieve job status, defaulting to 'interested'
            const jobStatus = jobStatuses[job.jobId] || 'interested';

            return (
              <Col key={job.jobId} md={4}>
                <Card className="mb-4">
                  <Card.Header style={{ backgroundColor: jobStatus === 'applied' ? '#82d681' : undefined }}>
                    <Card.Title>{job.jobTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.company?.name}</Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Link href={job.refs?.landingPage} target="_blank" rel="noreferrer">
                      See job posting
                    </Card.Link>
                  </Card.Body>
                  <p className="job-status">Job Status:</p>
                  <Card.Footer className="d-flex justify-content-between">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="job-status-dropdown" className="btn-apply">
                        {jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1)}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          as="button"
                          onClick={() => handleJobApply(job.jobId, 'interested')}
                        >
                          Interested
                        </Dropdown.Item>

                        <Dropdown.Item
                          as="button"
                          onClick={() => handleJobApply(job.jobId, 'applying')}
                        >
                          Applying
                        </Dropdown.Item>

                        <Dropdown.Item
                          as="button"
                          onClick={() => handleJobApply(job.jobId, 'applied')}
                        >
                          Applied
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button variant="danger" onClick={() => handleDeleteJob(job.jobId)}>
                      Delete this job
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedJobs;