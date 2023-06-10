import { Button, Modal } from 'antd';
import { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
const CheckOut = ({ currentRoom }) => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Content of the modal');

	const showModal = () => {
		setModalText(`Do you confirm the check-out Room ${currentRoom.number}`);
		setOpen(true);
	};
	const handleOk = () => {
		roomCheckOut();
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 1000);
		setConfirmLoading(true);
	};
	const handleCancel = () => {
		setOpen(false);
	};
	const roomCheckOut = async () => {
		const test = doc(db, 'Rooms', id);
		await updateDoc(test, {
			guest: '',
			isCheckedIn: false,
			checkInDate: ''
		});
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Check Out
			</Button>
			<Modal
				title='Title'
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<p>{modalText}</p>
			</Modal>
		</>
	);
};

export default CheckOut;
