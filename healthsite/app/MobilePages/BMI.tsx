import Link from 'next/link';
import React, { ChangeEvent, FormEvent, ReactNode, useState } from 'react';


interface BMI {
  weight: number,
  height: number,
}

function BMI() {
  const [bmi, setBMI] = useState<BMI>({weight: 0, height: 0, })
  const [index, setBMIIndex] = useState<number | null>(null);
  const [bmiMessage, setBMIMessage] = useState<ReactNode | null>(null);

  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const {name, value} = event.target;

    setBMI({...bmi, [name]:value});
  }

  function bmiSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {weight, height} = bmi;

    const bmiIndex = (weight) / (height * height);

    setBMIIndex(bmiIndex)

    if (bmiIndex < 18){
      setBMIMessage(<><p>Your BMI is {bmiIndex}, which is below the normal range! You are underweight.</p> <Link href="/#">Learn more</Link></>);
    }else if (bmiIndex > 18 && bmiIndex < 26){
      setBMIMessage(<><p>Your BMI is {bmiIndex}. Congratulations, you have a healthy weight.</p> <Link href="/#">Learn more</Link></>);
    }
    else if (bmiIndex > 26) {
      setBMIMessage(<><p>Your BMI is {bmiIndex}, which is above normal range! You are overweight and are susceptible to lifestyle diseases.</p> <Link href="/#">Learn more</Link></>);
    }
    
  }
  function cancelFunction() {
    setBMI({weight: 0, height: 0});
    setBMIIndex(null);
    setBMIMessage(null);
  }
  

  return (
    <section className="section-bmi border border-green-200 rounded-lg space-y-2 
    flex justify-center items-center min-h-56 p-4">
      <div className="animate-pulse">
        <form className="flex flex-col" onSubmit={bmiSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-4 text-green-700">Know your BMI</h2>
          <label htmlFor='weight'> Enter your weight in Kg</label>
          <input
            type="number"
            name='weight'
            value={bmi.weight}
            onChange={handleInputChange}
            className="border border-green-300 p-2 rounded-lg mb-2"
          />
          <label htmlFor="height">Enter your height in metres</label>
          <input
            type="number"
            name='height'
            value={bmi.height}
            onChange={handleInputChange}
            className="border border-green-300 p-2 rounded-lg mb-4"
          />

          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
            Calculate
          </button>
        </form>
      </div>
      {bmiMessage && (
        <div className='bmi-container'>
          {bmiMessage}
          <button onClick={cancelFunction}>Cancel</button>
        </div>
      )}
    </section>
  );
}

export default BMI;
