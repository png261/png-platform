const handle = require('./handle')
const check = require('./check')

const getComments = async(req,res,next) => {
    await handle.getComments(req,res)
    next()
}

module.exports = {
    getComments
}
