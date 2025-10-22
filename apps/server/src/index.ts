import app from './server.ts'

async function main() {
	app.listen(3000, () => {
		console.log(`Server listening on port http://localhost:3000`)
	})
}

main().catch(console.error)
