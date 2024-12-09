import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Card,
  Container,
  Col,
  Button,
  Row,
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchMuseJobs } from '../../../server/src/routes/api/API';
import type { Job } from '../models/Job';
import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import FilterBar from '../components/FilterBar';
import { MuseApiInfo } from '../models/MuseApiJobs';
import SearchResultCard from '../components/SearchResultCard';  // Ensure the path is correct

import SaveJobForm from '../components/SaveJobForm';

const SearchJobs = () => {
  const [showJobForm, setShowJobForm] = useState(false);

  const [location, setLocation] = useState<string[]>(['United States']);
  const [industry, setIndustry] = useState<string[]>(['IT']);
  const [experience, setExperience] = useState<string[]>(['Entry Level']);
  const [searchJobs, setSearchJobs] = useState<Job[]>([]);

  const [saveJob] = useMutation(SAVE_JOB, {
    refetchQueries: [
      {
        query: GET_ME,
      }
    ]
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await searchMuseJobs(location, industry, experience);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }


      // const data = await response.json();
      // console.log('Full response data:', data);

      const { results } = await response.json();

      const jobData: Job[] = results.map((job: MuseApiInfo) => {
        console.log(job.contents);
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
      console.log(`jobData:`, jobData)

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
        <h2 className='pt-5'>
          {searchJobs.length
            ? `Viewing ${searchJobs.length} results:`
            : 'Job Results'}
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowJobForm(!showJobForm)}
          className="custom-toggle-button"
        >
          {showJobForm ? 'Cancel' : 'Input a job'}
        </Button>

        {/* Conditionally render the SaveJobForm */}
        {showJobForm && <SaveJobForm />}

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
        </Row>
      </Container>
    </>
  );
};

export default SearchJobs;