import React, { useState } from 'react'
import './BookAppointment.css'
import { Link } from 'react-router-dom'
import consultation from '../Photos/consultations.jpg'
import treatment from '../Photos/treatment.jpg'
import counselling from '../Photos/counselling.jpg'
import BookingInvoice from './BookingInvoice'
import { useForm } from 'react-hook-form'




function BookTreatment(){
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  }
  return(
    <div>
      
      {showForm && (<div className='book-form-overlay'>
        <BookTreatmentForm onCancel={toggleForm}/>
      </div>)}
      {!showForm && (
        <div className='treatment-booking'>
          <img src={treatment} alt='treatment'/>
          <div>
            <h1>Looking for treatment options?</h1>
            <p>Booking an appointment with Kamati YMM is quick and easy. 
              We offer a variety of treatment options to address your health concerns. 
              Simply access our website from your device or desktop,
              answer a few questions about your condition, find a convenient time for your appointment,
              and book your treatment session. 
              Our team of professionals is here to provide you with the care and support you need.
            </p>
            <button onClick={toggleForm}>Book Now</button>
      </div>
        </div>
      )}
    </div>
    
  )
}

function BookCounselling(){
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  }
  return(
    <div>
      {showForm && (<div className='book-form-overlay'>
        <BookCounsellingForm onCancel={toggleForm}/>
      </div>)}
      {!showForm && (
        <div className='counselling-booking'>
        <div>
          <h1>Need someone to talk to?</h1>
          <p>At Kamati YMM, we offer professional counselling services to support you through life's challenges. 
            Whether you're dealing with stress, anxiety, relationship issues, or other concerns, 
            our experienced counsellors are here to help. 
            Booking a counselling session is simple - just visit our website on your device or desktop,
            answer a few questions about your needs, select a time that works for you, 
            and book your appointment. 
            We're available 24/7 to provide you with the support you need.
          </p>
          <button onClick={toggleForm}>Book Now</button>
      </div>
      <img src={counselling} alt='counselling' />
        </div>
      )}
    </div>
  )
}
function BookConsultation(){
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  return(
    <div>
      
      {showForm && (<div className='book-form-overlay'>
        <BookConsultationForm onCancel={toggleForm}/>
      </div>)}
      {!showForm && (
        <div className='consultations-booking'>
          <img src={consultation} alt='consult'/>
          <div>
            <h1>Want consultations concerning your health?</h1>
            <p>Booking an appointment with Kamati YMM only takes a minute and we're open 24 hours every working day. 
              Simply access our website via your device or desktop,
              answer a few questions about your health concern, find a time that works for you
              and book your appointment - consultations are usually available within a few hours.
              You can also call us on 0795063917/0748242040.
            </p>
            <button onClick={toggleForm}>Book Now</button>
          </div>
        </div>
      )}
    </div>
    
  )
}
function BookAppointment() {
  return (
    <div className='appointment-booking'>
        <div className='back'>
          <Link to="/HomePage">Kamati YMM</Link>
        </div>
        <BookConsultation />
        <BookCounselling />
        <BookTreatment />
    </div>
  )
}

export default BookAppointment

function BookConsultationForm({onCancel}){
  const {register, handleSubmit} = useForm();
  const handleCancel = () => onCancel();

  const [showInvoice, setShowInvoice] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [data, setData] = useState(null);

  const handleInvoice = (data) => {

    const formData = {
      full_name: data.full_name,
      phone_number: data.phone_number,
      email: data.email,
      appointment_time: data.appointment_time
    }
    setData(formData);
    setShowInvoice(true);
    setShowForm(false);

    console.log(data);
  }

  return(
    <div>
        {showForm && (
          <form className='book-consultations-form' onSubmit={handleSubmit(handleInvoice)}>
          <h3>Consultations</h3>
          <input type='text' placeholder='Full Name' {...register('full_name', {required: true})}/>
          <input type='text' placeholder='Phone number' {...register('phone_number', {required: true})}/>
          <input type='email' placeholder='Email Address' {...register('email', {required: true})}/>
          <textarea cols='45' rows='7' placeholder='Briefly describe your reason for consultation...' {...register('reason_for_consultation', {required: true})}/>
          <div>
            <h3>Choose appointment time</h3>
            <select className='appointmentTime' {...register('appointment_time', {required: true})}>
              <option value="morning" >Morning (9am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 5pm)</option>
              <option value="evening">Evening (5pm - 8pm)</option>
            </select>
            
          </div>
          <div className='appointment-buttons'>
            <button type='submit'>Book Appointment</button>
            <button className='cancel'  onClick={handleCancel}>Cancel</button>
          </div>
          
      </form>
        )}
        {showInvoice && (<div className='invoice-overlay'>
              <BookingInvoice  data={data}/>
            </div>)}
        </div>
  )
}

function BookTreatmentForm({onCancel}) {
  const { register, handleSubmit} = useForm();
  const [data, setData] = useState(null);

  const handleCancel = ()  => onCancel();

  const [showInvoice, setShowInvoice] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleInvoice = (data) => {

    const formData = {
      full_name: data.full_name,
      phone_number: data.phone_number,
      email: data.email,
      appointment_time: data.appointment_time
    }
    setData(formData);
    setShowInvoice(true);
    setShowForm(false);
   

    console.log(data);
  }
  return(
    <div>
  {showForm && (
    <form className='book-treatment-session-form' onSubmit={handleSubmit(handleInvoice)}>
    <h3>Treatment Sessions</h3>
    <input type='text' placeholder='Full Name' {...register('full_name', {required: true})}/>
    <input type='text' placeholder='Phone number' {...register('phone_number', {required: true})}/>
    <input type='email' placeholder='Email Address' {...register('email', {required: true})}/>
    <textarea cols='45' rows='7' placeholder='Briefly describe your condition...' {...register('present_condition', {required: true})}/>
    <div>
      <h3>Choose appointment time</h3>
      <select className='appointmentTime' {...register('appointment_time', {required: true})}>
        <option value="morning" >Morning (9am - 12pm)</option>
        <option value="afternoon">Afternoon (12pm - 5pm)</option>
        <option value="evening">Evening (5pm - 8pm)</option>
      </select>
       
    </div>
    <div className='appointment-buttons'>
      <button type='submit'>Book Appointment</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
    
</form>
  )}
  {showInvoice && (<div className='invoice-overlay'>
        <BookingInvoice data={data}/>
      </div>)}
  </div>
  )
}
function BookCounsellingForm({onCancel}) {
  const  { register, handleSubmit } = useForm();
  const handleCancel = () => {
    onCancel();
  }
  const [showInvoice, setShowInvoice] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [data, setData] = useState(null);

  const handleInvoice = (data) => {

    const formData = {
      full_name: data.full_name,
      phone_number: data.phone_number,
      email: data.email,
      appointment_time: data.appointment_time
    }
    setShowInvoice(true);
    setShowForm(false);
    setData(formData);
  }
  
  return (
    <div>
        {showForm && (
          <form className='book-counselling-form' onSubmit={handleSubmit(handleInvoice)}>
          <h3>Counselling</h3>
          <input type='text' placeholder='Full Name' {...register('full_name', {required: true})}/>
          <input type='text' placeholder='Phone number' {...register( 'phone_number', {required:true})}/>
          <input type='email' placeholder='Email Address' {...register('email', {required:true})}/>
          <textarea cols='45' rows='7' placeholder='Briefly describe your reason for seeking counselling...'/>
          <br/><br/>
          <div>
            <h3>Choose appointment time</h3>
            <select className='appointmentTime' {...register('appointment_time', {required: true})}>
              <option value="morning" >Morning (9am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 5pm)</option>
              <option value="evening">Evening (5pm - 8pm)</option>
            </select>
            
          </div>
          <div className='appointment-buttons'>
            <button type='submit'>Book Appointment</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
          
      </form>
        )}
        {showInvoice && (<div className='invoice-overlay'>
              <BookingInvoice data={data}/>
            </div>)}
        </div>
  )
}



