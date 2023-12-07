import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

export abstract class QuestionCommentsRepository {
  abstract create(questionComment: QuestionComment): Promise<void>
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    params: PaginationParams,
    questionId: string,
  ): Promise<QuestionComment[]>

  abstract findManyByQuestionIdWithAuthor(
    params: PaginationParams,
    questionId: string,
  ): Promise<CommentWithAuthor[]>

  abstract delete(questionComment: QuestionComment): Promise<void>
}
