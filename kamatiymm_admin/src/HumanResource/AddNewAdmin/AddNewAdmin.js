import React from 'react'
import { useForm } from 'react-hook-form'
import firebase from '../../firebase'; // Import Firebase
import './AddNewAdmin.css'
import { Link } from 'react-router-dom';

function AddNewAdmin() {
  //Initialise useForm hook.
  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  //Handle form submission
  const onSubmit = (data) => {
    const dbRef= firebase.database();

    //Push the employee details to the appropriate department node.
    dbRef.ref(`departments/${data.department}`).push(data).then(() => {
      alert('Employee added successfully');
      reset();
    }).catch((error) => {
      console.error('Error adding employee: ', error);
    });
  }
  return (
    <div>
      <nav>
        <Link to='/LandingPage'>Back</Link>
     </nav>
  <div className="add-admin-container">
          <h2>Add New Employee</h2>
            <form className="add-admin-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                {/**Employee name */}
                <input type='text' placeholder='First Name'
                {...register('first_name', {required:true})}
                />
                {errors.first_name && <span>Name is required</span>}
                <input type='text' placeholder='Last Name'
                {...register('last_name', {required:true})}
                />
                {errors.last_name && <span>Name is required</span>}
              </div>
                {/**Birth Date */}
                <div className="form-group">
                  <label>Birth Date</label>
                  <div style={{display: 'flex'}}>
                    {/**Day */}
                    <select {...register('birthDay', {required: true})}>
                      <option value=''>Day</option>
                      {Array.from({length: 31}, (i, index) => (
                        <option key={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                    {/**Month */}
                    <select {...register('birthMonth', {required: true})}>
                      <option value=''>Month</option>
                      {[
                        'January','February','March','April','May','June','July','August','September',
                        'October','November','December'
                      ].map((month, index) => (
                        <option key={index + 1} value={index + 1}>{month}</option>
                      ))}
                    </select>
                    {/**Year */}
                    <select {...register('birthYear', {required:true})}>
                      <option value=''>Year</option>
                      {Array.from({length: 100}, (i, index) => (
                        <option key={index + 1920} value={index + 1920}>{index + 1920}</option>
                      )).reverse()}
                    </select>
                  </div>
                  {errors.birthDay && <span>Birth Date is required</span>}
                </div>
                {/**Address */}
                <input type='text' placeholder='Current Address'
                {...register('currentAddress',{required: true})}
                />
                {errors.currentAddress && <span>Address is required</span>}
                {/**Contact Details */}
                <input type='tel' placeholder='Contact info'
                {...register('phoneNumber', {required:true})}
                />
                {errors.phoneNumber && <span>Phone number is required</span>}
                <input type='email' placeholder='Email address'
                {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                />
                {errors.email && <span>Email is required</span>}
                {errors.email && errors.email.type === 'pattern' && <span>Invalid email</span>}
                <input type='tel' placeholder='Emergency contact'
                {...register('emergencyContact', {required:true})}
                />
                {errors.emergencyContact && <span>Emergency Contact is required</span>}
                {/**Department selection */}
                <select {...register('department', {required: true})}>
                  <option value=''>Select Department</option>
                  <option value=''>Media and Communication</option>
                  <option value=''>Medical</option>
                  <option value=''>Sales and Marketing</option>
                  <option value=''>Softwares</option>
                  <option value=''>Human Resource</option>
                  <option value=''>Managerial</option>
                </select>
                {errors.department && <span>Department is required</span>}
                {/**Job Role */}
                <input type='text' placeholder='Job description'
                {...register('jobRole', {required:true})}
                />
                {errors.jobRole && <span>Job description is required</span>}
                <input type='text' placeholder='Supervisor'
                {...register('supervisor', {required:true})}
                />
                {errors.supervisor && <span>Supervisor is required</span>}
                {/**Pay rate */}
                <input type='text' placeholder='Pay Rate'
                {...register('payRate', {required:true})}
                />
                {errors.payRate && <span>Pay Rate is required</span>}
                {/**Start Date */}
                <div className="form-group">
                  <label>Start Date</label>
                  <div style={{display: 'flex'}}>
                    {/**Day */}
                    <select {...register('startDay', {required: true})}>
                      <option value=''>Day</option>
                      {Array.from({length: 31}, (i, index) => (
                        <option key={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                    {/**Month */}
                    <select {...register('startMonth', {required: true})}>
                      <option value=''>Month</option>
                      {[
                        'January','February','March','April','May','June','July','August','September',
                        'October','November','December'
                      ].map((month, index) => (
                        <option key={index + 1} value={index + 1}>{month}</option>
                      ))}
                    </select>
                    {/**Year */}
                    <select {...register('startYear', {required:true})}>
                      <option value=''>Year</option>
                      {Array.from({length: 100}, (i, index) => (
                        <option key={index + 2000} value={index + 2000}>{index + 2000}</option>
                      )).reverse()}
                    </select>
                  </div>
                  {errors.startDay && <span>Start Date is required</span>}
                </div>
                <button type='submit' className="btn-submit">Add Employee</button>
            </form>
    </div>
  </div>
    
  )
}

export default AddNewAdmin