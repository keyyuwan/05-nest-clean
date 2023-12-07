import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface ListQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

type ListQuestionCommentsUseCaseResponse = Either<
  null,
  { comments: CommentWithAuthor[] }
>

@Injectable()
export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        { page },
        questionId,
      )

    return right({
      comments,
    })
  }
}
