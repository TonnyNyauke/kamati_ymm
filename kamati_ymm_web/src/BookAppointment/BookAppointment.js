import React from 'react'
import './BookAppointment.css'
import { Link } from 'react-router-dom'

function BookAppointment() {
  return (
    <div className='appointment-booking'>
        <div className='back'>
          <Link to="/HomePage">Kamati YMM</Link>
        </div>
        <div>
        <form className='book-consultations-form'>
            <h3>Consultations</h3>
            <input type='text' placeholder='Full Name' />
            <input type='text' placeholder='Phone number' />
            <input type='email' placeholder='Email Address' />
            <div>
              <h3>Choose appointment time</h3>
                <input type="radio" name="consulationTime"/>
                <label>9:00AM</label>
                <input type="radio" name="consulationTime"/>
                <label>11:00AM</label>
                <input type="radio" name="consulationTime"/>
                <label>2:00PM</label>
                <input type="radio" name="consulationTime"/>
                <label>3:00PM</label>
              <h2>Kshs 500</h2>
            </div>
            <button type='submit'>Book Appointment</button>
        </form>
        </div>
        <div>
        <form className='book-treatment-session-form'>
            <h3>Treatment Sessions</h3>
            <input type='text' placeholder='Full Name' />
            <input type='text' placeholder='Phone number' />
            <input type='email' placeholder='Email Address' />
            <div>
              <h3>Choose appointment time</h3>
                <input type="radio" name="appointmentTime"/>
                <label>9:00AM</label>
                <input type="radio" name="appointmentTime"/>
                <label>11:00AM</label>
                <input type="radio" name="appointmentTime"/>
                <label>2:00PM</label>
                <input type="radio" name="appointmentTime"/>
                <label>3:00PM</label>
                <h2>Kshs 1,000</h2>
            </div>
            <button type='submit'>Book Appointment</button>
        </form>
        </div>
        <div>
        <form className='book-counselling-form'>
            <h3>Counselling</h3>
            <input type='text' placeholder='Full Name' />
            <input type='text' placeholder='Phone number' />
            <input type='email' placeholder='Email Address' />
            <div>
              <h3>Choose appointment time</h3>
                <input type="radio" name="counsellingTime"/>
                <label>9:00AM</label>
                <input type="radio" name="counsellingTime"/>
                <label>11:00AM</label>
                <input type="radio" name="counsellingTime"/>
                <label>2:00PM</label>
                <input type="radio" name="counsellingTime"/>
                <label>3:00PM</label>
                <h2>Kshs 1,000</h2>
            </div>
            <button type='submit'>Book Appointment</button>
        </form>
        </div>
    </div>
  )
}

export default BookAppointment