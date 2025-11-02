import app from './server.js'

function main() {
	app.listen(3000, () => {
		console.log(`Server listening on port http://localhost:3000`)
	})
}

main()
