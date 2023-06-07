import { DateTime } from 'luxon'
import { column, hasMany, HasMany, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

//Models
import Room from 'App/Models/Room'
import Staff from 'App/Models/Room'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public city: string

  @hasMany(() => Staff)
  public staff: HasMany<typeof Staff>

  @hasMany(() => Room)
  public rooms: HasMany<typeof Room>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  }