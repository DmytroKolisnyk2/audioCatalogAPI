import type { Request } from 'express';
import type { FileFilterCallback } from 'multer';
import { ImageExtension, AudioExtension } from '@enums';
import multer from 'multer';
import { WrongAudioFormatError, WrongImageFormatError } from 'error';
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const imagesPath = path.join(process.cwd(), 'public/images');
export const audioPath = path.join(process.cwd(), 'public/audio');
export const uploadsPath = path.join(process.cwd(), 'public/uploads');
export const staticFolderPath = path.join(process.cwd(), 'public');

export const storage = multer.diskStorage({
  destination: (
    _request: Request,
    _file: Express.Multer.File,
    callback: DestinationCallback,
  ): void => {
    callback(null, uploadsPath);
  },

  filename: (
    _req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback,
  ): void => {
    const newFileName = `${new Date().getTime()}_${file.originalname}`;
    callback(null, newFileName);
  },
});

export const fileImageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (file.mimetype in ImageExtension) {
    callback(null, true);
  } else {
    callback(null, false);
    callback(new WrongImageFormatError(req.t));
  }
};
export const fileAudioFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (file.mimetype in AudioExtension) {
    callback(null, true);
  } else {
    callback(null, false);
    callback(new WrongAudioFormatError(req.t));
  }
};

// export const uploadImage = multer({
//   storage,
//   fileFilter: fileImageFilter,
//   limits: { fileSize: 999999999999999 },
// });

// export const uploadAudio = multer({
//   storage,
//   fileFilter: fileAudioFilter,
//   limits: { fileSize: 999999999999999 },
// });

export const upload = multer({
  storage,
});
