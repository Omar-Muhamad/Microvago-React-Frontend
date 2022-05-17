import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../redux/api/apiHelper';

const HotelRoom = ({ hotelRoom, hotelId }) => (
<div>
		<div className="hotelRoom">
			<div className="imageContainer w-[300px] h-[170px]">
				<img className="w-full h-full rounded-lg" src={`${API_URL}${hotelRoom?.featured_room_image?.url}`} alt={hotelRoom.name} />
			</div>
			<div className="text-gray-400 hover:text-white">
				<h2 className="hotelName my-3 text-black text-lg font-black text-center">
					{hotelRoom.room.type}
				</h2>
				<h2 className="hotelName my-3 text-black text-lg font-black text-center">
					{hotelRoom.price}
				</h2>
				<h2 className="hotelName my-3 text-black text-lg font-black text-center">
					Up to: {hotelRoom.room.guests_number} guests
				</h2>
				<NavLink to={`/reservations/add?hotelId=${hotelId}&hotelRoomId=${hotelRoom.id}`}>Add reservation</NavLink>
				<div className="text-center mb-3 text-gray-400">
					-----------------------
        </div>
			</div>
		</div>
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
		})
	}).isRequired,
	hotelId: PropTypes.number.isRequired,
}

export default HotelRoom;
