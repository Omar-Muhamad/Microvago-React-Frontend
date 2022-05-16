// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchHotelsDetails } from '../../redux/Hotel/hotel';
import { API_URL } from '../../redux/api/apiHelper';

const HotelRoom = ( {hotelRoom} ) => (
    <div>
        <div className="hotelRoom">
            <div className="imageContainer w-[300px] h-[170px]">
                <img className="w-full h-full rounded-lg" src={`${API_URL}${hotelRoom?.featured_room_image?.url}`} alt={hotelRoom.name} />
            </div>
            <div className="text-gray-400 hover:text-white">
                <h2 className="hotelName my-3 text-black text-lg font-black text-center">
                    {hotelRoom.price}
                </h2>
                <div className="text-center mb-3 text-gray-400">
                    -----------------------
                </div>
            </div>
        </div>
    </div>
);
    
export default HotelRoom;
