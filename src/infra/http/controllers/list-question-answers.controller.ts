import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers'
import { AnswerPresenter } from '../presenters/answer-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/answers')
export class ListQuestionAnswersController {
  constructor(private listQuestionAnswers: ListQuestionAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.listQuestionAnswers.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answers = result.value.answers

    return {
      answers: answers.map(AnswerPresenter.toHTTP),
    }
  }
}
