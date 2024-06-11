'use client'

import { addDoc, collection, setDoc } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { db } from '../firebase';

interface Category {
    categoryName: string;
}

function Page() {
    const [category, setCategory] = useState<Category>({
        categoryName: '',
    })

    async function addCategory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {categoryName} = category;

        const catRef = collection(db, "Categories");
        const newCategory = {
            category: categoryName,
        }

        await addDoc(catRef, newCategory)
        console.log('Added succesfully')
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const {name, value} = event.target;
        setCategory({...category, [name]: value});
    }

  return (
    <div>
        <form onSubmit={addCategory}>
            <input type='text' placeholder='Add category...' onChange={handleInputChange}
            name='categoryName' value={category.categoryName}
            />
            <button>Add Category</button>
        </form>
    </div>
  )
}

export default Page