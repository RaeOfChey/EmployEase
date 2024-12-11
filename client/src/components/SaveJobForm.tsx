import React, { useState } from 'react';

// Define the structure of the job object
interface Job {
    jobTitle: string;
    company: { name: string };
    locations: { name: string }[];
    content: string;
    datePublished: string;
    levels: { name: string }[];
    jobId: number;
    refs: { landingPage: string };
    priorityStatus: string;
}

interface SaveJobFormProps {
    onSaveJob: (job: Job) => void;
    handleModalClose: () => void; // Add this prop
}

const SaveJobForm: React.FC<SaveJobFormProps> = ({ onSaveJob, handleModalClose }) => {
    const [jobDetails, setJobDetails] = useState<Job>({
        jobTitle: '',
        company: { name: '' },
        locations: [{ name: '' }],
        content: '',
        datePublished: '',
        levels: [{ name: '' }],
        jobId: 0,
        refs: { landingPage: '' },
        priorityStatus: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        if (name === 'levels') {
          setJobDetails(prevState => ({
            ...prevState,
            levels: prevState.levels.map((level, index) =>
              index === 0 ? { ...level, name: value } : level
            ),
          }));
        } else if (name === 'company') {
            setJobDetails(prevState => ({
              ...prevState,
              company: { ...prevState.company, name: value },
            }));
        } else if (name === 'locations') {
          setJobDetails(prevState => ({
            ...prevState,
            locations: prevState.locations.map((location, index) =>
              index === 0 ? { ...location, name: value } : location
            ),
          }));
        } else if (name === 'refs') {
          setJobDetails(prevState => ({
            ...prevState,
            refs: { ...prevState.refs, landingPage: value },
          }));
        } else {
          setJobDetails(prevState => ({
            ...prevState,
            [name]: value,
          }));
        }
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const jobId = jobDetails.jobId;
        if (!jobId) {
            console.error("Job ID is missing. Cannot save job.");
            return;
        }
        onSaveJob(jobDetails);
        setJobDetails({
            jobTitle: '',
            company: { name: '' },
            locations: [{ name: '' }],
            content: '',
            datePublished: '',
            levels: [{ name: '' }],
            jobId: 0,
            refs: { landingPage: '' },
            priorityStatus: '',
        });
        handleModalClose();
    };

    return (
        <div className="custom-form-box">
            <form onSubmit={handleSubmit} className="save-job-form">
                <div>
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={jobDetails.jobTitle}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="company">Company Name</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={jobDetails.company.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="locations">Job Location</label>
                    <input
                        type="text"
                        id="locations"
                        name="locations"
                        value={jobDetails.locations[0].name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Job Description</label>
                    <textarea
                        id="content"
                        name="content"
                        value={jobDetails.content}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="datePublished">Job Publication Date</label>
                    <input
                        type="date"
                        id="datePublished"
                        name="datePublished"
                        value={jobDetails.datePublished}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="levels">Experience Level</label>
                    <select
                        id="levels"
                        name="levels"
                        value={jobDetails.levels[0].name}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Experience Level</option>
                        <option value="internship">Internship</option>
                        <option value="entry-level">Entry Level</option>
                        <option value="associate">Associate</option>
                        <option value="mid-senior-level">Mid-Senior Level</option>
                        <option value="director">Director</option>
                        <option value="executive">Executive</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="jobId">Job ID: `must be unique`</label>
                    <input
                        type="text"
                        id="jobId"
                        name="jobId"
                        value={jobDetails.jobId === 0 ? '' : jobDetails.jobId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="refs">Referral Link</label>
                    <input
                        type="url"
                        id="refs"
                        name="refs"
                        value={jobDetails.refs.landingPage}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="priorityStatus">Priority Status</label>
                    <select
                        id="priorityStatus"
                        name="priorityStatus"
                        value={jobDetails.priorityStatus}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="interest">Interested</option>
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Job Offered</option>
                        <option value="offer">Not Selected</option>
                    </select>
                </div>
                <button type="submit" className="btn custom-save-button"
                >
                    Save Job
                </button>
            </form>
        </div>
    );
};

export default SaveJobForm;