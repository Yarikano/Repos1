import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import DemoCarousel from '../components/Carousel';
import { CheckOutlined } from '@ant-design/icons';
import CheckOut from '../components/CheckOut';
import CheckIn from '../components/CheckIn';
const RoomDetail = () => {
	const { id } = useParams();
	const { rooms } = useSelector(state => state.rooms);
	const [currentRoom, setCurrentRoom] = useState({});
	const [features, setFeatures] = useState([]);
	useEffect(() => {
		const currentRoomId = rooms.find(item => String(item.id) === id);
		setCurrentRoom(currentRoomId);
	}, [id, rooms]);
	useEffect(() => {
		if (currentRoom === undefined) {
		} else {
			let array = currentRoom.features;
			setFeatures(array);
		}
	}, [currentRoom]);
	return (
		<div className='cuurent-room-wrapper'>
			{!currentRoom ? (
				''
			) : (
				<>
					<div className='curren-room-header'>
						<Button className='back-to-home'>
							<Link to='/'>
								<HomeOutlined className='home-icon' />
								Back Home
							</Link>
						</Button>
					</div>
					<div className='main-room-content'>
						<DemoCarousel id={id} currentRoom={currentRoom} />
						<div className='room-info-box'>
							<div className='room-info'>
								<h2>
									<span>Room</span> {currentRoom.number}
								</h2>
								<span className='info-elem'>
									<span className='name'>Type:</span>
									{currentRoom.type}
								</span>
								<span className='info-elem'>
									<span className='name'>Occupancy:</span>{' '}
									{currentRoom.occupancy}
								</span>
								<span className='info-elem'>
									<span className='name'>Price:</span> {currentRoom.price}$
								</span>
								<span className='info-elem'>
									<span className='name'>Guest:</span>
									{currentRoom.guest}
								</span>
							</div>
							<div className='room-add-info'>
								<div className='room-buttons'>
									<CheckIn currentRoom={currentRoom} />
									<CheckOut currentRoom={currentRoom} />
								</div>
								<h2>Features</h2>
								<ul>
									{!features
										? ''
										: features.map((item, index) => (
												<li key={index}>
													<CheckOutlined />
													{item}
												</li>
										  ))}
								</ul>
							</div>
						</div>
					</div>
					<div className='room-description'>
						<h2>Description:</h2>
						{<p>{currentRoom.description}</p>}
					</div>
				</>
			)}
		</div>
	);
};

export default RoomDetail;
