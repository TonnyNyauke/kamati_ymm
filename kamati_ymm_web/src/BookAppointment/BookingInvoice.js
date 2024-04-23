import React from 'react'
import './BookAppointment.css'

function BookingInvoice({data}) {

  const handleInvoiceHere = () => {
    console.log("Hello");
    
    // Generate invoice PDF here and download it to the user's device
  }
  const handleCancel = () => {
    console.log('cancelled');

  }
  return (
    <div className='invoice-overlay'>
      <h2>Booking Invoice</h2>
      <p>Full Name: {data.full_name}</p>
      <p>Phone Number: {data.phone_number}</p>
      <p>Email: {data.email}</p>
      <p>Appointment Time: {data.appointment_time}</p>
      <div className='appointment-buttons'>
            <button type='submit' onClick={handleInvoiceHere}>Book Appointment</button>
            <button className='cancel'  onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default BookingInvoice