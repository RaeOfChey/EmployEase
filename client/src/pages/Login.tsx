import { useState, FormEvent, ChangeEvent } from "react";
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState("");

  const [loggin] = useMutation(LOGIN_USER);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


    if(!loginData.password || !loginData.username){
      setError(`Password or user name was not entered`);
      return ;
    }


    try {
      await loggin({ variables: loginData});

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        
        <h1>Login</h1>
        <p>{error}</p>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;
