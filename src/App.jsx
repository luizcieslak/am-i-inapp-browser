import React, { useState, useEffect } from 'react'
import './App.css'
import InApp from './inapp'
import attempt2 from './attempt2'
import { useQuery } from 'react-query'
import ExternalLink from './ExternalLinkIcon'

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
			<p style={{ fontSize: '14px' }}>
				<b>User Agent: </b>
				{inApp.ua}
			</p>
			<a href={import.meta.env.BASE_URL} target='_blank'>
				Open this outside
			</a>
			<br />
			<br />
			<br />
			<a href={import.meta.env.BASE_URL} target='_system'>
				Open this outside 2
			</a>
			<br />
			<br />
			<br />
			<a
				href={`external:https://www.businessinsider.com/the-founder-ceo-statsbomb-career-pivoting-in-sports-industry-2021-5`}
			>
				ext BI
			</a>
			<br />
			<br />
			<br />
			<a
				href={`https://www.businessinsider.com/the-founder-ceo-statsbomb-career-pivoting-in-sports-industry-2021-5`}
				target='_system'
			>
				_system BI
			</a>
			<br />
			<br />
			<br />
			<a href={`external:${import.meta.env.BASE_URL}`} target='_system'>
				ext _system
			</a>
			<br />
			<br />
			<br />
			<button
				onClick={() => {
					window.open(import.meta.env.BASE_URL, '_blank')
				}}
			>
				Open this outside no 3 arg
			</button>
			<button
				onClick={() => {
					window.open(import.meta.env.BASE_URL, '_blank', 'location=yes')
				}}
			>
				Open this outside with location in 3 arg
			</button>
			<button
				onClick={() => {
					window.open(import.meta.env.BASE_URL, '_system')
				}}
			>
				Open this outside _system
			</button>
			<button
				onClick={() => {
					window.open(import.meta.env.BASE_URL, '_system', 'location=yes')
				}}
			>
				Open this outside _system + location in 3 arg
			</button>
			<section>
				<h3>
					Attempt 1{' '}
					<a
						href='https://github.com/f2etw/detect-inapp/blob/master/src/inapp.js'
						target='_blank'
						rel='noopener noreferrer'
					>
						<ExternalLink />
					</a>
				</h3>
				<p>User Agent Summary: {JSON.stringify(inApp.browser)}</p>
				<p>
					Desktop? {JSON.stringify(inApp.isDesktop)} / Mobile? {JSON.stringify(inApp.isMobile)}
				</p>
				<p>in app? {JSON.stringify(inApp.isInApp)}</p>
			</section>

			<section>
				<h3>
					Attempt 2 (iOS only){' '}
					<a
						href='https://github.com/f2etw/detect-inapp/blob/master/src/inapp.js'
						target='_blank'
						rel='noopener noreferrer'
					>
						<ExternalLink />
					</a>
				</h3>
				<p>in app? {JSON.stringify(attempt2)}</p>
			</section>

			<section>
				<h3>
					Attempt 3{' '}
					<a href='https://developers.whatismybrowser.com/' target='_blank' rel='noopener noreferrer'>
						<ExternalLink />
					</a>
				</h3>
				{isLoading && <p>loading...</p>}
				{data && (
					<>
						<p>in-app? {JSON.stringify(data.parse.software_sub_type === 'in-app-browser')}</p>
						<p>software? {data.parse.simple_software_string}</p>
						<p>hardware? {data.parse.hardware_type}</p>
						<p>software type? {data.parse.software_sub_type}</p>
						<details>
							<summary>click here for more details</summary>
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

			<a href='https://github.com/luizcieslak/am-i-inapp-browser' target='_blank' rel='noopener noreferrer'>
				Source code
			</a>
		</div>
	)
}

export default App
