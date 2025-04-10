import React, { useState } from "react";
import { db } from "../Pages/Firebase";
import { collection, addDoc } from "firebase/firestore";
import './AvailableSeat.js';


const CustomerForm = (props) => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [carNumber, setCarNumber] = useState("");

  const { seat } = props;
  const seatID = seat.id;
  //console.log(seat.id)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!seat) {
      console.error("Seat is not defined.");
      return;
    }
    /*const seatName = seat.id.toString();

  if (!/^[a-zA-Z][a-zA-Z0-9_-]{2,21}$/.test(seatName)) {
    console.error("Invalid collection reference: seats/" + seatName);
    return;
  }*/

    // Create a new document in the "customerBookings" collection
    try {
      await addDoc(collection(db, "customerBookings"), {
        customerName: customerName,
        customerEmail: customerEmail,
        carNumber: carNumber,
        //bookingDate: bookingDate
      });
      console.log("Written to CustomerBooking");

      // Create a new document in the "seats" collection
      try {
        await addDoc(collection(db, "seats",seatID.toString()), {
          //id: seat.id,
          //...seat,
          customerName: customerName,
          customerEmail: customerEmail,
          carNumber: carNumber,
          availability: false,
        });
        console.log("Written to seats")

        // Clear form fields
        setCustomerName("");
        setCustomerEmail("");
        setCarNumber("");

        console.log("Documents written with IDs: ");
        props.handleCloseForm();
      } catch (e) {
        console.error("Error adding document to seats collection: ", e);
      }
    } catch (e) {
      console.error("Error adding document to customerBookingscollection: ", e);
    }
  };

  return (
    <div className="contact">
      <div className="rightSide">
        <h1>Fill Your Details...</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Customer Name:</label>
          <input
            id="name"
            placeholder="Enter full name..."
            name="name"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <label htmlFor="email">Customer Email:</label>
          <input
            id="email"
            placeholder="Enter email..."
            name="email"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
          <label htmlFor="carNumber">Car Number:</label>
          <input
            id="carNumber"
            placeholder="Enter car number..."
            name="carNumber"
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;