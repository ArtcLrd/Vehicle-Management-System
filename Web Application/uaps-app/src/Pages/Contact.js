import React from 'react';
import '../styles/Contact.css';
import './Firebase.js';
import { useState } from 'react';


function Contact() {

  const [userData, setUserData]=useState({
    name:"",
    email:"",
    message:"",
  });

  let name, value;
  const postUserData = (event) => {
    name=event.target.name;
    value=event.target.value;

    setUserData({...userData,[name]:value})
  };

  //connectin to Firebase
  const submitData = async(event) => {
    event.preventDefault();
    const {name, email, message} = userData;
    if(name && email && message){
      const res = await fetch('https://uaps-test1-default-rtdb.firebaseio.com/ContactUs.json',
        {
          method: "POST",
          Headers: {
          "Content-type" : "application/json",
            },
          body:JSON.stringify({
            name, 
            email, 
            message
          }),
        }
      );
      if(res){
        setUserData({
          name:"",
          email:"",
          message:"",
        })
        alert("Data Stored");
      }else{
        alert("Fill Data");
      }
    }else{
      alert("Fill Data");
    }
  };

  return (
    <div className="contact">
      <div className="rightSide">
        <h1> Contact Us!</h1>
        <form method='POST'>
          <label htmlFor="name" className='lbl'>
            Full Name:
            <input
              placeholder='Enter Your Name...'
              type="text"
              id="name"
              value={userData.name}
              onChange={postUserData} required
            />
          </label>
          <label htmlFor="email" className='lbl'>
            Email:
            <input
              placeholder='Enter Your Email...'
              type="text"
              id="email"
              value={userData.email}
              onChange={postUserData} required
            />
          </label>
          <label htmlFor="message" className='lbl'>
            Message:
            <textarea
              placeholder='Enter Your Message...'
              type="text"
              id="message"
              value={userData.name}
              onChange={postUserData} required
            />
          </label>
          <button type="submit" onClick={submitData}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact