import { Link, NavLink, Outlet } from 'react-router-dom';
import { Button, Space, Dropdown } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/toolkit/slices/users';

const HeaderComponent = () => {
	const { users } = useSelector(state => state.users);
	const { currentUser } = useSelector(state => state.users);
	const navigate = useNavigate();
	const { logout } = UserAuth();
	const { user } = UserAuth();
	const { userUid } = UserAuth();
	const dispatch = useDispatch();
	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		if (user) {
			const userThis = users.filter(item => item.id === userUid);
			dispatch(setCurrentUser(userThis[0]));
		} else {
			return;
		}
		// eslint-disable-next-line
	}, [user, users]);

	const onMenuClick = e => {
		console.log('click', e);
	};
	const items = [
		{
			key: '1',
			label: <Link to='/'>Home</Link>
		},
		{
			key: '3',
			label: (
				<span onClick={handleLogout}>
					LogOut
					<LogoutOutlined className='logout-icon' />
				</span>
			)
		}
	];

	return (
		<>
			<header className='header'>
				<nav className='nav'>
					<div className='nav-list'>
						<div className='nav-list-element'>
							<Link to='/' className='logo'>
								<img src='logo.png' alt='' />
							</Link>
						</div>
					</div>
					{!user ? (
						<Space wrap>
							<Button type='link'>
								<NavLink to='/login'>
									<LoginOutlined />
									Login
								</NavLink>
							</Button>
						</Space>
					) : (
						<div className='account-box'>
							<Link to='/account' className='account-link'>
								<Space direction='vertical'>
									<Dropdown.Button
										menu={{
											items,
											onClick: onMenuClick
										}}
									>
										{currentUser ? <img src={currentUser.image} alt='' /> : ''}
									</Dropdown.Button>
								</Space>
							</Link>
						</div>
					)}
				</nav>
			</header>
			<Outlet />
		</>
	);
};

export default HeaderComponent;
