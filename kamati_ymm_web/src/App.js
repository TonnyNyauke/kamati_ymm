import './App.css';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import ReadArticle from './ReadArticles/ReadArticle';
import BookAppointment from './BookAppointment/BookAppointment';
import DownloadApp from './DownloadApp/DownloadApp';
import AboutUs from './AboutUs/AboutUs';
import Newstart from './Newstart/Newstart';
import Sanitarium from './Sanitarium/Sanitarium';
import MealPlanner from './MealPlanner/MealPlanner';
import Shop from './Shop/Shop';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='HomePage/*' element={<HomePage/>}/>
        <Route path='ReadArticle/:id' element={<ReadArticle />}/>
        <Route path='BookAppointment/' element={< BookAppointment/>}/>
        <Route path='DownloadApp/' element={<DownloadApp />}/>
        <Route path='AboutUs/' element={<AboutUs />} />
        <Route path='Newstart/' element={<Newstart/>} />
        <Route path='Sanitarium/' element={<Sanitarium/>}/>
        <Route path='MealPlanner/' element={<MealPlanner/>}/>
        <Route path='Shop/' element={<Shop/>}/>
      </Routes>
    </Router>
  );
}

export default App;
