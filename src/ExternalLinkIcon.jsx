import * as React from 'react'

function SvgComponent({ title, titleId, ...props }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='prefix__feather prefix__feather-external-link'
			width='1em'
			height='1em'
			aria-labelledby={titleId}
			{...props}
		>
			{title ? <title id={titleId}>{title}</title> : null}
			<path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3' />
		</svg>
	)
}

export default SvgComponent
