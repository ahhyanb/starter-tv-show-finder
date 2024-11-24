function methodNotAllowed(req, res, next) {
    res.json({ status: 405, message: `Method not allowed.`});
}

module.exports = methodNotAllowed;