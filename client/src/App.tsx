// import './App.css';
// import { Outlet } from 'react-router-dom';

// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

// export default App;

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
    console.log('Token from localStorage:', token); // Debugging
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  console.log('authLink:', authLink);
console.log('httpLink:', httpLink);


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: '/graphql', // Ensure this matches your server's GraphQL endpoint
    cache: new InMemoryCache(),

});



console.log('Apollo Client Initialized:', client);

const App = () => (
    <ApolloProvider client={client}>
        <>
            <Navbar />
            <Outlet />
        </>
    </ApolloProvider>
);

export default App;
