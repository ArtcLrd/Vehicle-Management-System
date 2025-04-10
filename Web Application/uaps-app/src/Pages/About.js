import React from 'react';
import '../styles/About.css';

const students = [
  {
    name: 'Siddhesh Shinde',
    email: 'shindesiddhesh164@gmail.com',
    phone: '+91 9702582069',
  },
  {
    name: 'Om Lanjwal',
    email: 'olanjwalbusiness@gmail.com',
    phone: '+91 8591759339',
  },
];

function About() {
  return (
    <div className='about'>
      <div className='rightSide'>
        <h1>About Us!</h1>
        <p className='abt'>
          We are the Students of Vidyalankar School of Information Technology. This
          website is for our project. This website will help in booking the slot
          for car parking.
        </p>
        <div className='details'>
          <h2>Students Details:</h2>
          {students.map((student, index) => (
            <div key={index}>
              <h3>{student.name}</h3>
              <p className='stu'>Email: {student.email}</p>
              <p className='stu'>Phone: {student.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;