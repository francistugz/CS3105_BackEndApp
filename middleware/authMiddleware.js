const permissionsCheck = (req, res, next) => {
	const { user } = req.query;
	if (user === 'admin') {
		next();
	} else {
		res.status(403).json({
			status: 403,
			message: 'Forbidden'
		});
	}
}

module.exports = {
	permissionsCheck
}