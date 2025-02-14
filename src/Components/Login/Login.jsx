import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    Email: "",
    Password: ""
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.Email === credentials.Email && user.Password === credentials.Password);
    if (user) {
      setError('');
      console.log("Login successful", user);
      navigate('/home'); 
    } else {
      setError('Invalid email or password');
    }
    setIsLoading(false);
  }

  function handleChange(e) {
    let myCredentials = { ...credentials };
    myCredentials[e.target.name] = e.target.value;
    setCredentials(myCredentials);
    console.log(myCredentials);
  }

  return (
    <>
     <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login page </title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
     <div style={{height:'80vh'}}>
     <div className="container border border-success rounded shadow shadow-lg w-50 mx-auto my-5 p-3 " >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Email" className="mb-1">
              Email
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="Email"
              placeholder="Email"
              name="Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="mb-1">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              className="form-control"
              id="Password"
              placeholder="Password"
              name="Password"
            />
          </div>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <button type="submit" className="my-2 btn btn-outline-success w-100" disabled={isLoading}>
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Login'}
          </button>
        </form>
      </div>
     </div>
    </>
  );
}
