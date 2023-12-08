import {
  User as PrismaUser,
  Question as PrismaQuestion,
  Attachment as PrismaAttachment,
} from '@prisma/client'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { PrismaAttachmentMapper } from './prisma-attachment-mapper'

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser
  attachments: PrismaAttachment[]
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      questionId: new UniqueEntityID(raw.id),
      authorId: new UniqueEntityID(raw.authorId),
      author: raw.author.name,
      title: raw.title,
      content: raw.content,
      slug: Slug.create(raw.slug),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityID(raw.bestAnswerId)
        : null,
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
    })
  }
}
