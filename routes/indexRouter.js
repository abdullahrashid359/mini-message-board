const { Router } = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/new', indexController.renderForm);

indexRouter.post('/new', indexController.handleFormSubmission);

indexRouter.get('/', indexController.renderIndexPage);

module.exports = indexRouter;