import { DateTime } from 'luxon'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public floor: number

  @column()
  public doorNumber: number

  @column()
  public hotelId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  }