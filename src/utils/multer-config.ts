import type { Request } from 'express';
import type { FileFilterCallback } from 'multer';
import { ImageExtension, AudioExtension, FilesFields } from '@enums';
import multer from 'multer';
import { enumIncludes } from '@helpers';
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

export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (
    (file.fieldname === FilesFields.AUDIO &&
      enumIncludes(AudioExtension, file.mimetype)) ||
    (file.fieldname === FilesFields.COVER &&
      enumIncludes(ImageExtension, file.mimetype)) ||
    (file.fieldname === FilesFields.PICTURE &&
      enumIncludes(ImageExtension, file.mimetype))
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
