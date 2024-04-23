import React, { useEffect, useState } from 'react'
import '../App.css'
import './HomePage.css';
import '../firebase.js'
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import '../ReadArticles/ReadArticle.css'
import logo from '../Photos/logo4.png'
import Sidebar from '../Sidebar/Sidebar.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function HomePage() {
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [message, setMessage] = useState(''); //state variable for the message
    const [showForm, setShowForm] = useState(true); //State variable for form visibility
    const [newsletters, setNewsletters] = useState([]); //State variable for retrieving newsletters

 //This hook retrieves newsletters from the database (It's the equivalent of componentDidMount() in class components)
 useEffect(() => {
    const ref = firebase.database().ref("Newsletters"); //Creates reference to "Newsletter" node
    ref.on('value', (snapshot) => { //Sets up a listener on the "Newsletter" node
        const newsletters = snapshot.val(); //Gets data from "Newsletter" node
        const newsletterList = [];
        for (let id in newsletters){ //Iterates over the properties of newsletters object
            newsletterList.unshift({id, ...newsletters[id]});
        }
        setNewsletters(newsletterList);
    });
},[]);


//Get email address and phone number from realtime database


    const newsletterSignup = async (event) => {
        event.preventDefault();

        if (phonenumber === '') {
            alert("Phone number is empty");
        }
        else if(email === ''){
            alert("Email field is empty");
        }
        else{
            try{
                
                //Get a reference to Newsletter Subscribers node
                const ref = firebase.database().ref('Newsletter Subsribers');
                
                //User is subscribing for the first time
                    const newSubscriberRef = ref.push();
                    await newSubscriberRef.set({phonenumber, email});
    
                //Set a message after subscribing
                setMessage("Thank you for subscribing to our newsletters. Be sure to check your email for our bi-weekly updates");
                
                setShowForm(false);
                setPhonenumber('');
                setEmail('');
    
                //Clear message after 5 seconds
                setTimeout(() => {
                    setMessage('');
                    setShowForm(true);
                }, 5000);
            }
            catch (error){
                console.error('Error adding email', error);
            }
        };
        }
        
    
    /* This is for the side nav bar*/
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to display articles for the current page
  const [currentPage, setCurrentPage] = useState(1);//State variable for current page
  const articlesPerPage = 8; // Number of articles to display per page

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsletters.slice(indexOfFirstArticle, indexOfLastArticle);
  const numberOfPages = Math.ceil(newsletters.length / articlesPerPage);


  function prevPage(){
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
    }
  }
  function nextPage(){
    if (currentPage < numberOfPages) {
        setCurrentPage(currentPage + 1)
    }
  }
  
  return (
    <div className='homepage'>
        
         {isMobile ? (
        <div className='navbar'>
            <aside className='logo-big'>
            <img src={logo} alt='logos'/>
            <span>Kamati YMM</span>
          </aside>
          <button className='sidebar-toggle' onClick={toggleSidebar} >
          {sidebarOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
          </button>
          {sidebarOpen && <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />}
        </div>
      ) : (
        <nav className='top-nav'>
           <aside className='logo-big'>
            <img src={logo} alt='logos'/>
            <span>Kamati YMM</span>
          </aside>

          <Link to='/BookAppointment'>Book Appointment</Link>
          <Link to='/Shop'>Shop</Link>
          <Link to='/MealPlanner'>Meal Planner</Link>
          <Link to='/Newstart'>NEWSTART</Link>
          <Link to='/Sanitarium'>Sanitarium</Link>
          <Link to='/DownloadApp'>Download our App</Link>
          <Link to='/AboutUs'>About Us</Link>
        </nav>
      )}
        {/*Sign up form for the Newsletter */}
        
        {showForm && (<div className='header'>
            <div>
            <h3>Transform your health in under 5 minutes</h3>
            <p>Subscribe to our newsletters to start your journey towards a healthier lifestyle!</p>
            </div>

            <form className='newsletter' method='POST'>
              <input type='text' className='phonenumber' placeholder='Phone number' value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Regular expression for email validation
              required/>
              <input type='email' className='newslettermail' placeholder='youremail@domain.com' value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^\d{10}$" // Regular expression for 10-digit phone number validation
              required // Makes the input field required
              />
              <button type='button' className='newsletterBtn' onClick={newsletterSignup}>Subscribe</button>
            </form>
        </div>)}
        
        {/**Display subscription message */}
        <p className={`message ${message ? '' : 'hidden'}`}>{message}</p>
        {/**Newsletter Display goes here */}
        <h2> Top Headlines</h2>
        <div className='newsDisplayContainer'>
        {currentArticles.map((newsletters, index) => (
            <div className='newsDiplay' key={index}>
                <div className='newsItem'>
                    <h1 className='title'>{newsletters.title}</h1>
                    <img src={newsletters.image} alt={newsletters.title}/>
                    <p>{newsletters.description}</p>
                    <Link to={`/ReadArticle/${newsletters.id}`} className='readarticle'>Read</Link>
                </div>
            </div>
        ))}
        </div>
        {/* Pagination */}
      <nav className='pagination'>
        <button type='button' className='page-link'  onClick={prevPage}>Prev</button>
        <button type='button' className='page-link'  onClick={nextPage}>Next</button> 
      </nav>
        <footer className="footer">
            <div className="contact-info">
                <p>
                    <i className='fas fa-envelope'></i>
                    customerservice@kamatiymm.com
                </p>
                <p>
                    <i className='fas fa-phone'></i>
                    +254 742-065-623 / +254 795-063-917
                </p>
                <p>
                    <i className='fas fa-map-marker-alt'></i>
                    Moi University, Eldoret
                </p>
            </div>
            <div className="social-links">
                {/* Add social media icons and links */}
                <a href='https://www.facebook.com/kamatiymm/' target="_blank" rel="noreferrer">
                    <i className='fab fa-facebook-f'></i>
                </a>
                <a href='https://www.instagram.com/kamatiymm/' target="_blank" rel="noreferrer">
                    <i className='fab fa-instagram'></i>
                </a>
                <a href='https://wa.me/254742065623' target="_blank" rel="noreferrer">
                    <i className='fab fa-whatsapp'></i>
                </a>
            </div>
            <div className="legal-links">
                <a href='privacy-policy' target="_blank" rel="noreferrer">Privacy Policy</a>
                <a href='terms-of-service' target="_blank" rel="noreferrer">Terms of Service</a>
            </div>
            <div className="copyright">
                &copy; 2024 Kamati YMM. All rights reserved.
            </div>
    </footer>
    </div>
  )
}

export default HomePage