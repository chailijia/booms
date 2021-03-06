const servers = {
    s1: {
        host: "localhost",
        port: 30201
    },
    s2: {
        host: "localhost",
        port: 30202
    }
};

// The list of remote functions with parameters.
// You should use the "await" keyword to call them.
const apis = {
    s1: {
        about: async () => {},
        callback: async (hi, cb) => {},
        obj: {
            do: async () => {}
        },
        say: {
            hi: async (name, age) => {}
        }
    },
    s2: {
        about: async () => {}
    }
};

module.exports = apis; (() => {module.exports = require('.').client.fetchServices(module.parent.filename)})();
