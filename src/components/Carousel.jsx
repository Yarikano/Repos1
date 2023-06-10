import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector } from 'react-redux';

const CarouselComponent = ({ id }) => {
	const { rooms } = useSelector(state => state.rooms);
	const currentRoomId = rooms.find(item => String(item.id) === id);
	return (
		<Carousel>
			{!currentRoomId
				? ''
				: currentRoomId.gallery.map((item, index) => (
						<div key={index} className='carousel-item'>
							<img src={item} alt='' />
						</div>
				  ))}
		</Carousel>
	);
};

export default CarouselComponent;
