import express from 'express';
import UserController from '~/controllers/UserController';
import { UserValidation } from '~/validations/UsersValidation';

const Router = express.Router();

Router.route('/')
    .get(UserController.getAllUsers)  
    .post(UserValidation.createUser, UserController.createUser); 

Router.route('/:id')
    .get(UserController.findUserById) 
    .put(UserValidation.updateUser, UserController.updateUser) 
    .delete(UserController.deleteUser);  

export const userRoutes = Router;
