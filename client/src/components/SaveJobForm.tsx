import React, { useState } from 'react';

// Define the structure of the job object
interface Job {
    title: string;
    company: string;
    location: string;
    description: string;
    publicationDate: string;
    experienceLevel: string;
    companyId: string;
    referralLink: string;
    priorityStatus: string;
}

interface SaveJobFormProps {
    onSaveJob: (jobId: number) => void;
    handleModalClose: () => void; // Add this prop
}

const SaveJobForm: React.FC<SaveJobFormProps> = ({ onSaveJob, handleModalClose }) => {
    const [jobDetails, setJobDetails] = useState<Job>({
        title: '',
        company: '',
        location: '',
        description: '',
        publicationDate: '',
        experienceLevel: '',
        companyId: '',
        referralLink: '',
        priorityStatus: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setJobDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const jobId = jobDetails.companyId;
        if (!jobId) {
            console.error("Job ID is missing. Cannot save job.");
            return;
        }
        onSaveJob(Number(jobId));
        setJobDetails({
            title: '',
            company: '',
            location: '',
            description: '',
            publicationDate: '',
            experienceLevel: '',
            companyId: '',
            referralLink: '',
            priorityStatus: '',
        });
        handleModalClose();
    };

    return (
        <div className="custom-form-box">
            <form onSubmit={handleSubmit} className="save-job-form">
                <div>
                    <label htmlFor="title">Job Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={jobDetails.title}
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
                        value={jobDetails.company}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Job Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={jobDetails.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Job Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={jobDetails.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="publicationDate">Job Publication Date</label>
                    <input
                        type="date"
                        id="publicationDate"
                        name="publicationDate"
                        value={jobDetails.publicationDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="experienceLevel">Experience Level</label>
                    <select
                        id="experienceLevel"
                        name="experienceLevel"
                        value={jobDetails.experienceLevel}
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
                    <label htmlFor="companyId">Company ID</label>
                    <input
                        type="text"
                        id="companyId"
                        name="companyId"
                        value={jobDetails.companyId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="referralLink">Referral Link</label>
                    <input
                        type="url"
                        id="referralLink"
                        name="referralLink"
                        value={jobDetails.referralLink}
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
                <button type="submit" className="btn-save-custom-job-button"
                >
                    Save Job
                </button>
            </form>
        </div>
    );
};

export default SaveJobForm;