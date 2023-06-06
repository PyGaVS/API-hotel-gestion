import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Room from 'App/Models/Room'

export default class RoomsController {
    public async index ({}:HttpContextContract){
        return Room.all()
    }

    public async store ({request}: HttpContextContract){
        //const data = request.only(['floor', 'door_number', 'hotel_id'])

        const data = await request.validate({
            schema: schema.create({
                floor: schema.number([
                    rules.range(-1, 20),
                ]),
                door_number: schema.number([
                    rules.range(1, 99)
                ]),
                hotel_id: schema.number([
                    rules.exists({ table: 'hotels', column: 'id' })
                ]),
            })
        })


        await Room.create(data)
    }

    public async update ({request, params}: HttpContextContract){

        const room = await Room.findOrFail(params.id)

        await room.merge(
            await request.validate({
                schema: schema.create({
                    floor: schema.number([
                        rules.range(-1, 20),
                    ]),
                    door_number: schema.number([
                        rules.range(1, 99)
                    ]),
                    hotel_id: schema.number([
                        rules.exists({ table: 'hotels', column: 'id' })
                    ]),
                })
            })).save()
    }

    public async destroy ({request, params}: HttpContextContract){

        const room = await Room.findOrFail(params.id)

        await room.delete()

        /*const data = await request.validate({
            schema: schema.create({
                firstname: schema.string({ trim: true }, [
                    rules.maxLength(255)
                ]),
                lastname: schema.string({ trim: true }, [
                    rules.maxLength(255)
                ]),
            })
        })*/
    }

}
