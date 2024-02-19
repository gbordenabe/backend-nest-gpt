import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases/orthography.use-case';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import OpenAI from 'openai';
import {
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  translateUseCase,
} from './use-cases';

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
}
