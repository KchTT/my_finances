import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import LayoutPublic from "./layout_public";
import LayoutPrivate from "./layout_private";
import { fetchCheck } from '../state/reducers/user';
import SignIn from "../containers/signin";
import SignUp from "../containers/signup";
import Dashboard from '../containers/dashboard';
import History from '../containers/history';
import Profile from '../containers/profile';

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchCheck())
	}, [])
	
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<LayoutPublic />}>
				<Route index element={<SignIn />} />
				<Route path="sign_up" element={<SignUp />} />
			</Route>

			<Route path="/my_finances" element={<LayoutPrivate />}>
				<Route index element={<Dashboard />} />
				<Route path="history" element={<History />} />
				<Route path="profile" element={<Profile />} />
			</Route>

			<Route path="*" element={<LayoutPublic />}></Route>
		</Routes>
	</BrowserRouter>
}

export default App