import multer from "multer";
import path from "path";
import crypto from 'crypto';

// FAZER UPLOAD DA IMAGEM ENVIADA PELO USUARIO PRO AVATAR, PARA DENTRO DA PASTA UPLOADS
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
// AQUI OS METODOS
export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    }
  })
}