import React, { Component } from 'react';
import Example from '../example';
import '../Styles/Form.css';
import DateField from './DateField';
import EmailField from './EmailField';
import TextField from './TextField';
import { CancelButton, SubmitButton } from './ButtonField';
import ContactField from './ContactField';
import ResponseMessage from './ResponseField';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      contact: '',
      email: '',
      password: '',
      confirmpassword: '',
      birthdate: {
        day: '',
        month: '',
        year: ''
      },
      fullnameerror: '',
      contacterror: '',
      emailerror: '',
      passworderror: '',
      birthdateerror: '',
      showSuccessMessage: false,
      showErrorMessage: false
    };
    this.setField = this.setField.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  // Reset the fields
  setField(field, e) {
    const { birthdate, contacterror, emailerror, fullnameerror, passworderror, confirmpassworderror } = this.state;
    const value = e.target.value;
  
    // Update error state if it exists
    const errorStateToUpdate = { contacterror, emailerror, fullnameerror, passworderror, confirmpassworderror };
    if (errorStateToUpdate[field]) {
      errorStateToUpdate[field] = '';
      this.setState(errorStateToUpdate);
    }
  
    // Update value state
    if (['day', 'month', 'year'].includes(field)) {
      this.setState(prevState => ({
        birthdate: {
          ...prevState.birthdate,
          [field]: value
        }
      }));
    } else {
      this.setState({
        [field]: value
      });
    }
  }

  //Reset the form on Cancellation
  resetForm() {
    this.setState({
      full_name: '',
      contact: '',
      email: '',
      password: '',
      confirmpassword: '',
      birthdate: {
        day: '',
        month: '',
        year: ''
      },
      fullnameerror: '',
      contacterror: '',
      emailerror: '',
      passworderror: '',
      birthdateerror: '',
      showSuccessMessage: false,
      showErrorMessage: false
    });
  }

  //Validation of each input fields
  validate() {
    const { full_name, contact, email, password, confirmpassword, birthdate } = this.state;

    // Validation for full name
    if (!full_name || /[!@#$%^&*(),.?":{}|<>]/.test(full_name)) {
      this.setState({ fullnameerror: 'Full name cannot be empty and should not contain symbols.' });
      return false;
    } else {
      this.setState({ fullnameerror: '' });
    }

    // Validation for contact number (Canadian phone number format)
    if (!contact || !/^\d{3}-\d{3}-\d{4}$/.test(contact)) {
      this.setState({ contacterror: 'Contact number must be in Canadian phone number format (e.g., XXX-XXX-XXXX).' });
      return false;
    } else {
      this.setState({ contacterror: '' });
    }

    // Validation for day, month, and year
    if (!birthdate.day || !birthdate.month || !birthdate.year) {
      this.setState({ birthdateerror: 'Please select a valid birthdate.' });
      console.log("birthday not set ");
      return false;
    } else {
      console.log("birthday set");
      this.setState({ birthdateerror: '' });
    }

    // Validation for email
    if (!email || !/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email)) {
      this.setState({ emailerror: 'Sorry, this email address is not valid, Please try again.' });
      return false;
    } else {
      this.setState({ emailerror: '' });
    }

    // Validation for password
    if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      this.setState({ passworderror: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.' });
      return false;
    } else {
      this.setState({ passworderror: '' });
    }

    // Validation for confirm password
    if (!confirmpassword || confirmpassword !== password) {
      this.setState({ confirmpassworderror: 'Passwords do not match.' });
      return false;
    } else {
      this.setState({ confirmpassworderror: '' });
    }

    // If all validations pass, return true
    console.log("all validates");
    return true;
  }

  // Submit handler for Post request
  submitHandler(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (!isValid) {
      return;
    }

    const { full_name, contact, email, password, birthdate } = this.state;

    fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name,
        contact,
        email,
        password,
        birthdate
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        this.setState({ showSuccessMessage: true });
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ showErrorMessage: true });
      });
  }

  render() {
    const {
      full_name,
      contact,
      email,
      password,
      confirmpassword,
      birthdate,
      fullnameerror,
      contacterror,
      emailerror,
      passworderror,
      confirmpassworderror,
      birthdateerror,
      showSuccessMessage,
      showErrorMessage
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <Example title='Create User Account'>
              <div className="card" style={{ border: 'none', width: '500px', height: '820px', borderRadius: '8px' }}>
                <form onSubmit={this.submitHandler}>

                  {showSuccessMessage && <ResponseMessage icon={faCheckCircle} className="flex-grow-1 success-message" message="User account successfully created." />}
                  {showErrorMessage && <ResponseMessage icon={faCircleXmark} className="flex-grow-1 error-message" message="There was an error creating the account." />}

                  <div className="card-body">
                    <TextField
                      type="full_name"
                      value={full_name}
                      error={fullnameerror}
                      placeholder="Full Name *"
                      onChange={this.setField.bind(null, 'full_name')}
                    />

                    <ContactField
                      value={contact}
                      error={contacterror}
                      onChange={this.setField.bind(null, 'contact')}
                    />

                    <DateField
                      day={birthdate.day}
                      month={birthdate.month}
                      year={birthdate.year}
                      error={birthdateerror}
                      onChange={(field, e) => this.setField(field, e)}
                    />

                    <EmailField
                      value={email}
                      error={emailerror}
                      onChange={this.setField.bind(null, 'email')}
                    />

                    <TextField
                      type="password"
                      value={password}
                      error={passworderror}
                      placeholder="Create Password *"
                      onChange={this.setField.bind(null, 'password')}
                    />

                    <TextField
                      type="confirmpassword"
                      value={confirmpassword}
                      error={confirmpassworderror}
                      placeholder="Confirm Password *"
                      onChange={this.setField.bind(null, 'confirmpassword')}
                    />
                  </div>

                  <div className="button-wrapper">
                    <CancelButton onClick={this.resetForm} />
                    <SubmitButton />
                  </div>
                  
                </form>
              </div>
            </Example>
          </div>
        </div>
      </div>
    );
  }
}
