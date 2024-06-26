import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import AppError from "@shared/errors/AppError";
import { instanceToInstance } from "class-transformer";

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    if (!req.file) {
      throw new AppError('File name was not provided')
    }

    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(instanceToInstance(user));
  }
}