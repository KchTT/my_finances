import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutPublic from "./layout_public";
import LayoutPrivate from "./layout_private";

import SignIn from "../containers/signin";
import SignUp from "../containers/signup";
import Dashboard from '../containers/dashboard';

function App() {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<LayoutPublic />}>
				<Route index element={<SignIn />} />
				<Route path="sign_up" element={<SignUp />} />
			</Route>

			<Route path="/my_finances" element={<LayoutPrivate />}>
				<Route index element={<Dashboard />} />
			</Route>

			<Route path="*" element={<LayoutPublic />}></Route>
		</Routes>
	</BrowserRouter>
}

export default App