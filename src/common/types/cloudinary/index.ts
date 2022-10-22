export interface CloudinaryAudio {
  secure_url: string;
  url: string;
  format: string;
  audio: {
    codec: string;
    bit_rate: number;
    frequency: number;
    channels: number;
    channel_layout: string;
  };
}

export type CloudinaryImage = Omit<CloudinaryAudio, 'audio'>;
