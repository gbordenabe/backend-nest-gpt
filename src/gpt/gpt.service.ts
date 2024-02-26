import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases/orthography.use-case';
import {
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import OpenAI from 'openai';
import {
  audioToTextUseCase,
  imageGenerationGetterUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioGetterUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import { text } from 'stream/consumers';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_APY_KEY,
  });

  async orthographyCheck({ prompt }: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt,
    });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt,
    });
  }

  async translateText({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt,
      lang,
    });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, {
      prompt,
      voice,
    });
  }

  async textToAudioGetter(fileName: string) {
    return textToAudioGetterUseCase(fileName);
  }

  async audioToText(
    audioFile: Express.Multer.File,
    { prompt }: AudioToTextDto,
  ) {
    return await audioToTextUseCase(this.openai, {
      audioFile,
      prompt,
    });
  }

  async imageGeneration({
    prompt,
    originalImage,
    maskImage,
  }: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, {
      prompt,
      originalImage,
      maskImage,
    });
  }

  imageGenerationGetter(fileName: string) {
    return imageGenerationGetterUseCase(fileName);
  }

  async imageVariation(imageVariationDto: ImageVariationDto) {
    return imageVariationUseCase(this.openai, imageVariationDto);
  }
}
