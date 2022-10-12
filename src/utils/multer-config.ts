import type { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
import path from 'path';

export const imagesPath = path.join(process.cwd(), 'public/images');
export const audioPath = path.join(process.cwd(), 'public/audio');
export const uploadsPath = path.join(process.cwd(), 'public/uploads');
export const staticFolderPath = path.join(process.cwd(), 'public');

export const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback,
  ): void => {
    callback(null, uploadsPath);
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback,
  ): void => {
    const newFileName = `${new Date().getTime()}_${file.originalname}`;
    callback(null, newFileName);
  },
});

export const fileImageFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
export const fileAudioFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (
    file.mimetype === 'audio/mp4' ||
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'application/ogg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({
  storage,
});
