import { Button, Modal, DatePicker, Space } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

const ChekIn = ({ currentRoom }) => {
	const dateCurrent = useRef();
	const guestNameRef = useRef();
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');
	const date = new Date();
	const currentDate = date.toJSON().slice(0, 10);
	const showModal = () => {
		setOpen(true);
	};
	const handleOk = () => {
		roomCheckIn();
	};
	const handleCancel = () => {
		setOpen(false);
	};
	const onChange = (date, dateString) => {
		setSelectedDate(dateString);
	};
	const roomCheckIn = async () => {
		const test = doc(db, 'Rooms', id);
		if (guestNameRef.current.value === '') {
			return alert('Enter your name');
		} else if (selectedDate === '') {
			alert('Please select date');
			return;
		} else {
			await updateDoc(test, {
				guest: guestNameRef.current.value,
				isCheckedIn: true,
				checkInDate: currentDate,
				checkOutDate: selectedDate
			});
			if (selectedDate === '') {
				alert('asdasa');
				return;
			}
			setConfirmLoading(true);
			guestNameRef.current.value = '';
			setSelectedDate('');
			setTimeout(() => {
				setOpen(false);
				setConfirmLoading(false);
			}, 1000);
		}
	};
	useEffect(() => {
		if (currentDate > currentRoom.checkOutDate) {
			roomReset();
		}
		// eslint-disable-next-line
	}, [currentDate, currentRoom.checkInDate]);
	const roomReset = async () => {
		const test = doc(db, 'Rooms', id);
		await updateDoc(test, {
			guest: '',
			isCheckedIn: false,
			checkInDate: '',
			checkOutDate: ''
		});
	};
	return (
		<>
			{currentRoom.isCheckedIn ? (
				<Button onClick={showModal} disabled>
					Not available
				</Button>
			) : (
				<Button onClick={showModal}>Check In</Button>
			)}
			<Modal
				title='Check In'
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<Space direction='vertical'>
					<label htmlFor='guest-name'>Please, enter the guest's name:</label>
					<UserOutlined className='guest-icon' />
					<input
						type='text'
						placeholder={"Guest's Name"}
						className='input-name'
						id='guest-name'
						ref={guestNameRef}
					/>
					<label htmlFor='calendar'>
						Please, enter the approximate date of guest checkout:
					</label>
					<DatePicker onChange={onChange} ref={dateCurrent} id='calendar' />
				</Space>
			</Modal>
		</>
	);
};

export default ChekIn;
