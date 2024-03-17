import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  // MIDDLEWARE DE VALIDAÇÃO DE DADOS.
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    }
  }),
  forgotPasswordController.create
);

passwordRouter.post(
  '/reset',
  // MIDDLEWARE DE VALIDAÇÃO DE DADOS.
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      // VERIFICAR SE A CONFIRMAÇÃO É IGUAL A SENHA PASSADA
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
  }),
  resetPasswordController.create
);

export default passwordRouter;