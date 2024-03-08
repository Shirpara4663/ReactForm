import React, { Component } from 'react';
import Example from '../example';
import './Form.css';
import DateField from './DateField';
import EmailField from './EmailField';
import TextField from './TextField';
import { CancelButton, SubmitButton } from './ButtonField';
import ContactField from './ContactField';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
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
      contacterror:'',
      emailerror:'',
      passworderror:'',
      birthdateerror:''
    };
    this.setField = this.setField.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  setField(field, e) {
    if (field === 'day' || field === 'month' || field === 'year') {
      this.setState(prevState => ({
        birthdate: {
          ...prevState.birthdate,
          [field]: e.target.value
        }
      }));
    } else {
      // Reset the error state when correcting the contact info
      if (field === 'contact' && this.state.contacterror) {
        this.setState({ contacterror: '' });
      }
      // Reset the error state when correcting the email
      else if (field === 'email' && this.state.emailerror) {
        this.setState({ emailerror: '' });
      }
      // Reset the error state when correcting the password
      else if ((field === 'password' || field === 'confirmpassword') && (this.state.passworderror || this.state.confirmpassworderror)) {
        this.setState({ passworderror: '', confirmpassworderror: '' });
      }
      // Reset the error state when correcting the full name
      else if (field === 'fullname' && this.state.fullnameerror) {
        this.setState({ fullnameerror: '' });
      }
      
      // Update the state
      this.setState({
        [field]: e.target.value
      });
    }
  }
  
  
  validate() {
    const { fullname, contact, email, password, confirmpassword, birthdate } = this.state;
  
    // Validation for full name
    if (!fullname || fullname.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      this.setState({ fullnameerror: 'Full name cannot be empty and should not contain symbols.' });
      return false;
    } else {
      this.setState({ fullnameerror: '' }); // Clear fullname error if valid
    }
  
    // Validation for contact number (Canadian phone number format)
    if (!contact || !contact.match(/^\d{3}-\d{3}-\d{4}$/)) {
      this.setState({ contacterror: 'Contact number must be in Canadian phone number format (e.g., XXX-XXX-XXXX).' });
      return false;
    } else {
      this.setState({ contacterror: '' }); // Clear contact error if valid
    }

    // Validation for day, month, and year
    if (!birthdate.day || !birthdate.month || !birthdate.year) {
        this.setState({ birthdateerror: 'Please select a valid birthdate.' });
        console.log("birtday not set ");
        return false;
      } else {
        console.log("birthday set");
        this.setState({ birthdateerror: '' }); 
      }
  
    // Validation for email
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ emailerror: 'Sorry, this email address is not valid, Please try again.' });
      return false;
    } else {
      this.setState({ emailerror: '' }); // Clear email error if valid
    }
  
    // Validation for password
    if (!password || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      this.setState({ passworderror: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.' });
      return false;
    } else {
      this.setState({ passworderror: '' }); // Clear password error if valid
    }
  
    // Validation for confirm password
    if (!confirmpassword || confirmpassword !== password) {
      this.setState({ confirmpassworderror: 'Passwords do not match.' });
      return false;
    } else {
      this.setState({ confirmpassworderror: '' }); // Clear confirmpassword error if valid
    }
  
    // If all validations pass, return true
    console.log("all validates");
    return true;
  }
  
  

  submitHandler(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (!isValid) {
      return;
    }
    console.log(this.state);
    // Fetch or any other action
  }

  render() {
    const { fullname, contact, email, password, confirmpassword, birthdate, fullnameerror, contacterror, emailerror, passworderror, confirmpassworderror, birthdateerror } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="col-md-6">
            <Example title='Create User Account'>
              <div className="card">
                <form onSubmit={this.submitHandler}>
                  <div className="card-body">
                    <TextField type="fullname" value={fullname} error={fullnameerror} onChange={this.setField.bind(null, 'fullname')} />

                    <ContactField value={contact} error={contacterror} onChange={this.setField.bind(null, 'contact')} />

                    <DateField
                        day={birthdate.day}
                        month={birthdate.month}
                        year={birthdate.year}
                        error={birthdateerror}
                        onChange={(field, e) => this.setField(field, e)}
                    />

                    <EmailField value={email} error={emailerror} onChange={this.setField.bind(null, 'email')} />

                    <TextField type="password" value={password} error={passworderror} onChange={this.setField.bind(null, 'password')} />

                    <TextField type="confirmpassword" value={confirmpassword} error={confirmpassworderror} onChange={this.setField.bind(null, 'confirmpassword')} />
                  </div>

                  <div className="card-footer">
                    <CancelButton />
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