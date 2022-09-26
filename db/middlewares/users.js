const users = {
    missingUsername: (req, res, next) => {
        const { username } = req.body;
        return !username ? res.status(400).send('Missing username') : next();
    },
    missingPassword: (req, res, next) => {
        const { password } = req.body;
        return !password ? res.status(400).send('Missing password') : next();
    },
    isAdmin: (req, res, next) => {
        return !req.body.isAdmin ? res.status(403).send('Forbidden') : next();
    },
};

export default users;
