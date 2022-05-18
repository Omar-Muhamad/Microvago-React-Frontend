import PropTypes from 'prop-types';
import { API_URL } from '../../redux/api/apiHelper';

const HotelRoom = ({ hotelRoom }) => (
  <div className="hotelRoom border-2 rounded-[30px] p-[30px] ">
    <div className="imageContainer w-full h-[300px]">
      <img
        className="w-full h-full bg-[#6D22FB] rounded-xl"
        src={`${API_URL}${hotelRoom?.featured_room_image?.url}`}
        alt={hotelRoom.name}
      />
    </div>
    <ul className="detailsList mt-6 text-lg font-medium flex flex-col gap-1">
      <li>Room type:</li>
      <li className="py-1 rounded-[5px] text-center">
        {hotelRoom.room.type}
      </li>
      <li>Price:</li>
      <li className="py-1 rounded-[5px] text-center">
        {`${hotelRoom.price} $`}
      </li>
      <li>Capacity:</li>
      <li className="py-1 rounded-[5px] text-center">
        {`Up to ${hotelRoom.room.guests_number} guests`}
      </li>
    </ul>
  </div>
);

HotelRoom.propTypes = {
  hotelRoom: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    featured_room_image: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    room: PropTypes.shape({
      number: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      guests_number: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default HotelRoom;
