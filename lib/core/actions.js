const { promisify } = require('util') // callback转promise
const path = require('path')
const download = promisify(require('download-git-repo'))
const open = require('open')
const { vue2Repo } = require('../config/repo-config.js')
const { commandSpawn } = require('../utils/terminal.js')
const { compile, writeToFile, mkdirSync } = require('../utils/utils.js')

const createProjectAction = async (project) => {
	console.log('开始创建项目...');
	
	// 1.clone项目
	await download(vue2Repo, project, { clone: true })
	
	// 2.执行npm install
	const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
	await commandSpawn(command, ['install'], { cwd: `./${project}` })
	
	// 3.运行npm run serve
	commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
	
	// 4.打开浏览器
	// open("http://localhost:8080")
}

// 添加组件
const addComponentAction = async (name, dest) => {
	// 1.有对应的ejs模板
	
	// 2.编译ejs模板result
	const result = await compile('vue-component.ejs', {
		name,
		lowerName: name.toLowerCase()
	})
	// console.log(result);
	
	// 3.将result写入到.vue文件中
	if (mkdirSync(dest)) {
		const targetPath = path.resolve(dest, `${name}.vue`)
		
		// 4.放到对应文件夹中
		writeToFile(targetPath, result)
	}
	
	
}

// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
	// 1.编译ejs模板
	const pageResult = await compile('vue-component.ejs', {
		name,
		lowerName: name.toLowerCase()
	})
	const routeResult = await compile('vue-router.ejs', {
		name,
		lowerName: name.toLowerCase()
	})
	
	dest = path.resolve(dest, name) // 增加一层目录
	
	if (mkdirSync(dest)) {
		const targetPagePath = path.resolve(dest, `${name}.vue`)
		const targetRoutePath = path.resolve(dest, `router.js`)
		
		writeToFile(targetPagePath, pageResult)
		writeToFile(targetRoutePath, routeResult)
	}
}

const addStoreAction = async (name, dest) => {
	const storeResult = await compile('vue-store.ejs', {})
	const typesResult = await compile('vue-types.ejs', {})
	
	dest = path.resolve(dest, name) // 增加一层目录
	
	if (mkdirSync(dest)) {
		const targetStorePath = path.resolve(dest, `${name}.js`)
		const targetTypesPath = path.resolve(dest, `types.js`)
		writeToFile(targetStorePath, storeResult)
		writeToFile(targetTypesPath, typesResult)
	}
}

module.exports = {
	createProjectAction,
	addComponentAction,
	addPageAndRouteAction,
	addStoreAction
}