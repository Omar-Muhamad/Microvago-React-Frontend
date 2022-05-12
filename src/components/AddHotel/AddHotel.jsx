import React from 'react';
import { useSelector } from 'react-redux';

const AddHotel = () => {
  const rooms = useSelector((state) => state.rooms.rooms);

  return (
    <div>
      <h1>Add Hotel</h1>
      <form>
        <input type="text" placeholder="Enter hotel name" />
        <input type="text" placeholder="Enter hotel location" />
        <textarea placeholder="Enter hotel description" />
        <input type="number" placeholder="Enter hotel rating" />
        <input type="file" />
        {rooms.map((room) => (
          <div key={room.id}>
            <input value={room.id} name={room.type} type="checkbox" />
            <label htmlFor={room.type}>{room.type}</label>
            <div>
              <input type="text" placeholder="Enter room price" />
              <input type="file" />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default AddHotel;
