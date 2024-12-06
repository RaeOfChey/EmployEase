import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';


import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import type { User } from '../models/User';
import type { Book } from '../models/Book';


import { REMOVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';



const SavedBooks = () => {


  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_JOB, {refetchQueries: [{ query: GET_ME }],});
  
  //const [removeBook] = useMutation(REMOVE_BOOK, { refetchQueries: 'GET_ME'});

  const userData: User = data?.me || {};


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({ variables: { bookId }});

      if (!response) {
        throw new Error('something went wrong!');
      }

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error("err: ", err);
    }
  };

  //if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData?.username ? (
            <h1>{userData?.username}, here are your saved jobs</h1>
          ) : (
            <h1>Saved jobs</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData?.savedBooks?.length
            ? `Viewing ${userData?.savedBooks?.length} saved ${
                userData?.savedBooks?.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved jobs. Search for jobs and save them to view later here.'}
        </h2>
        <Row>
          {userData?.savedBooks?.map((book: Book) => {
            return (
              <Col key={book.bookId} md='4'>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
