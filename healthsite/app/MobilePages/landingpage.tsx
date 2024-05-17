// Landingpage.jsx
'use client'

import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from "./Header";
import Promotion from "./Promotion";
import BMI from "./BMI";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import Welcome from "./Welcome";

function Landingpage() {
  return <div className="space-y-2 w-full">
    <Header />
    <Promotion />
    <Welcome />
    <BMI />
    <Testimonials />
    <Newsletter />
    <Footer />
  </div>;
}

export default Landingpage;