import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function NewProject() {
    const [timePeriod, setTimePeriod] = useState('');
    const [repeatDays, setRepeatDays] = useState(1); // Define repeatDays state
    const { register, handleSubmit } = useForm();

    const handleChange = (data) => {
        setTimePeriod(data.target.value);
        // Update repeatDays based on the selected timePeriod
        if (data.target.value === 'Two Weeks') {
            setRepeatDays(2);
        } else if (data.target.value === 'One Month') {
            setRepeatDays(4);
        } else {
            setRepeatDays(1);
        }
    };

    const onSubmit = async (data) => {
        try {
            const mealPlanRef = firebase.database().ref("Departments").child("Medical").child("MealPlans").child(timePeriod);

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const initialMealPlan = {};

            for (let i = 0; i < repeatDays; i++) {
                const weekNumber = i + 1;
                for (let j = 0; j < daysOfWeek.length; j++) {
                    const dayPlan = {
                        breakfast: {
                            name: data[`breakfastName_${weekNumber}_${daysOfWeek[j]}`] || '',
                            picture: '', // Handle image upload similarly to the previous setup
                            healthAdvantages: data[`breakfastHealthAdvantages_${weekNumber}_${daysOfWeek[j]}`] || '',
                            ingredients: data[`breakfastIngredients_${weekNumber}_${daysOfWeek[j]}`] || '',
                            recipe: data[`breakfastRecipe_${weekNumber}_${daysOfWeek[j]}`] || ''
                        },
                        supper: {
                            name: data[`supperName_${weekNumber}_${daysOfWeek[j]}`] || '',
                            picture: '', // Handle image upload similarly to the previous setup
                            healthAdvantages: data[`supperHealthAdvantages_${weekNumber}_${daysOfWeek[j]}`] || '',
                            ingredients: data[`supperIngredients_${weekNumber}_${daysOfWeek[j]}`] || '',
                            recipe: data[`supperRecipe_${weekNumber}_${daysOfWeek[j]}`] || ''
                        }
                    };
                    initialMealPlan[`${daysOfWeek[j]}_Week${weekNumber}`] = dayPlan;
                }
            }

            await mealPlanRef.set(initialMealPlan);

            //Convert to pdf and store in Firebase storage
            const pdfURL = await convertToPDF();

            //Save PDF download URL to the database under the correct time period
            await firebase.database().ref("Departments").child("Medical").child(timePeriod).child("PDFURL").set(pdfURL);

            alert("Meal Plan Successfully set up");
        } catch (error) {
            console.error(error);
        }
    };

    //Convert to pdf function
    const convertToPDF = async() => {
        //Get the form element
        const form  = document.getElementById("mealPlanForm");

        //Convert form to pdf
        const canvas = await html2canvas(form);
        const imgData = canvas.toDataURL("image/*");
        const pdf = new jsPDF();
        const imageWidth = 208;
        const pageHeight = 295;
        const imageHeight = (canvas.height * imageWidth) / canvas.width;
        let heightLeft = imageHeight;
        let position = 0;

        pdf.addImage(imgData, '*', 0, position, imageWidth, imageHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0){
            position = heightLeft - imageHeight;
            pdf.addPage();
            pdf.addImage(imgData, '*', 0, position, imageWidth, imageHeight);
            heightLeft -= pageHeight;
        }
        //Convert pdf to blob
        const pdfBlob = pdf.output('blob');

        //Upload to firebase storage
        const dbStorage = firebase.storage().ref();
        const pdfRef = await dbStorage.child(`meal_plans/${timePeriod}.pdf`).put(pdfBlob);

        // Get reference to the uploaded PDF file
        const uploadedPdfRef = pdfRef.ref;
        //Get downloaded URL of pdf
        const pdfURL = await uploadedPdfRef.getDownloadURL();

        return pdfURL;
    };
    

    return (
        <div>
            <div>
                <select onChange={handleChange}>
                    <option value="">Select Meal Plan Length</option>
                    <option>One Week</option>
                    <option>Two Weeks</option>
                    <option>One Month</option>
                </select>
                <button onClick={handleSubmit(onSubmit)} disabled={!timePeriod}>Set Up Meal Plan</button>
            </div>
            {timePeriod && (
                <div>
                    <h2>Meal Plan Setup for {timePeriod}</h2>
                    <form id='mealPlanForm'>
                        {['breakfast', 'supper'].map(mealType => (
                            <div key={mealType}>
                                <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                                {[...Array(repeatDays)].map((_, weekIndex) => (
                                    <div key={`Week${weekIndex + 1}`}>
                                        <h4>Week {weekIndex + 1}</h4>
                                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                            <div key={`${mealType}_${day}`}>
                                                <h5>{day}</h5>
                                                <label>{mealType === 'breakfast' ? 'Breakfast' : 'Supper'} Name:</label>
                                                <input type="text" {...register(`${mealType}Name_${weekIndex + 1}_${day}`)} />
                                                <label>Health Advantages:</label>
                                                <textarea {...register(`${mealType}HealthAdvantages_${weekIndex + 1}_${day}`)} />
                                                <label>Ingredients:</label>
                                                <textarea {...register(`${mealType}Ingredients_${weekIndex + 1}_${day}`)} />
                                                <label>Recipe:</label>
                                                <textarea {...register(`${mealType}Recipe_${weekIndex + 1}_${day}`)} />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="submit">Add Meal Plan</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default NewProject;
