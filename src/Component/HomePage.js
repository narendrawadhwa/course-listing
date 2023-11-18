import React from 'react';
import './styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <div className="home-container">
      <div className="content-container">
        <h1 style={{fontSize:'45px'}}>Welcome to Our Courses</h1>
        <p style={{fontSize:'18px', margin:'10px 0px'}}>Embark on a learning adventure with us. Our commitment to quality education and your success is unwavering. Take the first step towards a brighter future – explore our courses now!
</p>
<Link to="/courses">
        <button className='explore-btn'>Explore</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
