import { FileSizeConfig } from '@constants';
import { FilesFields, StatusCode } from '@enums';
import { upload } from '@utils';
import {
  AudioSizeError,
  CoverSizeError,
  WrongAudioFormatError,
  WrongImageFormatError,
} from 'error';
import type { NextFunction, Request, Response } from 'express';

export const uploadAudioFilesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  upload.fields([
    { name: FilesFields.COVER, maxCount: 1 },
    { name: FilesFields.AUDIO, maxCount: 1 },
  ])(req, res, () => {
    try {
      const coverFile: Express.Multer.File = req.files[FilesFields.COVER]?.[0];
      const audioFile: Express.Multer.File = req.files[FilesFields.AUDIO]?.[0];

      if (!audioFile) throw new WrongAudioFormatError(req.t);
      if (!coverFile) throw new WrongImageFormatError(req.t);

      if (audioFile.size > FileSizeConfig.MAX_AUDIO_SIZE)
        throw new AudioSizeError(req.t);
      if (coverFile.size > FileSizeConfig.MAX_COVER_SIZE)
        throw new CoverSizeError(req.t);

      next();
    } catch (error) {
      res.status(StatusCode.BAD_REQUEST).json({ 'message': error.message });
    }
  });
};
