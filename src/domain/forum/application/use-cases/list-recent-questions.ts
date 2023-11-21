import { Injectable } from '@nestjs/common'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, right } from '@/core/either'

interface ListRecentQuestionsUseCaseRequest {
  page: number
}

type ListRecentQuestionsUseCaseResponse = Either<
  null,
  { questions: Question[] }
>

@Injectable()
export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
