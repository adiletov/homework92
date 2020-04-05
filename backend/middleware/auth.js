const User = require('../modules/User');


const auth = async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        return res.status(401).send({error: 'Ой ой что пошло не так!'})
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Token' || !token) {
        return res.status(401).send({error: 'Ой ой что пошо не так!'})
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Unauthorized'})
    }
    req.user = user;
    next();
};

module.exports = auth;