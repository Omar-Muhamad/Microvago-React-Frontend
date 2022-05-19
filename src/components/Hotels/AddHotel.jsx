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
    navigate('/');
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
    <div className="formContainer splashBG bg-[#6D22FB] h-hero sm:min-h-screen w-full flex items-center justify-center text-white text-center">
      <div className="px-6 py-14 lg:px-20 lg:py-40 h-full w-full w-full overflow-y-auto">
        <h1 className="font-['Comfortaa'] text-white text-3xl font-bold">
          Add Hotel
        </h1>
        <form
          onSubmit={submitHandler}
          className="sm:px-24 flex flex-col items-center justify-center gap-2 w-full text-lg w-full"
        >
          <div className="flex flex-col sm:flex-row sm:gap-6 w-full">
            <div className="w-full">
              <input
                className="w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
                name="name"
                type="text"
                placeholder="Enter hotel name"
                required
                onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
              />
              <input
                required
                onChange={(e) => dispatch({ type: 'location', payload: e.target.value })}
                className="w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
                type="text"
                placeholder="Enter hotel location"
              />
              <input
                required
                onChange={(e) => dispatch({ type: 'rating', payload: e.target.value })}
                className="w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
                type="number"
                placeholder="Enter hotel rating"
              />
            </div>
            <textarea
              required
              onChange={(e) => dispatch({ type: 'description', payload: e.target.value })}
              className="w-full p-3 mt-6 bg-transparent border-2 rounded-[30px] font-medium text-center"
              id="hotel-description"
              placeholder="Enter hotel description"
            />
          </div>
          <div className="w-full mt-6 flex flex-col text-center gap-8 text-gray-400">
            <div className=" w-full p-3 pl-10 bg-transparent border-2 rounded-full font-medium text-center relative">
              <input
                className="w-full z-100 opacity-0"
                type="file"
                id="hotel-files"
                onChange={(e) => dispatch({ type: 'image', payload: e.target.files[0] })}
              />
              <p className="addImg absolute top-3 left-6">Add images</p>
              <button type="button" className="absolute right-6 top-4">
                <i className="fa-solid fa-images" />
              </button>
            </div>
            {isFormSubmitted && (
              <div className="text-yellow-200 border p-2 rounded bg-red-800 w-3/4 text-center">
                {errorMessage}
              </div>
            )}
            <div className="w-full min-h-[200px] pt-2 px-8 bg-transparent border-2 rounded-[30px] font-medium ">
              <h3 className="mb-2">Select room type</h3>
              {rooms.map((room) => (
                <div key={room.id} className="flex w-full items-center mb-4">
                  <div className="flex items-center justify-center">
                    <input
                      value={room.id}
                      name={room.type}
                      type="checkbox"
                      checked={checkedState[room.id]?.checked || false}
                      onChange={() => changeCheckboxHandler(room.id)}
                      className="mr-2"
                    />
                    <label htmlFor={room.type} className="">
                      {room.type}
                    </label>
                  </div>
                  {checkedState[room.id]?.checked && (
                    <div className="flex w-full gap-3 pl-4">
                      <input
                        onChange={(e) => priceChangeHandler(e.target.value, room.id)}
                        className="rounded-full w-1/2 text-black px-4 flex-1"
                        type="number"
                        placeholder="Room price"
                        required={checkedState[room.id]?.checked}
                      />
                      <label
                        className="file-button px-2 bg-white rounded-full sm:w-1/2"
                        htmlFor={room.id}
                      >
                        <input
                          id={room.id}
                          onChange={(e) => roomImageChangeHandler(e.target.files[0], room.id)}
                          className="hidden"
                          type="file"
                        />
                        <i className="fa-solid fa-images" />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            className="w-3/5 sm:w-2/5 mt-4 rounded-full py-2 sm:py-3 bg-white text-[#6D22FB] font-medium hover:bg-transparent border-2 border-transparent hover:border-white hover:text-white"
            type="submit"
          >
            Add new hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
