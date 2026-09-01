const CustomNotFoundError = require('../errors/CustomNotFoundError');

const messages = [
    {
        id: 1,
        text: "Mai bhaaga bhaaga",
        user: "Imran Khan",
        added: new Date()
    },
    {
        id: 2,
        text: "I am a little naughty boy",
        user: "Bilawal Bhutto",
        added: new Date()
    },
    {
        id: 3,
        text: "I thought we were having a nice date",
        user: "Freaky Nikki",
        added: new Date()
    }
];

function renderIndexPage(req, res) {
    res.render('index', { title: 'Mini Message Board', messages: messages });
}

function renderForm(req, res) {
    res.render('form');
}

function getMessage(req, res) {
    const { id } = req.params;

    const message = messages.find(message => message.id === Number(id));

    if (!message)
        throw new CustomNotFoundError("Message not found");

    res.render('message', { message: message });
}

function handleFormSubmission(req, res) {
    messages.push({
        id: messages.length + 1,
        text: req.body.message,
        user: req.body.name,
        added: new Date()
    });

    res.redirect('/');
}

module.exports = { renderIndexPage, renderForm, getMessage, handleFormSubmission };