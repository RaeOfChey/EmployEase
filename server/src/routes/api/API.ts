export const  searchMuseJobs = async (locationParam: string[], industryParam: string[], experienceParam: string[], page: number) => {

  if(locationParam){
    
  }

  if(industryParam){

  }

  if(experienceParam){
  }

  let data = await fetch(`https://www.themuse.com/api/public/jobs?${locationParam}&${industryParam}&${experienceParam}&page=${page}`);

  

  return fetch(`https://www.themuse.com/api/public/jobs?${locationParam}&${industryParam}&${experienceParam}&page=${page}`);
};


// https://www.themuse.com/api/public/jobs?level=Entry%20Level&level=Mid%20Level&level=Senior%20Level&level=management&level=Internship&location=United%20States&page=1


// https://www.themuse.com/api/public/jobs?level=Entry%20Level&level=Mid%20Level&level=Senior%20Level&level=management&level=Internship&location=Minneapolis%2C%20MN&page=1


// https://www.themuse.com/api/public/jobs?location=Minneapolis%2C%20MN&page=1

// https://www.themuse.com/api/public/jobs?category=IT&page=1