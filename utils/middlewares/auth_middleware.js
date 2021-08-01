const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const authHeader = req.get('authorization');

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.send({
        status: 401,
        message: "Unauthorized Access."
    })

    jwt.verify(token, "provideyourprivatekey", (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    })
}