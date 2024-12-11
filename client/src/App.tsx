import Footer from './components/Footer';

import {
    createHttpLink,
  } from '@apollo/client';
  
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';


const httpLink = createHttpLink({
    uri: '/graphql',
  });
  

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
     // Debugging
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });



const client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: '/graphql', // Ensure this matches your server's GraphQL endpoint
    cache: new InMemoryCache(),
});



const App = () => (
    <ApolloProvider client={client}>
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    </ApolloProvider>
);

export default App;
