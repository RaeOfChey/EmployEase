import React from 'react';

interface Ref {
  landingPage: string;
}

interface Level {
  name: string;
}

interface Location {
  name: string;
}

interface Company {
  name: string;
}

interface Job {
  jobId: string;
  content: string;
  jobTitle: string;
  datePublished: string;
  refs: Ref;
  levels: Level[];
  locations: Location[];
  company: Company;
}

interface SearchResultCardProps {
  job: Job;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ job }) => {


  return (
    <div className="search-result-card">
      <div className="company-info">
        <h3>{job.company.name}</h3>
        <p className="job-title">{job.jobTitle}</p>
        <p className="date-published">{job.datePublished}</p>
      </div>

      {/* Job Description Section */}
      <div className="job-description">
        {/* Render HTML content safely using dangerouslySetInnerHTML */}
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: job.content }}
        />
      </div>

      {/* Job Details Section */}
      <div className="job-details">
        <div className="locations">
          <strong>Locations:</strong>
          {job.locations.map((location, index) => (
            <span key={index}>
              {location.name}
              {index < job.locations.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        {/* Levels */}
        <div className="job-levels">
          <strong>Levels:</strong>
          {job.levels.map((level, index) => (
            <span key={index}>
              {level.name}
              {index < job.levels.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        {/* References */}
        <div className="refs">
          <strong>References:</strong>
          {job.refs?.landingPage && (
            <a href={job.refs.landingPage} target="_blank" rel="noopener noreferrer">
              {job.refs.landingPage}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
  
  export default SearchResultCard;