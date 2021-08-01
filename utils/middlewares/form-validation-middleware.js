const { validationResult } = require('express-validator');

module.exports = async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Validation error in API " + req.protocol + "://" + req.get("host") + req.originalUrl, req.body);
        console.log(errors.array().map(item => item.msg).join(", "));

        return res.json({
            status: "error",
            message: errors.array().map(item => item.msg).join(", ")
        })
    } else {
        next();
    }
}