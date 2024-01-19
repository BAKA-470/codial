const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



module.exports.createSession = async function(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: "Invalid username or password"
            })

        } else {
            return res.status(200).json({
                messsage: "Sign in successful, here is your token! ",
                data: {
                    token: jwt.sign(user.toJSON(), 'codial', { expiresIn: '100000' })
                }
            })
        }


    } catch (error) {
        return res.status(500).json({
            message: 'internal server error'
        })
    }


}