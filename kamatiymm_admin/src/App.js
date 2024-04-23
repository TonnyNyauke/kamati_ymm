import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLogin from './LoginPage/AdminLogin';
import Newslogin from './MediaAndCommunication/Newslogin';
import HumanResource from './HumanResource/HumanResource';
import LandingPage from './HumanResource/LandingPage';
import AddNewAdmin from './HumanResource/AddNewAdmin/AddNewAdmin';
import EmployeeDatabase from './HumanResource/EmployeeDatabase/EmployeeDatabase';
import SalesLogin from './SalesAndMarketing/Shop/LandingPages/SalesLogin';
import Shop from './SalesAndMarketing/Shop/Shop';
import AddProducts from './SalesAndMarketing/Shop/AddProducts/AddProducts';
import Departments from './HumanResource/Departments';
import MealPlanner from './Medical/MealPlanner/MealPlanner';
import Medical from './Medical/Medical';
import NewProject from './Medical/MealPlanner/NewProject';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='Newslogin' element={<Newslogin/>}/>
        <Route path='HumanResource' element={<HumanResource/>}/>
        <Route path='LandingPage' element={<LandingPage />}/>
        <Route path='AddNewAdmin' element={<AddNewAdmin/>}/>
        <Route path='EmployeeDatabase' element={<EmployeeDatabase/>}/>
        <Route path='SalesLogin' element={<SalesLogin/>}/>
        <Route path='Shop' element={<Shop/>}/>
        <Route path='AddProducts' element={<AddProducts/>}/>
        <Route path='Departments' element={<Departments/>}/>
        <Route path='MealPlanner' element={<MealPlanner/>}/>
        <Route path='Medical' element={<Medical/>}/>
        <Route path='NewProject' element={<NewProject/>} />
      </Routes>
    </Router>
  );
}

export default App;
