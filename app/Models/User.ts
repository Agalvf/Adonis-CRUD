import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public type_id: number

  @column()
  public id_number: number

  @column()
  public address: string

  @column()
  public neighborhood: string

  @column()
  public municipality: string

  @column()
  public department: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public profile_id: number

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

}
