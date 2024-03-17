import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import ForgotPasswordController from "../controllers/ForgotPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

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

export default passwordRouter;