const express = require('express');
const ErrorMiddleware = require('../infra/middlewares/ErrorMiddleware').ErrorMiddlewarePath;
const AnalysisMiddleware = require('../infra/middlewares/AnalysisMiddleware');
const baseValidator = require('../infra/validators/BaseRouterValidator');
const UserController = require('./UserController');
const PageController = require('./PageController');
const CommentController = require('./CommentController');

const UserRouter = express.Router();
const PageRouter = express.Router();
const CommentRouter = express.Router();

const userController = new UserController();
const pageController = new PageController();
const commentController = new CommentController();

UserRouter.post('', ErrorMiddleware(1), baseValidator.auth, baseValidator.userCreate, userController.saveUser.bind(userController));
UserRouter.get('', ErrorMiddleware(2), baseValidator.auth, baseValidator.userRead, userController.getUser.bind(userController));

PageRouter.post('', ErrorMiddleware(1), baseValidator.auth, baseValidator.pageCreation, pageController.savePage.bind(pageController));
PageRouter.get('', ErrorMiddleware(2), baseValidator.auth, baseValidator.pageRead, pageController.getPage.bind(pageController));
PageRouter.post('/visit', ErrorMiddleware(3), baseValidator.auth, baseValidator.pageCreation, pageController.visitPage.bind(pageController));

CommentRouter.post('', ErrorMiddleware(1), baseValidator.auth, baseValidator.commentCreation, AnalysisMiddleware.badWordAnalysis, AnalysisMiddleware.sentimentAnalysis, commentController.saveComment.bind(commentController));
CommentRouter.get('', ErrorMiddleware(2), baseValidator.auth, baseValidator.commentRead, commentController.getComments.bind(commentController));
CommentRouter.get('/user', ErrorMiddleware(3), baseValidator.auth, baseValidator.commentCheck, commentController.getUserCommentOnPage.bind(commentController));
CommentRouter.get('/trend', ErrorMiddleware(4), baseValidator.auth,  commentController.getDailyTrend.bind(commentController));

module.exports = {
    UserRouter,
    PageRouter,
    CommentRouter
};
