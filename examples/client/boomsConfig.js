
// This file can be omitted if the following options are all the default value.
// This file can be a hidden file ".boomsConfig.js"

const me = {

	// It can be omitted if it is 'localhost'
	redis: {
		host: 'localhost',
	},

	// The names of the remote servers which will be fetched.
	// If it is omitted or 'all', Booms will fetches all.
	// Or "s1" if you just need this one.
	servers: ['s1', 's2'],

	functionList: {

		// If it is true, the function list in file "booms/services.js" will be compact like below right.
		// You should to always use "await" keyword to call these functions.
		// 		s1: {										s1: {
		//			hi: async function(name, age) {}	=> 		hi(name, age) {}
		// 		}											}
		isCompact: false,

		// The useArrowFunction is true only takes effect when isCompact is false
		useArrowFunction: true,
	},
};

module.exports = me;
