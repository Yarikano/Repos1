import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import BG from '../vanta/vanta';
const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { createUser, user } = UserAuth();

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			await createUser(email, password);
		} catch (e) {
			setError(e.message);
			console.log(error);
		}
		if (user) {
			const newUser = doc(db, 'accounts', user.uid);
			setDoc(newUser, {});
			console.log(user);
			navigate('/account');
		}
	};

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 24
			},
			sm: {
				span: 8
			}
		},
		wrapperCol: {
			xs: {
				span: 24
			},
			sm: {
				span: 16
			}
		}
	};
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0
			},
			sm: {
				span: 16,
				offset: 8
			}
		}
	};
	const [form] = Form.useForm();
	const onFinish = values => {
		console.log('Received values of form: ', values);
	};

	return (
		<div className='background'>
			<BG style={{ zIndex: -2 }}></BG>

			<Form
				{...formItemLayout}
				form={form}
				name='register'
				onFinish={onFinish}
				onSubmit={handleSubmit}
				scrollToFirstError
			>
				<Form.Item
					name='email'
					label='E-mail'
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!'
						},
						{
							required: true,
							message: 'Please input your E-mail!'
						}
					]}
				>
					<Input
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
				</Form.Item>
				<Form.Item
					name='password'
					label='Password'
					rules={[
						{
							required: true,
							message: 'Please input your password!'
						}
					]}
					hasFeedback
				>
					<Input.Password
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Item>
				<Form.Item
					name='confirm'
					label='Confirm Password'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!'
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								);
							}
						})
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item {...tailFormItemLayout} className='register-buttons'>
					<Button type='primary' htmlType='submit' onClick={handleSubmit}>
						Register
					</Button>
					<Button>
						<Link to='/'>
							Go to Home
							<HomeOutlined />
						</Link>
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Register;
