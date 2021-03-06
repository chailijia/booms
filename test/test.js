
const _ = require('lodash');
const fs = require('fs');

const expect = require('chai').expect;
const exec = require('child_process').exec;

const createTempFile = (filePath) => {
	const content = fs.readFileSync(filePath + '.js', 'utf-8');

	// Attach process.exit() to main function
	const newContent = content.replace(/};\s*main\(\)/, '\n\tprocess.exit();\n};\n\nmain()');

	const tmpFile = filePath + '.tmp.js';
	fs.writeFileSync(tmpFile, newContent, 'utf-8');

	return tmpFile;
};

const getResult = (filePath) => {
	return new Promise(resolve => {
		const tmpFile = createTempFile(filePath);
		exec('node ' + tmpFile, (errCode, stdout, stderr) => {
			fs.unlinkSync(tmpFile);
			resolve(stdout);
		});
	});
};

const verify = (result) => {
	const comparision = [
		"Server #1",
		"Server #2",
		{ msg: 'Hi, I am owen, 100 years old.' },
		"I am obj.do()",
		"hi, 3",
	];

	result = result.replace(/\s*?$/g, '').split('\n');

	// Clear the warning message, because some none-target remote server may be is not available in testing
	result = result.filter(item => !/^\[WARN]/.test(item));

	result.forEach((item, index) => {
		if (item.substr(0, 1) === '{') {
			let o;
			eval('o = ' + item);
			result[index] = o;
		}
	});

	return _.isEqual(comparision, result);
};

const fn = async (clientFilePath) => {
	const results = await getResult(clientFilePath);
	expect(verify(results)).to.be.true;
};

module.exports = fn;
