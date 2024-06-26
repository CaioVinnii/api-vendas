import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

// isAuthenticated é um Middleware que verifica a autenticação do JWT Token.
profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  // MIDDLEWARE DE VALIDAÇÃO DE DADOS.
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required()
        }),
    }
  }),
  profileController.update,
);

export default profileRouter;