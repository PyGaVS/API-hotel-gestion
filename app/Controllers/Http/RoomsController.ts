import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import RoomsValidator from 'App/Controllers/Validators/RoomsValidator'

export default class RoomsController {
    public async index ({}:HttpContextContract){
        //return Room.all()
        return Room.query().preload('staff').preload('hotel')
    }

    public async store ({request}: HttpContextContract){

        const data = await request.validate(RoomsValidator)
        const room = await Room.create({
            hotelId: data.hotel_id,
            doorNumber: data.door_number,
            floor: data.floor
        })

        if (data.staff_ids) {
            room.related('staff').attach(data.staff_ids)
        }

        return "Room created"
    }

    public async update ({request, params}: HttpContextContract){

        const data = await request.validate(RoomsValidator)
        const room = await Room.findOrFail(params.id)
        await room.merge({
            hotelId: data.hotel_id,
            doorNumber: data.door_number,
            floor: data.floor
        }).save()

        if (data.staff_ids) {
            room.related('staff').sync(data.staff_ids)
        }
    }

    public async show ({params}: HttpContextContract){

        const room = await Room.findOrFail(params.id)
        return room
    }

    public async destroy ({params}: HttpContextContract){

        const room = await Room.findOrFail(params.id)
        await room.delete()

        return "Room deleted"
    }

}
