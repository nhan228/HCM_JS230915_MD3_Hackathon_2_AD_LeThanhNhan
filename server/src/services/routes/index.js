import express from 'express';
import { todoController } from '../../controller/todo.controller';
import { userController } from '../../controller/user.controller';
import { userMiddleware } from '../../middlewares';

const Router = express.Router();

Router.post('/login', userController.login)

Router.post('/decode-token/:token', userMiddleware.tokenValidate, userController.decodeToken)

Router.post('/todos', userMiddleware.tokenValidate, todoController.create)

Router.get('/todos', userMiddleware.tokenValidate, todoController.findAll)

Router.patch('/todos/:id', userMiddleware.tokenValidate, todoController.update)

Router.delete('/todos/:id', userMiddleware.tokenValidate, todoController.delete)

export default Router;