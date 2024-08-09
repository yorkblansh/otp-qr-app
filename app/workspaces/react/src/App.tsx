import _ from 'lodash'
import * as OTPAuth from 'otpauth'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Create a new TOTP object.
let totp = new OTPAuth.TOTP({
	// Provider or service the account is associated with.
	issuer: 'PASSLOOK',
	// Account identifier.
	label: 'v.vorobeva@frp-lnr.ru',
	// Algorithm used for the HMAC function.
	// algorithm: 'SHA1',
	// Length of the generated tokens.
	digits: 6,
	// Interval of time for which a token is valid, in seconds.
	period: 30,
	// Arbitrary key encoded in Base32 or OTPAuth.Secret instance.
	secret: OTPAuth.Secret.fromBase32('JBSWY3DPEHPK3PXP'), // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'

	//  otpauth://totp/ACME:AzureDiamond?issuer=ACME&secret=NB2W45DFOIZA&algorithm=SHA1&digits=6&period=30
	//	otpauth://totp/test:me?secret=3XCGNQJBC3*******************AAKUYYHJNKXY%3D%3D%3D%3D%3D%3D&algorithm=SHA256&encoder=yandex&digits=8&period=30
})

let secret = new OTPAuth.Secret({ size: 20 })

const App = () => {
	const [token, setToken] = useState('')
	const [uri, setUri] = useState('')

	console.log({
		token,
		uri,
	})

	return (
		<main className="App">
			<button
				onClick={() => {
					// setToken(totp.generate())
					setUri(totp.toString())
					// 					setUri(`otpauth://totp/PASSLOOK:v.vorobeva@frp-lnr.ru?secret=JBSWY3DPEHPK3PXP&algorithm=SHA1&digits=6&period=30
					// `)
				}}
			>
				generate
			</button>

			<div>{token}</div>

			<button
				onClick={() => {
					setToken(totp.generate())
				}}
			>
				update token
			</button>

			<QRCode value={uri} />
		</main>
	)
}

export const Router = () => {
	return (
		<RouterProvider
			router={createBrowserRouter([
				{
					path: '/',
					element: <App />,
				},
			])}
		/>
	)
}
