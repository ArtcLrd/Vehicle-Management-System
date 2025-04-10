import React, { useEffect, useState } from "react";
import { db } from "../Pages/Firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import CustomerForm from "./CustomerForm";

export default function AvailableSeats(props) {
  const { session, setSession } = props;
  const [seats, setSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  useEffect(() => {
    const getSeats = async () => {
      const querySnapshot = await getDocs(collection(db, "seats"));
      const seatsList = [];
      querySnapshot.forEach((doc) => {
        seatsList.push({ id: doc.id, ...doc.data() });
      });
      setSeats(seatsList);
      setAvailableSeats(seatsList.filter((seat) => seat.availability));
    };
    getSeats();

    const sessionData = JSON.parse(sessionStorage.getItem('sessionName'));
    if (sessionData) {
      setSession(sessionData);
      setSelectedSeat(sessionData.selectedSeat);
      console.log('Session ID: ',session.sessionId);
    } else {
      // Generate a new session id if there's no session data in storage
      const sessionId = uuidv4();
      setSession({
        customerName: '',
        customerEmail: '',
        carNumber: '',
        selectedSeat: null,
        sessionId: sessionId,
      });sessionStorage.setItem('sessionName', JSON.stringify({ sessionId }));
    }
  }, []);

  const handleSelectSeat = async (seat) => {
    console.log(`Selected seat: ${seat.name}`);
    setSession({
      ...session,
      selectedSeat: seat.name,
    });
    const slot = seat.id;
    console.log(`Selected slot: ${slot}`);

    // Update the seat's availability in Firebase
    await updateDoc(doc(db, "seats", seat.id), {
      availability: false,
    });

    // Filter out the selected seat from the available seats list
    setAvailableSeats(availableSeats.filter((seat) => seat.name !== slot));

    // Pass the seat.id to the CustomerForm component
    setSelectedSeat({ ...seat, id: slot });
  };

  const handleCloseForm = () => {
    setSelectedSeat(null);
  };

  return (
    <div>
      <h1>Available Seats:</h1>
      <div className="seats">
        {availableSeats.map((seat) => {
          return (
            <button
              key={seat.id}
              className={`seat ${seat.availability ? "" : "occupied"}`}
              disabled={seat.availability ? "" : true}
              onClick={() => handleSelectSeat(seat)}
            >
              {seat.name}
            </button>
          );
        })}
      </div>

      {selectedSeat && (
        <CustomerForm
          seat={selectedSeat}
          handleCloseForm={handleCloseForm}
        />
      )}
    </div>
  );
}