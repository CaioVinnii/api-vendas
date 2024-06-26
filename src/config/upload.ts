import multer, { StorageEngine } from "multer";
import path from "path";
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    }
  }
}

// FAZER UPLOAD DA IMAGEM ENVIADA PELO USUARIO PRO AVATAR, PARA DENTRO DA PASTA UPLOADS
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');
// AQUI OS METODOS
export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
      }
    })
  },
  config: {
    aws: {
      bucket: 'api-vendas-caio'
    }
  }
} as IUploadConfig;