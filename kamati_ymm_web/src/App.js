import './App.css';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import ReadArticle from './ReadArticles/ReadArticle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='HomePage/*' element={<HomePage/>}/>
        <Route path='ReadArticle/:id' element={<ReadArticle />}/>
      </Routes>
    </Router>
  );
}

export default App;
