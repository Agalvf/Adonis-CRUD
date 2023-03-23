import { DateTime } from 'luxon'
import Answer from './Answer'
import {
  BaseModel, column,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() question: string
  @column() state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Answer, {
    localKey: 'id',
    foreignKey: 'question_id'
  })
  public answer: HasMany<typeof Answer>

}
