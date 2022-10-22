import type { cloudinary } from '@utils';
import type { UploadApiResponse } from 'cloudinary/types';

export class CloudinaryService {
  private _cloudinaryRepository: typeof cloudinary;

  constructor(repository: typeof cloudinary) {
    this._cloudinaryRepository = repository;
  }

  uploadImage(src: string): Promise<UploadApiResponse> {
    return this._cloudinaryRepository.uploader.upload(src);
  }

  uploadAudio(src: string): Promise<UploadApiResponse> {
    return this._cloudinaryRepository.uploader.upload(src, {
      resource_type: 'video',
    });
  }
}
