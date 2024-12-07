import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
//import { searchGoogleBooks } from '../../../server/src/routes/api/API';
import { searchMuseJobs } from '../../../server/src/routes/api/API';
import type { Job } from '../models/Job';
import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import FilterBar from '../components/FilterBar';

// import SaveJobForm from '../components/SaveJobForm';


const SearchJobs = () => {
  const [showJobForm, setShowJobForm] = useState(false);

  //const [saveJob] = useMutation(SAVE_JOB);
  // create state for holding returned google api data
  const [searchedJobs] = useState<Job[]>([]);
  // create state for holding our search field data
  const [location, setLocation] = useState('United States');
  const [industry, setIndustry] = useState('IT');
  const [experience, setExperience] = useState('Entry Level');
  const [searchJobs, setSearchJobs] = useState<Job[]>([]);



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


  // create method to search for jobs and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (!searchInput) {
    //   return false;
    // }
    //location, industry and experience leve
    try {
      const response = await searchMuseJobs(location, industry, experience);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }


      // const data = await response.json();
      // console.log('Full response data:', data);

      const { results } = await response.json();

      console.log("results")
      console.log(results)

      //parse out data to match interface

      setSearchJobs(results)

    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a job to our database
  const handleSaveJob = async (jobId: string) => {
    // find the job in `searchedjobs` state by the matching id

    const jobToSave: Job = searchedJobs.find((job) => job.jobId === jobId)!;

    if (!jobToSave) {
      console.error('Job not found in searchedJobs');
      return;
    }
    
    // get token
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
          {searchedJobs.length
            ? `Viewing ${searchedJobs.length} results:`
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
        {/* {showJobForm && <SaveJobForm />} */}

        <Row>
          {/* Render searched job results here */}
        </Row>
      </Container>
    </>
  );
};

export default SearchJobs;