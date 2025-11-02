/**
 * PHANTOM DEPENDENCIES DEMONSTRATION
 *
 * Phantom dependencies occur when you import a package that's not listed
 * in your package.json, but happens to work because it's installed as
 * a dependency of another package.
 *
 * This is dangerous because:
 * 1. The package can disappear if the parent dependency updates
 * 2. It's not tracked in your dependencies, making builds unreliable
 * 3. It creates implicit, undocumented dependencies
 *
 * pnpm prevents this by using a strict node_modules structure where
 * only explicitly listed dependencies are accessible.
 *
 * EXAMPLE: Try importing a transitive dependency of react-router-dom
 */

// ❌ This will FAIL with pnpm (preventing phantom dependencies)
// Uncomment the line below to see the error: "Cannot find module 'history'"
import { createBrowserHistory } from 'history'
console.log(createBrowserHistory)

// react-router-dom depends on 'history', but 'history' is NOT in our package.json
// With npm/yarn, this might work accidentally. With pnpm, it will fail!

/**
 * TO FIX: Add the dependency to package.json:
 * pnpm add history
 *
 * This ensures:
 * ✅ The dependency is explicitly tracked
 * ✅ Version is locked and documented
 * ✅ Builds are reproducible
 * ✅ Team members understand all dependencies
 */

export default function PhantomDependencyDemo() {
	return (
		<div className="p-4 border-2 border-yellow-400 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
			<h2 className="text-xl font-bold mb-2">🔒 Phantom Dependencies Prevention</h2>
			<p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
				This project uses <strong>pnpm</strong>, which prevents accidentally importing
				unlisted packages by design.
			</p>
			<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs font-mono">
				<code className="text-red-600 dark:text-red-400">
					// import {'{'} createBrowserHistory {'}'} from 'history' // ❌ Fails!
				</code>
			</div>
			<p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
				Uncomment the import above to see pnpm prevent the phantom dependency.
			</p>
		</div>
	)
}
