import { collection, getDocs } from 'firebase/firestore'
import db from '../../firebase'

async function getShopData(){
    const data = await getDocs(collection(db, "Shop"));
    return data.docs.map(doc => ({...doc.data(), id: doc.id}))
}

export default getShopData;