import React from 'react';
/*import BannerImage from '../assets/car-parking-lottest.png';*/
import '../styles/Home.css'

function Home() {
  return (
    <div className="home" /*style={{ backgroundImage:`url(${BannerImage})`}}*/>
        <div className="headerContainer" >
            <h1>Underground Automatic Car Parking System</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <p>Park your car here...</p>
            <a href="/book">
              <button>Book Now!</button>
            </a>
        </div>
    </div>
  );
}

export default Home