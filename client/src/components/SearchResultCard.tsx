// import { useState } from 'react';
// import type { FormEvent } from 'react';
// import { Container, Col, Button, Row, Modal } from 'react-bootstrap';
// import Auth from '../utils/auth';
// import { searchMuseJobs } from '../../../server/src/routes/api/API';
// import type { Job } from '../models/Job';
// import { useMutation } from '@apollo/client';
// import { SAVE_JOB } from '../utils/mutations';
// import { GET_ME } from '../utils/queries';
// import FilterBar from '../components/FilterBar';
// import { MuseApiInfo } from '../models/MuseApiJobs';

// const SearchJobs = () => {
//   const [location, setLocation] = useState<string[]>(['United States']);
//   const [industry, setIndustry] = useState<string[]>(['IT']);
//   const [experience, setExperience] = useState<string[]>(['Entry Level']);
//   const [searchJobs, setSearchJobs] = useState<Job[]>([]);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);

//   const [saveJob] = useMutation(SAVE_JOB, {
//     update(cache, { data: { saveJob } }) {
//       try {
//         const { me }: any = cache.readQuery({ query: GET_ME });

//         cache.writeQuery({
//           query: GET_ME,
//           data: {
//             me: {
//               ...me,
//               savedJobs: [...me.savedJobs, saveJob],
//             },
//           },
//         });
//       } catch (err) {
//         console.error('Error updating cache:', err);
//       }
//     },
//   });

//   const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await searchMuseJobs(location, industry, experience);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const { results } = await response.json();

//       const jobData: Job[] = results.map((job: MuseApiInfo) => {
//         return {
//           jobId: job.id,
//           content: job.contents,
//           jobTitle: job.name,
//           datePublished: job.publication_date,
//           refs: { landingPage: job.refs.landing_page },
//           levels: job.levels.map(level => ({ name: level.name })),
//           locations: job.locations.map(location => ({ name: location.name })),
//           company: { name: job.company.name },
//         };
//       });

//       setSearchJobs(jobData);

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSaveJob = async (jobId: string) => {
//     const jobToSave: Job = searchJobs.find((job) => job.jobId === Number(jobId))!;

//     if (!jobToSave) {
//       console.error('Job not found in searchJobs');
//       return;
//     }

//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       await saveJob({ variables: { input: jobToSave } });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleJobClick = (job: Job) => {
//     setSelectedJob(job);
//   };

//   const handleCloseModal = () => {
//     setSelectedJob(null);
//   };

//   return (
//     <>
//       <div className="text-light">
//         <Container>
//           <FilterBar
//             location={location}
//             setLocation={setLocation}
//             industry={industry}
//             setIndustry={setIndustry}
//             experience={experience}
//             setExperience={setExperience}
//             handleFormSubmit={handleFormSubmit}
//           />
//         </Container>
//       </div>

//       <Container>
//         <Row>
//           {/* Render job cards after search */}
//           {searchJobs.map((job) => (
//             <Col key={job.jobId} md={4}>
//               <div className="job-card">
//                 <h3>{job.jobTitle}</h3>
//                 <p>{job.company.name}</p>
//                 <p>{job.locations.map((loc) => loc.name).join(', ')}</p>
//                 <Button
//                   variant="primary"
//                   onClick={() => handleSaveJob(job.jobId.toString())}
//                 >
//                   Save Job
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   onClick={() => handleJobClick(job)}
//                 >
//                   See More
//                 </Button>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Job Detail Modal */}
//       {selectedJob && (
//         <Modal
//         className="job-detail-modal"
//         show={Boolean(selectedJob)}
//         onHide={handleCloseModal}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedJob.jobTitle}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <p>{selectedJob.content}</p>
//             <p>Company: {selectedJob.company.name}</p>
//             <p>
//               Location: {selectedJob.locations.map((loc) => loc.name).join(', ')}
//             </p>
//             <p>
//               Experience Level: {selectedJob.levels.map((level) => level.name).join(', ')}
//             </p>
//             <p>Published: {selectedJob.datePublished}</p>
//             <Button
//               className="btn-save-job"
//               variant="primary"
//               onClick={() => handleSaveJob(selectedJob.jobId.toString())}
//             >
//               Save Job
//             </Button>
//           </Modal.Body>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default SearchJobs;