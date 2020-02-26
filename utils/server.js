function setAllowHeader(res) {
    res.header('Access-Control-Allow-Origin', '*');
    return res;
}

const constants = {
    STATUSES: {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
        CRITICAL_ERROR: 'Critical error occured',
        UNEXPECTED_ERROR: 'Unexpected error occured'
    }
};

module.exports = {setAllowHeader, constants};