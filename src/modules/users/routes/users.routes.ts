import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { Joi, Segments, celebrate } from "celebrate";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

// isAuthenticated é um Middleware que verifica a autenticação do JWT Token.
usersRouter.get('/',
  isAuthenticated,
  usersController.index,
);

usersRouter.post(
  '/',
  // MIDDLEWARE DE VALIDAÇÃO DE DADOS.
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create,
);
// UPLOAD DO AVATAR
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  // UPLOAD DE UM UNICO ARQUIVO
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;