import { FileSizeConfig } from '@constants';
import { FilesFields, StatusCode } from '@enums';
import { upload } from '@utils';
import { CoverSizeError, WrongImageFormatError } from 'error';
import type { NextFunction, Request, Response } from 'express';

export const uploadAvatarMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  upload.single(FilesFields.AVATAR)(req, res, () => {
    try {
      const coverFile: Express.Multer.File = req.file;

      if (!coverFile) throw new WrongImageFormatError(req.t);

      if (coverFile.size > FileSizeConfig.MAX_COVER_SIZE)
        throw new CoverSizeError(req.t);

      next();
    } catch (error) {
      res.status(StatusCode.BAD_REQUEST).json({ 'message': error.message });
    }
  });
};
