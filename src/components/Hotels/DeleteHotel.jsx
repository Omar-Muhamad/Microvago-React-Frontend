import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHotel, fetchHotels } from '../../redux/Hotel/hotel';
import { API_URL } from '../../redux/api/apiHelper';
import { startLoading, stopLoading } from '../../redux/UI/ui';
import Spinner from '../Spinner/Spinner';

const DeleteHotel = () => {
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(fetchHotels()).then(() => {
      dispatch(stopLoading());
    });
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteHotel(id));
    dispatch(fetchHotels());
  };

  return (
    <div className="h-hero sm:max-h-screen sm:min-h-screen h-full w-full overflow-y-auto text-center flex flex-col px-6 sm:px-14 py-10 sm:py-20">
      <div className="titleContainer flex flex-col items-center justify-end gap-3 text-gray-400">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-700">All Hotels</h1>
      </div>
      { isLoading && <Spinner classes="bg-black" /> }
      {!isLoading && hotels.length === 0 && (
        <div className="text-2xl text-gray-400 grow text-center font-bold select-none flex items-center justify-center">Nothing to delete.</div>
      )}
      {!isLoading && hotels.length > 0 && (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 sm:flex-row gap-8 sm:gap-12 mt-8 sm:mt-14">
        {hotels && hotels.map((hotel) => (
          <li
            key={hotel.id}
            className="w-full border-2 rounded-[15px] sm:rounded-[30px] p-[20px] sm:p-[30px] shadow-xl"
          >
            <div className="w-full h-[200px] sm:h-[300px]">
              <img className="w-full h-full bg-[#6D22FB] rounded-xl" src={`${API_URL}${hotel.image.url}`} alt={hotel.name} />
            </div>
            <ul className="detailsList mt-6 text-lg font-medium flex flex-col gap-1">
              <li>Hotel: </li>
              <li className="py-1 rounded-[5px] text-center">{hotel.name.toUpperCase()}</li>
              <li>Location: </li>
              <li className="p-1 rounded-[5px] text-center">{hotel.location}</li>
              <button className="my-5 text-xl font-medium bg-red-500 rounded-[10px] p-3 text-white" type="button" onClick={() => handleDelete(hotel.id)}>
                Delete Hotel
              </button>
            </ul>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default DeleteHotel;
