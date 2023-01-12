const program = require('commander')
const helpOptions = () => {
	program.option('-w --why', 'a why cli')
	program.option('-d --dest <dest>', 'a destination folder, 例如： -d /src/components')
	program.option('-f --framework <framework>', 'your framework')
	
	program.on('--help', function() {
		console.log('Other:');
		console.log("   other options-");
	})
}

module.exports = helpOptions