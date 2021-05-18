import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import InApp from './inapp'
import attempt2 from './attempt2'

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
				<h2>Attempt 1</h2>
				<p>User Agent Summary: {JSON.stringify(inApp.browser)}</p>
				<p>
					Desktop? {JSON.stringify(inApp.isDesktop)} / Mobile? {JSON.stringify(inApp.isMobile)}
				</p>
				<p>in app? {JSON.stringify(inApp.isInApp)}</p>
			</section>

			<section>
				<h2>Attempt 2 (iOS only)</h2>
				<p>in app? {JSON.stringify(attempt2)}</p>
			</section>
		</div>
	)
}

export default App
