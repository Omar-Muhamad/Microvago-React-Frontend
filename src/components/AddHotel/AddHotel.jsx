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
  const navigate = useNavigate();
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
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const isFormValid = (formState) => {
    if (!formState.image) {
      setErrorMessage('Please upload an image to the hotel');
      return false;
    }
    if (formState.rooms.length === 0) {
      setErrorMessage('Please add at least one room type');
      return false;
    }
    let nullRoomImage = false;
    formState.rooms.forEach((room) => {
      if (!room.featured_room_image) {
        setErrorMessage('Please upload all images for the selected rooms');
        nullRoomImage = true;
      }
    });
    if (nullRoomImage) return false;
    return true;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    Object.keys(checkedState).forEach((id) => {
      if (checkedState[id].checked) {
        formState.rooms.push({
          id,
          price: checkedState[id].price,
          featured_room_image: checkedState[id].image,
        });
      }
    });

    if (!isFormValid(formState)) return;

    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('description', formState.description);
    formData.append('rating', formState.rating);
    formData.append('image', formState.image);
    formData.append('location', formState.location);
    formState.rooms.forEach((room) => {
      formData.append(`rooms[${room.id}][price]`, room.price);
      formData.append(`rooms[${room.id}][featured_room_image]`, room.featured_room_image);
    });

    dispatcher(putHotels(formData));
    setIsFormSubmitted(false);
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
    <div className="form-container">
      <h1 className="form-title">Add Hotel</h1>
      <form onSubmit={submitHandler} className="hotel-form">
        <input required onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} name="name" className="hotel-input" type="text" placeholder="Enter hotel name" />
        <input required onChange={(e) => dispatch({ type: 'location', payload: e.target.value })} className="hotel-input" type="text" placeholder="Enter hotel location" />
        <textarea required onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} className="hotel-input" id="hotel-description" placeholder="Enter hotel description" />
        <input required onChange={(e) => dispatch({ type: 'rating', payload: e.target.value })} className="hotel-input" type="number" placeholder="Enter hotel rating" />
        <label className="hotel-input file-button bg-purple-700" htmlFor="hotel-files">
          Upload image
          <input id="hotel-files" onChange={(e) => dispatch({ type: 'image', payload: e.target.files[0] })} className="hotel-input files" type="file" />
        </label>
        {isFormSubmitted && (
          <div className="text-yellow-200 border p-2 rounded bg-red-800 w-3/4 text-center">{errorMessage}</div>
        )}
        <fieldset className="border rounded py-3 px-2 sm:px-6 w-4/5 sm:w-3/4 flex flex-col gap-2">
          <legend className="font-bold">Available rooms:</legend>
          {rooms.map((room) => (
            <div key={room.id} className="flex items-center h-9">
              <div className="w-2/5">
                <input value={room.id} name={room.type} type="checkbox" checked={checkedState[room.id]?.checked || false} onChange={() => changeCheckboxHandler(room.id)} className="mr-2" />
                <label htmlFor={room.type} className="mr-2">{room.type}</label>
              </div>
              {checkedState[room.id]?.checked
                && (
                  <div className="flex w-3/5">
                    <input onChange={(e) => priceChangeHandler(e.target.value, room.id)} className="rounded-l-lg text-black pl-2 w-1/2 sm:w-auto flex-1" type="number" placeholder="Room price" required={checkedState[room.id]?.checked} />
                    <label className={`file-button py-0.5 px-1 sm:py-1 sm:px-2 rounded-r-lg bg-${checkedState[room.id].image ? 'green' : 'purple'}-700`} htmlFor={room.id}>
                      <i className="fa-solid fa-images" />
                      <input id={room.id} onChange={(e) => roomImageChangeHandler(e.target.files[0], room.id)} className="files" type="file" />
                    </label>
                  </div>
                )}
            </div>
          ))}
        </fieldset>
        <button className="hotel-input file-button bg-purple-700" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddHotel;
