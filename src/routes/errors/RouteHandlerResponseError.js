class RouteHandlerResponseError extends Error {
    constructor (e, next) {
        super()
        this.name = this.constructor.name
        console.error(e)
        const { message } = e
        next(new Error(message))
    }
}
module.exports = RouteHandlerResponseError
