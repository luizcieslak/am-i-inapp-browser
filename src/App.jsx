import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import InApp from './inapp'

function App() {
	const [inApp, setInApp] = useState({})

	useEffect(() => {
		const useragent = navigator.userAgent || navigator.vendor || window.opera
		const inapp = new InApp(useragent)
		setInApp(inapp)
	}, [InApp])

	return (
		<div className='App'>
			<h1>Am I inside a in-app browser? 🤔</h1>
			<p>
				<b>User Agent: </b>
				{inApp.ua}
			</p>
			<section>
				<h2>First attempt</h2>
				<p>User Agent: {JSON.stringify(inApp.browser)}</p>
				<p>Desktop? {JSON.stringify(inApp.isDesktop)}</p>
				<p>Mobile? {JSON.stringify(inApp.isMobile)}</p>
				<p>in app? {JSON.stringify(inApp.isInApp)}</p>
			</section>
		</div>
	)
}

export default App
