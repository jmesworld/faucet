async function start () {
    const { instance, logger } = this
    const PORT = 3002
    return new Promise((resolve) => {
        console.log('Starting')
        this.server = instance.listen(PORT, () => {
            console.debug(`Server listening on ${PORT}`)
            resolve(true)
        })
    })
};
module.exports = start
