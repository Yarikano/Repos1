import { useSelector } from 'react-redux';

const Users = () => {
	const users = useSelector(state => state.users.users);
	return (
		<>
			{users.map(user => (
				<li key={user.id}>
					{user.name}
					<img src={user.image} />
				</li>
			))}
		</>
	);
};

export default Users;
