var crypto = require('crypto');
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
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

    sha512: sha512func,

    // Função para enviar email, o campo destinataries pode ser um endereço, ou um array de endereços, com notação JSON
    // Body data pode ser em HTML
    // Retorna um HTTP Response model
    enviarEmail: (destinataries, subject_data, body_data) => {
        const client = new SparkPost(credentials['sparkpost']);
        let temp;
        try {
            temp = JSON.parse(destinataries);
        } catch (e) {
            temp = destinataries;
        }
        let enviar = [];
        if (Array.isArray(temp)) {
            for (let i = 0; i < temp.length; i++)
                enviar.push({ address: temp[i] });
        } else
            enviar.push({ address: temp });

        client.transmissions.send({
            content: {
                from: process.env.SENDER,
                subject: subject_data,
                html: body_data
            },
            recipients: enviar
        })
            .then(data => {
                console.log('E-mail enviado com sucesso');
                console.log(data);
                return {statusCode: 200, payload: { success: true, data: 'E-mail enviado com sucesso' }};
            })
            .catch(err => {
                console.log('Envio de e-mail falhou');
                console.log(err);
                return  {statusCode: 500, payload: { success: false, data: 'Falha ao enviar email!' }};
            });
    }
}
module.exports = Util;