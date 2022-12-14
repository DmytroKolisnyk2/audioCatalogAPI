import { FilesFields } from '@enums';
import type { AudioRepository } from '@repositories';
import type { IAudio } from '@types';
import { AudioNotFoundError } from 'error';
import type { Request } from 'express';
import type { CloudinaryService } from './cloudinary.service';

export class AudioService {
  private _audioRepository: AudioRepository;

  private _cloudinaryService: CloudinaryService;

  constructor(
    audioRepository: AudioRepository,
    cloudinaryService: CloudinaryService,
  ) {
    this._audioRepository = audioRepository;
    this._cloudinaryService = cloudinaryService;
  }

  async getAudios(req: Request): Promise<IAudio[]> {
    const { query } = req;

    return query.q
      ? await this._audioRepository.getAllByName(query.q)
      : query.tags
      ? await this._audioRepository.getAllByGenres(query.tags)
      : await this._audioRepository.getAll();
  }

  async getNew(): Promise<IAudio[]> {
    return await this._audioRepository.getNew();
  }

  async getTop(): Promise<IAudio[]> {
    return await this._audioRepository.getTop();
  }

  async getById(req: Request<Empty, IAudio>): Promise<IAudio> {
    const audio =
      req.user?.profile && req.user.profile.saveHistory
        ? await this._audioRepository.getByIdWithHistory(
            req.params.id,
            req.user._id,
          )
        : await this._audioRepository.getById(req.params.id);

    if (!audio) throw new AudioNotFoundError(req.t);

    return audio;
  }

  async create(req: Request<Empty, IAudio>): Promise<IAudio> {
    const audioUrl = await this._cloudinaryService
      .uploadAudio(req.files[FilesFields.AUDIO][0].path)
      .then((file) => file.secure_url);

    const coverUrl = await this._cloudinaryService
      .uploadImage(req.files[FilesFields.COVER][0].path)
      .then((file) => file.secure_url);

    const audio = await this._audioRepository.create({
      ...req.body,
      author: req.user._id,
      fileUrl: audioUrl,
      coverUrl: coverUrl,
    });

    return audio;
  }

  async updateLike(req: Request): Promise<IAudio> {
    const { user, params } = req;
    const updatedAudio = await this._audioRepository.toggleLike(
      params.id,
      user._id,
    );
    if (!updatedAudio) throw new AudioNotFoundError(req.t);

    return updatedAudio;
  }
}
