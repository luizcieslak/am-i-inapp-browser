import React, { useState, useEffect } from 'react'
import './App.css'
import InApp from './inapp'
import attempt2 from './attempt2'
import { useQuery } from 'react-query'

function App() {
	const [inApp, setInApp] = useState({})

	useEffect(() => {
		const useragent = navigator.userAgent || navigator.vendor || window.opera
		const inapp = new InApp(useragent)
		setInApp(inapp)
	}, [InApp])

	const { isLoading, error, data } = useQuery('whatismybrowser', () =>
		fetch('https://api.whatismybrowser.com/api/v2/user_agent_parse', {
			method: 'post',
			body: JSON.stringify({
				user_agent: navigator.userAgent || navigator.vendor || window.opera,
			}),
			headers: {
				'x-api-key': import.meta.env.VITE_WIMB_KEY,
				'Content-Type': 'application/json',
			},
		}).then(res => res.json())
	)

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

			<section>
				<h2>Attempt 3 </h2>
				{isLoading && <p>loading...</p>}
				{data && (
					<>
						<p>in-app? {JSON.stringify(data.parse.software_sub_type === 'in-app-browser')}</p>
						<p>software? {data.parse.simple_software_string}</p>
						<p>hardware? {data.parse.hardware_type}</p>
						<p>software type? {data.parse.software_sub_type}</p>
						<details>
							<summary>full response JSON</summary>
							<textarea
								cols='30'
								rows='10'
								readOnly
								value={JSON.stringify(data.parse, undefined, 4)}
							></textarea>
						</details>
					</>
				)}
				{error && <p>{error}</p>}
			</section>
		</div>
	)
}

export default App
