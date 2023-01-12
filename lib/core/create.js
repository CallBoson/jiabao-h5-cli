const program = require('commander')
const {
	createProjectAction,
	addComponentAction,
	addPageAndRouteAction,
	addStoreAction
} = require('./actions.js')

const createCommands = () => {
	program
		.command('create <project> [others...]')
		.description('clone repository into a folder')
		.action(createProjectAction)
		
	program
		.command('addcpn <name>')
		.description('add vue component，例如：jiabao addcpn HelloWorld [-d src/components]')
		.action((name) => {
			addComponentAction(name, program.dest || 'src/components')
		})
		
	program
		.command('addpage <page>')
		.description('add vue page and router config， 例如jiabao addpage Home [-d src/pages]')
		.action((page) => {
			addPageAndRouteAction(page, program.dest || 'src/pages')
		})
		
	program
		.command('addstore <store>')
		.description('add vue store config， 例如jiabao addstore home [-d src/store/modules]')
		.action((store) => {
			addStoreAction(store, program.dest || 'src/store/modules')
		})
}

module.exports = createCommands