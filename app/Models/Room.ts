import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo, beforeSave, BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

//Models
import Hotel from 'App/Models/Hotel'
import Staff from 'App/Models/Staff'

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

  @manyToMany(() => Staff)
  public staff: ManyToMany<typeof Staff>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  }