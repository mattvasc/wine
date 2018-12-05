var crypto = require('crypto');
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

const sha512func = (password, salt) => {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    password = hash.digest('hex');
    return [password, salt].join('.');

};

Util = {
    

    saltHashPassword: (userpassword) => {
        var salt = genRandomString(32); /** Gives us salt of length 32 */
        var passwordData = sha512func(userpassword, salt);
        console.log(passwordData);
        return passwordData;
    },

    sha512:  sha512func
}
module.exports = Util;