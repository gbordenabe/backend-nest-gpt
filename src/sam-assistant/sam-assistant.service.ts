import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessagesListUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_APY_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async createMessage(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;
    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    const run = await createRunUseCase(this.openai, { threadId });

    await checkCompleteStatusUseCase(this.openai, { threadId, runId: run.id });

    const messages = await getMessagesListUseCase(this.openai, { threadId });

    return messages.reverse();
  }
}
