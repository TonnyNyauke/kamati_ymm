import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdminLogin from './LoginPage/AdminLogin'
import HomePage from './HomePage/HomePage';
import NewslettersPage from './NewsLettersPage/NewslettersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='HomePage/*' element={<HomePage/>}/>
        <Route path='NewslettersPage' element={<NewslettersPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
