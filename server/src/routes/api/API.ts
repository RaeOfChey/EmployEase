

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchGoogleBooks = (query: string) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };



// export const searchGoogleBooks = (query: string) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };


export const searchMuseJobs = (myInput: string) => {
  return fetch(`https://www.themuse.com/api/public/jobs?location=United%20States&page=1`);
};


// https://www.themuse.com/api/public/jobs?level=Entry%20Level&level=Mid%20Level&level=Senior%20Level&level=management&level=Internship&location=United%20States&page=1


// https://www.themuse.com/api/public/jobs?level=Entry%20Level&level=Mid%20Level&level=Senior%20Level&level=management&level=Internship&location=Minneapolis%2C%20MN&page=1


// https://www.themuse.com/api/public/jobs?location=Minneapolis%2C%20MN&page=1

// https://www.themuse.com/api/public/jobs?category=IT&page=1