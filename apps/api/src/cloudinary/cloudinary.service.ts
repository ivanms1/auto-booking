import { Injectable } from '@nestjs/common';
import type { UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  static uploadImage(file: Express.Multer.File) {
    throw new Error('Method not implemented.');
  }
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(new Error(error.message)); return;
        }
        if (!result) {
          reject(new Error('No result from Cloudinary upload')); return;
        }
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}