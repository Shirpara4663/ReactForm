import React, { Component } from 'react';
import Example from '../example';
import './Form.css';
import 'react-datepicker/dist/react-datepicker.css';

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
      error: ''
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
      this.setState({
        [field]: e.target.value
      });
    }
  }
  

//   validate() {
//     const { email } = this.state;
//     if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
//       this.setState({ error: 'Sorry, this email address is not valid, Please try again.' });
//       return false;
//     }
//     return true;
//   }
  validate() {
    const { fullname, contact, email, password, confirmpassword, birthdate } = this.state;

    // Validation for full name
    if (!fullname || fullname.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      this.setState({ error: 'Full name cannot be empty and should not contain symbols.' });
      return false;
    }

    // Validation for contact number (Canadian phone number format)
    if (!contact || !contact.match(/^\d{3}-\d{3}-\d{4}$/)) {
      this.setState({ error: 'Contact number must be in Canadian phone number format (e.g., XXX-XXX-XXXX).' });
      return false;
    }

    // Validation for email
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ error: 'Email address is not valid. Please enter a valid email address.' });
      return false;
    }

    // Validation for day, month, and year
    if (!birthdate.day || !birthdate.month || !birthdate.year) {
      this.setState({ error: 'Please select a valid birthdate.' });
      return false;
    }

    // Validation for password
    if (!password || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      this.setState({ error: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.' });
      return false;
    }

    // Validation for confirm password
    if (password !== confirmpassword) {
      this.setState({ error: 'Passwords do not match.' });
      return false;
    }

    // If all validations pass, return true
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
    // Generate options for days (1 to 31)
    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    // Generate options for months (January to December)
    const months = Array.from({ length: 12 }, (_, index) => {
      const monthNumber = index + 1;
      return { value: monthNumber, label: monthNumber };
    });
    // Generate options for years (current year - 100 to current year)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
    const { fullname, contact, email, password, confirmpassword, birthdate, error } = this.state;
    const { day, month, year } = birthdate;
      
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row"  style={{ width: '502px', height: '820px', top: '102px', left: '469px', borderRadius: '8px'}}>
          <Example title='Create User Account'>
            <div className="card">
              <form onSubmit={this.submitHandler}>
                <div className="card-body">
                <div className="mb-3 position-relative">
                    <label className="form-label">Full Name</label>
                    <input
                        className='form-control asterisk_input'
                        type='text'
                        required
                        placeholder='Full Name' // Add asterisk (*) after the placeholder text
                        value={fullname}
                        onChange={this.setField.bind(null, 'fullname')}
                    />
                </div>

                  <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Contact Number'
                      value={contact}
                      onChange={this.setField.bind(null, 'contact')} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Birthdate</label>
                    <div className="d-flex">
                      <select className="form-select me-2" value={day} onChange={(e) => this.setField('day', e)}>
                        <option value="">Day</option>
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                      <select className="form-select me-2" value={month} onChange={(e) => this.setField('month', e)}>
                        <option value="">Month</option>
                        {months.map(month => (
                          <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                      </select>
                      <select className="form-select" value={year} onChange={(e) => this.setField('year', e)}>
                        <option value="">Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                    <div className="mb-3" style={{ marginTop: '20px' }}>
                    <label htmlFor="validationServer03" className="form-label" style={{ marginBottom: '20px' }}>Email Address</label>
                    <fieldset style={{ border: 'none', position: 'relative', paddingTop: '-5px' }}> 
                        <legend style={{ display: '', fontSize: '12px', position: 'absolute', top: '-10px', left: '10px', backgroundColor:'white', padding: '0 5px', zIndex: '1' }}>E-mail Address</legend>
                        <input
                        className={`form-control ${error !== '' ? 'is-invalid' : ''}`}
                        type='email'
                        value={email}
                        id="validationServer03"
                        onChange={this.setField.bind(null, 'email')}
                        required
                        style={{ padding: '10px', position: 'relative', zIndex: '0' }}
                        />
                    </fieldset>
                    {error && <div className="invalid-feedback mb-3" style={{ display: 'block' }}>{error}</div>}
                </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-box">
                      <input
                        className='form-control'
                        type='password'
                        placeholder='Create Password'
                        value={password}
                        onChange={this.setField.bind(null, 'password')} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-box">
                      <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmpassword}
                        onChange={this.setField.bind(null, 'confirmpassword')} />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className='btn btn-secondary' type='button'>Cancel</button>
                  <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </Example>
        </div>
      </div>
    );
  }
}
