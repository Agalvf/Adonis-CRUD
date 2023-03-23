import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Answer from './Answer'

export default class Form extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column() public student_id: number
  @column() public answer_id: number
  @column() public state:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User, {
    localKey: 'student_id',
    foreignKey: 'id'
  })
  public user : HasOne<typeof User>

  @hasOne(() => Answer, {
    localKey: 'answer_id',
    foreignKey: 'id'
  })
  public answer : HasOne<typeof Answer>
}


