const messages = [
    {
        text: "Mai bhaaga bhaaga",
        user: "Imran Khan",
        added: new Date()
    },
    {
        text: "I am a little boy",
        user: "Bilawal Bhutto",
        added: new Date()
    },
    {
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

function handleFormSubmission(req, res) {
    messages.push({
        text: req.body.message,
        user: req.body.name,
        added: new Date()
    });

    res.redirect('/');
}

module.exports = { renderIndexPage, renderForm, handleFormSubmission };