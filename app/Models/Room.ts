import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

//Models
import Hotel from 'App/Models/Room'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public floor: number

  @column()
  public doorNumber: number

  @column()
  public hotelId: number

  @belongsTo(() => Hotel)
  public hotel: BelongsTo<typeof Hotel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  }