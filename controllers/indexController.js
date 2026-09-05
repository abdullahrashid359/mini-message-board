const { body, validationResult, matchedData } = require('express-validator');
const CustomNotFoundError = require('../errors/CustomNotFoundError');
const db = require('../db/queries');

const validateMessage = [
    body("name").trim()
        .notEmpty().withMessage("Name cannot be empty.")
        .isLength({ min: 1, max: 50 }).withMessage("Name must be between 1 and 50 characters."),
    body("message").trim()
        .notEmpty().withMessage("Message cannot be empty.")
        .isLength({ min: 1, max: 300 }).withMessage("Message must be between 1 and 300 characters."),
];

async function renderIndexPage(req, res) {
    res.render('index', { title: 'Mini Message Board', messages: await db.getAllMessages() });
}

function renderForm(req, res) {
    res.render('form');
}

async function getMessage(req, res) {
    const { id } = req.params;

    const message = await db.getMessage(Number(id));

    if (!message)
        throw new CustomNotFoundError("Message not found");

    res.render('message', { message: message });
}

const handleFormSubmission = [
    validateMessage,
    async (req, res) => {
        const { errors } = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('form', {
                errors: errors.array(),
                name: req.body.name,
                message: req.body.message,
            });
        }

        const { message, name } = matchedData(req);
        await db.insertMessage(message, name, new Date());
        res.redirect('/');
    }]

module.exports = { renderIndexPage, renderForm, getMessage, handleFormSubmission };