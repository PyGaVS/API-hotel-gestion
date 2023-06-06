import { DateTime } from 'luxon'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Staff extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phoneNumber: string

  @column()
  public hotelId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  }