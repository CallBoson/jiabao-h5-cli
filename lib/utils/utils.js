const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const compile = (templateName, data) => {
	const templatePosition = `../templates/${templateName}`
	const templatePath = path.resolve(__dirname, templatePosition)
	return new Promise((resolve, reject) => {
		ejs.renderFile(templatePath, { data }, {}, (err, result) => {
			if (err) {
				console.log(err);
				return reject(err)
			}
			return resolve(result)
		})
	})
}

const writeToFile = (path, content) => {
	if (fs.existsSync(path)) {
		throw new Error('文件已存在')
		return
	}
	  
	return fs.promises.writeFile(path, content)
}

const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (mkdirSync(path.dirname(dirname))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
	compile,
	writeToFile,
	mkdirSync
}