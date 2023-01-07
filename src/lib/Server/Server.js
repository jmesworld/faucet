class Server {
    constructor () {
        this.instance = null
        this.server = null
    }
}
Server.prototype.init = require('./methods/init')
Server.prototype.start = require('./methods/start')
Server.prototype.stop = require('./methods/stop')
module.exports = Server
