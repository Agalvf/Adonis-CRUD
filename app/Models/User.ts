import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import TypeDocument from './TypesDocument'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() first_name: string
  @column() second_name: string
  @column() surname: string
  @column() second_sur_name: string
  @column() type_document: number
  @column() document_number: number
  @column() email: string
  @column() password: string
  @column() rol_id: number
  @column() phone: string
  @column() state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => TypeDocument,{
    localKey: 'document_number',
    foreignKey: 'id'
  })
  public typeDocument: HasOne<typeof TypeDocument>

  @hasOne(() => Role, {
    localKey: 'rol_id',
    foreignKey: 'id'
  })
  public role: HasOne<typeof Role>
}
