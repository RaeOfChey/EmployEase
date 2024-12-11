import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import type { User } from '../models/User';
import type { Job } from '../models/Job';
import { REMOVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { APPLY_JOB } from '../utils/mutations';

//import SaveJobForm from '../components/SaveJobForm';

const SavedJobs = () => {


  const { loading, data } = useQuery(GET_ME);
  const [removeJob] = useMutation(REMOVE_JOB, { refetchQueries: [{ query: GET_ME }], });
  const [applyJob] = useMutation(APPLY_JOB, { refetchQueries: [{ query: GET_ME }], })

  const userData: User = data?.me || {};


  // create function that accepts the jobs's mongo _id value as param and deletes the job from the database
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
      console.error("err: ", err);
    }
  };

  const handleJobApply = async (jobId: number) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await applyJob({ variables: { jobId } });

      if (!response) {
        throw new Error('something went wrong!');
      }
    } catch (err) {
      console.error("err: ", err);
    }
  };


  //if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light'>
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
            ? `Viewing ${userData?.savedJobs?.length} saved ${userData?.savedJobs?.length === 1 ? 'job' : 'jobs'
            }:`
            : 'You have no saved jobs. Search for jobs and save them to view later here.'}
        </p>
        <Row id="job-cards-container"
          className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 d-flex flex-wrap">
          {userData?.savedJobs?.map((job: Job) => (
            <Col key={job.jobId} md={4}>
              <Card className='mb-4' style={{ backgroundColor: job.applied ? 'lightgreen' : undefined }}>
                <Card.Header style={{ backgroundColor: job.applied ? '#82d681' : undefined }}>
                  <Card.Title>{job.jobTitle}</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>{job.company?.name}</Card.Subtitle>
                </Card.Header>
                <Card.Body style={{ backgroundColor: job.applied ? '#82d681' : undefined }}>
                  <Card.Link
                    href={job.refs?.landingPage}
                    target='_blank'
                    rel='noreferrer'
                  >
                    See job posting
                  </Card.Link>
                </Card.Body>
                <Card.Footer
                  style={{ backgroundColor: job.applied ? '#82d681' : undefined }}
                  className="d-flex justify-content-between"
                >
                  <Button
                    variant="success"
                    onClick={() => handleJobApply(job.jobId)}
                  >
                    {job.applied ? 'Applied' : 'Apply'}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteJob(job.jobId)}
                  >
                    Delete this job
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedJobs;
