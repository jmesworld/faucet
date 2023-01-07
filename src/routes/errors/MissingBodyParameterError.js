class MissingBodyParameterError extends Error {
    constructor (path, parameterName) {
        super(`${path} : missing body paramerer ${parameterName}`)
        this.name = this.constructor.name
    }
}
module.exports = MissingBodyParameterError
