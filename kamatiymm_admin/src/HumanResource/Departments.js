import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import { useForm } from 'react-hook-form';
import firebase from '../firebase'
import '../firebase'

function AddDepartment({onSubmit}){
    const {register, handleSubmit, formState: {errors}} = useForm();

    const submitForm = (data) => {
        onSubmit(data);
    }

    return(
        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <input type='text' placeholder='Name of Department'
                {...register('department_name', {required:true})}
                />
                {errors.department_name && <span>Department Name is required</span>}
                <input type='text' placeholder='Enter Subdivision'
                {...register('subdivision', {required:true})}
                />
                {errors.subdivision && <span>Subdivision is required</span>}
                <button type='submit'>Add Department</button>
            </form>
        </div>
    )
}
function Departments() {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }
    const handleFormSubmit = (data) => {
        const { department_name, subdivision } = data;
        
        // Get a reference to the Departments node
        const departmentsRef = firebase.database().ref("Departments");
        
        // Create a new department node with the department name as the key
        const newDepartmentRef = departmentsRef.child(department_name);
        
        // Set the department name as a property of the department node
        newDepartmentRef.set({
            name: department_name
        });
    
        // Create a subdivision node under the department node
        const subdivisionRef = newDepartmentRef.child(subdivision);
        subdivisionRef.set({
            name: subdivision
        });
    
        console.log(data);
    
        setShowForm(false);
    }
    
  return (
    <div>
        <button type='submit' onClick={toggleForm}><i class="fa fa-plus" aria-hidden="true"></i>Add</button>
        {showForm && <AddDepartment onSubmit={handleFormSubmit}/>}
    </div>
  )
}

export default Departments