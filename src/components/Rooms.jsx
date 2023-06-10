import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import {
	sortByNumber,
	sortByOccupancy,
	sortByPrice,
	sortByType,
	sortByGuest
} from '../redux/toolkit/slices/rooms';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import PagginationComponent from './Pagination';
import { UserAuth } from '../context/AuthContext';

const Rooms = () => {
	const freeRoomsRef = useRef();
	const dispatch = useDispatch();
	const { rooms, numberSort, occupancySort, priceSort, typeSort, guestSort } =
		useSelector(state => state.rooms);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [isCheckedFilter, setisCheckedFilter] = useState(false);
	const indexOfTheLastPost = currentPage * postsPerPage;
	const indexOfTheFirstPost = indexOfTheLastPost - postsPerPage;
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};
	const currentPosts = rooms.slice(indexOfTheFirstPost, indexOfTheLastPost);
	const filterPosts = rooms.filter(item => item.isCheckedIn === false);
	const PaginFilteredPosts = filterPosts.slice(
		indexOfTheFirstPost,
		indexOfTheLastPost
	);
	const [width, setWidth] = useState(window.innerWidth);

	const { user } = UserAuth();
	useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(window.innerWidth);
		});
	}, [width]);
	return (
		<div className='main'>
			<div className='filter-header'>
				<Button
					type='primary'
					className='reset-filter'
					onClick={() => {
						freeRoomsRef.current.checked = false;
						setisCheckedFilter(freeRoomsRef.current.checked);
					}}
				>
					Clear all filters
				</Button>
				<input
					type='checkbox'
					id='filter'
					ref={freeRoomsRef}
					onChange={() => {
						setisCheckedFilter(freeRoomsRef.current.checked);
					}}
				/>
				<label htmlFor='filter'>Free rooms only</label>
			</div>
			<table width='100%'>
				<thead className='table-header'>
					<tr>
						<th>
							<button
								onClick={() => {
									dispatch(sortByNumber());
								}}
							>
								Number
								{numberSort ? <CaretDownOutlined /> : <CaretUpOutlined />}
							</button>
						</th>
						<th>
							<button
								onClick={() => {
									dispatch(sortByType());
								}}
							>
								Type
								{typeSort ? <CaretDownOutlined /> : <CaretUpOutlined />}
							</button>
						</th>
						<th>
							<button
								onClick={() => {
									dispatch(sortByOccupancy());
								}}
							>
								Occupancy
								{occupancySort ? <CaretDownOutlined /> : <CaretUpOutlined />}
							</button>
						</th>
						<th>
							<button
								onClick={() => {
									dispatch(sortByPrice());
								}}
							>
								Price
								{priceSort ? <CaretDownOutlined /> : <CaretUpOutlined />}
							</button>
						</th>
						<th>
							<button
								onClick={() => {
									dispatch(sortByGuest());
								}}
							>
								Guest
								{guestSort ? <CaretDownOutlined /> : <CaretUpOutlined />}
							</button>
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody className='table-body'>
					{!isCheckedFilter
						? currentPosts.map(room => (
								<tr key={room.id}>
									<th>{room.number}</th>
									<th>{room.type}</th>
									<th>{room.occupancy}</th>
									<th>{room.price} $</th>
									<th>{room.guest}</th>
									<th>
										<Button type='primary'>
											{user ? (
												<Link to={`room/${room.id}`}>
													{width < 500 ? 'More...' : 'More information'}
												</Link>
											) : (
												<Link to={`/login`}>
													{width < 500 ? 'More...' : 'More information'}
												</Link>
											)}
										</Button>
									</th>
								</tr>
						  ))
						: PaginFilteredPosts.map(room => (
								<tr key={room.id}>
									<th>{room.number}</th>
									<th>{room.type}</th>
									<th>{room.occupancy}</th>
									<th>{room.price}</th>
									<th>{room.guest}</th>
									<th className='room-button'>
										<Button type='primary'>
											{user ? (
												<Link to={`room/${room.id}`}>
													{width < 500 ? 'More...' : 'More information'}
												</Link>
											) : (
												<Link to={`/login`}>
													{width < 500 ? 'More...' : 'More information'}
												</Link>
											)}
										</Button>
									</th>
								</tr>
						  ))}
				</tbody>
			</table>
			<PagginationComponent
				postsPerPage={postsPerPage}
				totalPosts={rooms.length}
				paginate={paginate}
				current={currentPage}
				isCheckedFilter={isCheckedFilter}
				filterPosts={filterPosts}
			/>
		</div>
	);
};

export default Rooms;
