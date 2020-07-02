const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(SGIMAIL)

const sendRequestMail = function(to,from,name,bookname,reason){
    sgMail.send({
        to: to,
        from: 'ceo@saikirangonugunta.tech',
        subject: 'UPDATE:SomeOne Requested You for a book',
        text: `The user with following details, ${name}(${from}). Has Requested You for the following Book:${bookname},Reason:${reason}`
    })
}
module.exports = {
    sendRequestMail
}
