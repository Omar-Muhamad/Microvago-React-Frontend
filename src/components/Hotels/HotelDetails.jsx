import { useParams } from 'react-router-dom';

const HotelDetails = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto">
      <div>Reservations</div>
    </div>
  );
};

export default HotelDetails;
