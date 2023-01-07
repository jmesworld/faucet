class MissingQueryParameterError extends Error {
    constructor (path, parameterName) {
        super(`${path} : missing parameter ${parameterName}`)
        this.name = this.constructor.name
    }
}
module.exports = MissingQueryParameterError
