import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  private async getFileContentType(filePath: string): Promise<string> {
    const ext = path.extname(filePath);
    return ext ? ext.slice(1) : 'application/octet-stream';
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    // VERIFICA O TIPO DO ARQUIVO EX: JPG, GIF, PNG
    const ContentType = await this.getFileContentType(originalPath);

    if (!ContentType) {
      throw new Error('File not found.');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    // ENVIAR PARA O BUCKET DA AWS S3
    await this.client.putObject({
      // NOME DO BUCKET
      Bucket: uploadConfig.config.aws.bucket,
      // NOME QUE VAI SER CRIADO NO BUCKET (DO ARQUIVO)
      Key: file,
      // TIPO DO BUCKET
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }).promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    }).promise();
  }
}