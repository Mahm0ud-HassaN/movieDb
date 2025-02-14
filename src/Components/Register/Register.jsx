import React, { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Register() {
  const [user, setUser] = useState({
    First_Name: "",
    Last_Name: "",
    Age: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const validationResult = validation();
    if (!validationResult.error) {
      if (isEmailExist(user.Email)) {
        setEmailError('The email is already exist');
      } else {
         console.log('Email is available');
        saveUserDataToLocalStorage();
        setError('');
        setEmailError('');
        navigate('/login');
      }
    } else {
      setError(validationResult.error.details[0].message);
    }
    setIsLoading(false);
  }

  function isEmailExist(email) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.Email.toLowerCase() === email.toLowerCase());
  }

  function saveUserDataToLocalStorage() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    console.log("you registered successfully", user);
  }

  function validation() {
    let schema = Joi.object({
      First_Name: Joi.string().min(3).max(30).pattern(/^[a-zA-Z]+$/).required(),
      Last_Name: Joi.string().min(3).max(30).pattern(/^[a-zA-Z]+$/).required(),
      Age: Joi.number().min(18).max(60).required(),
      Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      Password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
      Confirm_Password: Joi.string().valid(Joi.ref('Password')).required().messages({
        "any.only": "Passwords must be the same",
      })
    });
    console.log(schema.validate(user));
    return schema.validate(user);
  }

  function handleChange(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Register page </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
 <div style={{height:'80vh'}}>
 <div className="container border border-success rounded shadow shadow-lg  w-50 mx-auto my-5 p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="First_Name" className="mb-1 ">
              first name
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="First_Name"
              placeholder="First Name"
              name="First_Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Last_Name" className="mb-1 ">
              last name
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="Last_Name"
              placeholder="Last Name"
              name="Last_Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="mb-1 ">
              age
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="age"
              placeholder="age"
              name="Age"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="mb-1 ">
              email
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="Email"
              placeholder="email"
              name="Email"
            />
            {emailError && <div className="alert alert-danger">{emailError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="mb-1 ">
              password
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="Password"
              placeholder="Password"
              name="Password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Confirm_Password" className="mb-1 ">
              confirm password
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="Confirm_Password"
              placeholder="Confirm_Password"
              name="Confirm_Password"
            />
          </div>
          {error && (
            <div className="alert alert-danger">
              {error.includes("Password") && !error.includes("Passwords must be the same")
                ? "Invalid password (should contain at least 8 characters, at least one capital letter, and one symbol)"
                : error}
            </div>
          )}
          <button type="submit" className="my-2 btn btn-outline-success w-100" disabled={isLoading}>
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Register'}
          </button>
        </form>
      </div>
 </div>
    </>
  );
}
