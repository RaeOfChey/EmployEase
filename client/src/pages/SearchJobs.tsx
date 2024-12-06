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
import { searchMuseJobs} from '../../../server/src/routes/api/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import type { Book } from '../models/Book';
import type { GoogleAPIBook } from '../models/GoogleAPIBook';

import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import FilterBar from '../components/FilterBar';

import SaveJobForm from '../components/SaveJobForm';


const SearchBooks = () => {
  const [showJobForm, setShowJobForm] = useState(false);

  //const [saveBook] = useMutation(SAVE_BOOK);

  const [saveBook] = useMutation(SAVE_JOB, {
    update(cache, { data: { saveBook } }) {
      try {
        const { me }: any = cache.readQuery({ query: GET_ME });

        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...me,
              savedBooks: [...me.savedBooks, saveBook],
            },
          },
        });
      } catch (err) {
        console.error('Error updating cache:', err);
      }
    },
  });

  // create state for holding returned google api data
  const [searchedBooks] = useState<Book[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('United States');
  const [industry, setIndustry] = useState('IT');
  const [experience, setExperience] = useState('Entry Level');


  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());



  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    saveBookIds(savedBookIds);
  }, [savedBookIds]);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (!searchInput) {
    //   return false;
    // }
    //location, industry and experience leve
    try {
      //const response = await searchGoogleBooks(searchInput);
      const response = await searchMuseJobs(location, industry, experience);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }



      const { results:items } = await response.json();


      console.log("results:items ")
      console.log(items)
      


      //const { items } = await response.json();
      // const data = await response.json();

      // console.log("data: ")
      // console.log(data)


      // if (!items) {
      //   throw new Error('No books found!');
      // }

      // const bookData = items.map((book: GoogleAPIBook) => ({
      //   bookId: book.id,
      //   authors: book.volumeInfo.authors || ['No author to display'],
      //   title: book.volumeInfo.title,
      //   description: book.volumeInfo.description,
      //   image: book.volumeInfo.imageLinks?.thumbnail || '',
      // }));

      // setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId: string) => {
    // find the book in `searchedBooks` state by the matching id

    const bookToSave: Book = searchedBooks.find((book) => book.bookId === bookId)!;

    if (!bookToSave) {
      console.error('Book not found in searchedBooks');
      return;
    }
    
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveBook({ variables: { input: bookToSave } });

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
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
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
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
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;