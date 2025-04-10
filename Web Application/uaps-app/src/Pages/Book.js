import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './Firebase';
import '../styles/Book.css';

const Booking = (props) => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [carNumber, setCarNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "seats"));
      const availableSeats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sessionId = querySnapshot.docs[0].id;
      sessionStorage.setItem('sessionName', JSON.stringify({ sessionId }));
      setAvailableSeats(availableSeats);
    };
    fetchData();
  }, []);

  const handleSelectSeat = (seat, availableSeats, setAvailableSeats) => {
    console.log(`Selected seat: ${seat.name}`);
    setSelectedSeat({ ...seat, id: seat.id });

    // Update the seat's availability in Firebase
    updateDoc(doc(db, "seats", seat.id), {
      //availability: false,
      
    }).then(() => {
      // Filter out the selected seat from the available seats list
      setAvailableSeats(availableSeats.filter((seat) => seat.name !== seat.name));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(customerName);
    console.log(customerEmail);
    console.log(carNumber);
  
    try {
      // Fetch the updated seat data from the database
      const seatRef = doc(db, "seats", selectedSeat.id);
      const seatDoc = await getDoc(seatRef);
  
      // Check if the seat is still available
      if (seatDoc.data().availability) {
        // Update the seat's availability in Firebase
        await updateDoc(seatRef, {
          customerName: customerName,
          customerEmail: customerEmail,
          carNumber: carNumber,
          availability: false,
        });
        console.log("Written to seats");

        await addDoc(collection(db, "customerBookings"), {
          customerName: customerName,
          customerEmail: customerEmail,
          carNumber: carNumber,
          bookingDate: serverTimestamp(),
          //bookingDate: bookingDate
        });
        console.log("Written to CustomerBooking");
  
        // Clear form fields
        setCustomerName("");
        setCustomerEmail("");
        setCarNumber("");
  
        console.log("Documents written with IDs: ");
        props.handleCloseForm();
      } else {
        alert ("Select Another Slot");
        console.log("Selected seat is no longer available");
        window.location.reload();
        // Handle the case where the seat is no longer available
      }
    } catch (e) {
      console.error("Error adding document to customerBookings collection: ", e);
    }
  };

  return (
    <div className='book'>
      <h1 className='heading'>
        {selectedSeat.id ? 'Fill Your Details' : 'Available Seats:'}
      </h1>
      <div className="seats">
        {availableSeats.map((seat) => {
          return (
            <button
              key={seat.id}
              className={`seat ${seat.availability ? '' : 'occupied'}`}
              disabled={seat.availability ? '' : true}
              onClick={() => handleSelectSeat(seat, availableSeats, setAvailableSeats)}
            >
              {seat.name}
            </button>
          );
        })}
      </div>
      {selectedSeat.id && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="customerName" className='lbl'>
            Customer Name:
            <input
              placeholder='Enter Your Name...'
              type="text"
              id="customerName"
              value={customerName}
              required
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
          <label htmlFor="customerEmail" className='lbl'>
            Customer Email:
            <input
              placeholder='Enter Your Email...'
              type="email"
              id="customerEmail"
              value={customerEmail}
              required
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </label>
          <label htmlFor="carNumber" className='lbl'>
            Car Number:
            <input
              placeholder='Enter Vehicle Registration Number...'
              type="text"
              id="carNumber"
              value={carNumber}
              required
              onChange={(e) => setCarNumber(e.target.value)}
            />
          </label>
          <button type="submit">Confirm Booking</button>
        </form>
      )}
    </div>
  );
};

export default Booking;