import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdminLogin from './LoginPage/AdminLogin'
import HomePage from './HomePage/HomePage';
import NewslettersPage from './NewsLettersPage/NewslettersPage';
import AppCenter from './AppCenter/AppCenter';
import Sanitarium from './Sanitarium/Sanitarium';
import Newstart from './Newstart/Newstart';
import MealPlanner from './MealPlanner/MealPlanner';
import Shop from './Shop/Shop';
import Appointment from './Appointments/Appointment';
import AnalyticsPage from './Analytics/AnalyticsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='HomePage/*' element={<HomePage/>}/>
        <Route path='NewslettersPage/' element={<NewslettersPage/>}/>
        <Route path='AppCenter/' element={<AppCenter/>}/>
        <Route path = 'Sanitarium/' element={<Sanitarium/>}/>
        <Route path='Newstart/' element={<Newstart/>}/>
        <Route path='MealPlanner/' element={<MealPlanner/>}/>
        <Route path='Shop/' element={<Shop/>}/>
        <Route path='Appointment/' element={<Appointment/>}/>
        <Route path='AnalyticsPage/' element={<AnalyticsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
