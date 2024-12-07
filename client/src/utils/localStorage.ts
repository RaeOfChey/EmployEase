export const getSavedJobIds = () => {
  const savedJobIds = localStorage.getItem('saved_jobs')
    ? JSON.parse(localStorage.getItem('saved_jobs')!)
    : [];

  return savedJobIds;
};

export const saveJobIds = (jobIdArr: string[]) => {
  if (jobIdArr.length) {
    localStorage.setItem('saved_jobs', JSON.stringify(jobIdArr));
  } else {
    localStorage.removeItem('saved_jobs');
  }
};

export const removeJobId = (jobId: string) => {
  const savedJobIds = localStorage.getItem('saved_jobs')
    ? JSON.parse(localStorage.getItem('saved_jobs')!)
    : null;

  if (!savedJobIds) {
    return false;
  }

  const updatedSavedJobIds = savedJobIds?.filter((savedJobId: string) => savedJobId !== jobId);
  localStorage.setItem('saved_jobs', JSON.stringify(updatedSavedJobIds));

  return true;
};
