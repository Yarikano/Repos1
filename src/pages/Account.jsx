import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Space } from 'antd';
const Account = () => {
	const { currentUser } = useSelector(state => state.users);
	const { user, logout } = UserAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
			console.log('logginout');
		} catch (e) {
			console.log(e.message);
		}
	};
	return (
		<>
			{currentUser ? (
				<div className='main-user-wrapper'>
					<h1>Account</h1>
					<p>
						<span>User Status: </span>
						{currentUser.status}
					</p>
					<p>
						<span>User Email: </span>
						{user && user.email}
					</p>
					<Space wrap>
						<Button type='primary' danger onClick={handleLogout}>
							Logout
						</Button>
					</Space>
				</div>
			) : (
				<h2>Loading...</h2>
			)}
		</>
	);
};

export default Account;
