import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import RoomsValidator from 'App/Controllers/Validators/RoomsValidator'

export default class RoomsController {
    public async index ({}:HttpContextContract){
        return Room.all()
    }

    public async store ({request}: HttpContextContract){

        const data = await request.validate(RoomsValidator)
        await Room.create(data)

        return "Room created"
    }

    public async update ({request, params}: HttpContextContract){

        const room = await Room.findOrFail(params.id)
        await room.merge(
        await request.validate(RoomsValidator)).save()
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
