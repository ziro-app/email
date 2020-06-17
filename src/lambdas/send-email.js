const lambda = require('../templates/lambda')
const request = require('../templates/request')
const multipleRequest = require('../templates/multipleRequest')

const sendEmail = ({ body }) => {
    const { customEmail } = body;
    if (customEmail) return multipleRequest(body);
    else return request(body);
};

// export
const handler = lambda(sendEmail)
module.exports = { handler }