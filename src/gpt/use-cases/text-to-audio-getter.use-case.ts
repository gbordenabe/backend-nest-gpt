import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

export const textToAudioGetterUseCase = (fileName: string) => {
  const filePath = path.resolve(
    __dirname,
    `../../../generated/audios/${fileName}.mp3`,
  );

  if (!fs.existsSync(filePath)) {
    throw new NotFoundException('File not found');
  }

  return filePath;
};
