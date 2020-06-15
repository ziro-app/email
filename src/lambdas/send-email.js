const lambda = require('../templates/lambda')
const request = require('../templates/request')

const sendEmail = ({ body }) => request(body);

// export
const handler = lambda(sendEmail)
module.exports = { handler }