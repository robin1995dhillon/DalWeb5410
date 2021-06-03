import React, { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import Profile from './Profile';

var namePattern = new RegExp('^[a-zA-Z0-9]*$');
var emailPattern = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
var passwordPattern = new RegExp('^[a-zA-Z0-9$@_]*$');

const App = () => {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ firstNameValidity, setFirstNameValidity ] = useState(false);
  const [ lastNameValidity, setLastNameValidity ] = useState(false);
  const [ emailValidity, setEmailValidity ] = useState(false);
  const [ passwordValidity, setPasswordValidity ] = useState(false);
  const [ confirmPasswordValidity, setConfirmPasswordValidity ] = useState(false);
  const [ redirect, setRedirect] = useState(false);

  const handleFirstName = (event) => {
    const value = !namePattern.test(event.target.value);
    setFirstName(event.target.value);
    setFirstNameValidity(value);
  }

  const handleLastName = (event) => {
    const value = !namePattern.test(event.target.value);
    setLastName(event.target.value);
    setLastNameValidity(value);
  }

  const handleEmail = (event) => {
    const value = !emailPattern.test(event.target.value);
    setEmail(event.target.value);
    setEmailValidity(value);
  }

  const handlePassword = async (event) => {
    console.log(event.target.value);
    const value = !(event.target.value.length >= 8 && passwordPattern.test(event.target.value));
    setPassword(event.target.value);
    setPasswordValidity(value);
    if(confirmPassword){
      setConfirmPasswordValidity(event.target.value !== confirmPassword);
    }
  }

  const handleConfirmPassword = (event) => {
    const value = event.target.value !== password;
    setConfirmPassword(event.target.value);
    setConfirmPasswordValidity(value);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
      if (firstNameValidity || lastNameValidity || emailValidity || passwordValidity || confirmPasswordValidity){
        event.preventDefault();
        event.stopPropagation();
        alert("Input should be valid!");
      }
      else {
        event.preventDefault();
        setRedirect(true);
      }
  };

return (
  <div className="container">
    {redirect ? < Profile firstName={firstName} lastName={lastName} email={email}/> : 
  <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control value={firstName} required isInvalid={firstNameValidity} onChange={handleFirstName} type="text" placeholder="Enter first name" />
    <Form.Control.Feedback type="invalid">Should only contain AlphaNumeric characters</Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control value={lastName} required isInvalid={lastNameValidity} onChange={handleLastName} type="text" placeholder="Enter last name" />
    <Form.Control.Feedback type="invalid">Should only contain AlphaNumeric characters</Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control value={email} required isInvalid={emailValidity} onChange={handleEmail} type="text" placeholder="Enter email" />
    <Form.Control.Feedback type="invalid">Enter a valid email</Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control value={password} required isInvalid={passwordValidity} onChange={handlePassword} type="password" placeholder="Password" />
    <Form.Control.Feedback type="invalid">Should only contain alpha-numeric or special symbols($,@,_) and a minimum of 8 characters</Form.Control.Feedback>
  </Form.Group>
  
  <Form.Group controlId="formBasicConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control value={confirmPassword} required isInvalid={confirmPasswordValidity} onChange={handleConfirmPassword} type="password" placeholder="Confirm Password" />
    <Form.Control.Feedback type="invalid">Password and Confirm Password should match</Form.Control.Feedback>
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
}
</div>
);
}

export default App;
