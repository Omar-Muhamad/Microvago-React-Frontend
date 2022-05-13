import React, { useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { putHotels } from '../../redux/Hotel/hotel';

const form = {
  name: '',
  location: '',
  description: '',
  rating: 0,
  image: '',
  rooms: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload,
      };
    case 'location':
      return {
        ...state,
        location: action.payload,
      };
    case 'description':
      return {
        ...state,
        description: action.payload,
      };
    case 'rating':
      return {
        ...state,
        rating: action.payload,
      };
    case 'image':
      return {
        ...state,
        image: action.payload,
      };
    default:
      throw new Error();
  }
};

const AddHotel = () => {
  const dispatcher = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const roomsCheckedState = {};
  rooms.forEach((room) => {
    roomsCheckedState[room.id] = {
      checked: false,
      price: 0,
      image: '',
    };
  });
  const [checkedState, setCheckedState] = useState(roomsCheckedState);
  const [formState, dispatch] = useReducer(reducer, form);
  const navigate = useNavigate();

  const changeCheckboxHandler = (index) => {
    setCheckedState((prevState) => {
      const newState = { ...prevState };
      newState[index] = {
        ...prevState[index],
        checked: !prevState[index]?.checked,
      };
      return newState;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Object.keys(checkedState).forEach((id) => {
      if (checkedState[id].checked) {
        formState.rooms.push({
          id,
          price: checkedState[id].price,
          image: checkedState[id].image,
        });
      }
    });
    dispatcher(putHotels(formState));
    navigate('/hotels');
  };

  const priceChangeHandler = (price, id) => {
    setCheckedState((prevState) => {
      const newState = { ...prevState };
      newState[id].price = parseInt(price, 10);
      return newState;
    });
  };

  const roomImageChangeHandler = (image, id) => {
    setCheckedState((prevState) => {
      const newState = { ...prevState };
      newState[id].image = image;
      return newState;
    });
  };

  return (
    <div className="container">
      <h1 className="form-title">Add Hotel</h1>
      <form onSubmit={submitHandler} className="hotel-form">
        <input required onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} name="name" className="hotel-input" type="text" placeholder="Enter hotel name" />
        <input required onChange={(e) => dispatch({ type: 'location', payload: e.target.value })} className="hotel-input" type="text" placeholder="Enter hotel location" />
        <textarea required onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} className="hotel-input" id="hotel-description" placeholder="Enter hotel description" />
        <input required onChange={(e) => dispatch({ type: 'rating', payload: e.target.value })} className="hotel-input" type="number" placeholder="Enter hotel rating" />
        <label className="hotel-input file-button" htmlFor="hotel-files">
          Upload file
          <input id="hotel-files" onChange={(e) => dispatch({ type: 'image', payload: e.target.value })} className="hotel-input files" type="file" />
        </label>
        {rooms.map((room) => (
          <div key={room.id} className="checkbox">
            <input value={room.id} name={room.type} type="checkbox" checked={checkedState[room.id]?.checked || false} onChange={() => changeCheckboxHandler(room.id)} />
            <label htmlFor={room.type}>{room.type}</label>
            {checkedState[room.id]?.checked
              && (
                <div className="checkbox-input">
                  <input onChange={(e) => priceChangeHandler(e.target.value, room.id)} className="hotel-input room-price" type="number" placeholder="Enter room price" />
                  <label className="hotel-input room-price file-button" htmlFor={room.id}>
                    Upload file
                    <input id={room.id} onChange={(e) => roomImageChangeHandler(e.target.value, room.id)} className="hotel-input files" type="file" />
                  </label>
                </div>
              )}
          </div>
        ))}
        <button className="hotel-input file-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddHotel;
