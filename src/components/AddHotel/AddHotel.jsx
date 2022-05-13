import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddHotel = () => {
  const rooms = useSelector((state) => state.rooms.rooms);
  const roomsCheckedState = {};
  rooms.forEach((room) => {
    roomsCheckedState[room.id] = false;
  });
  const [checkedState, setCheckedState] = useState(roomsCheckedState);
  const changeCheckboxHandler = (index) => {
    setCheckedState((prevState) => {
      const newState = { ...prevState };
      newState[index] = !prevState[index];
      return newState;
    });
  };

  return (
    <div className="container">
      <h1 className="form-title">Add Hotel</h1>
      <form className="hotel-form">
        <input className="hotel-input" type="text" placeholder="Enter hotel name" />
        <input className="hotel-input" type="text" placeholder="Enter hotel location" />
        <textarea className="hotel-input" id="hotel-description" placeholder="Enter hotel description" />
        <input className="hotel-input" type="number" placeholder="Enter hotel rating" />
        <label id="file-button" className="hotel-input" htmlFor="files">
          Upload file
          <input id="files" className="hotel-input" type="file" />
        </label>
        {rooms.map((room) => (
          <div key={room.id} className="checkbox">
            <input value={room.id} name={room.type} type="checkbox" checked={checkedState[room.id] || false} onChange={() => changeCheckboxHandler(room.id)} />
            <label htmlFor={room.type}>{room.type}</label>
            {checkedState[room.id]
              && (
                <div className="checkbox-input">
                  <input className="hotel-input room-price" type="text" placeholder="Enter room price" />
                  <label id="file-button" className="hotel-input room-price" htmlFor="files">
                    Upload file
                    <input id="files" className="hotel-input" type="file" />
                  </label>
                </div>
              )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default AddHotel;
