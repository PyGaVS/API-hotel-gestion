import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff'
import StaffValidator from 'App/Controllers/Validators/StaffValidator'

export default class StaffController {
    public async index ({}:HttpContextContract){
        return Staff.all()
    }

    public async store ({request}: HttpContextContract){

        /*const data = await request.validate(StaffValidator)
        await Staff.create(data)

        return "Staff member added"*/
        const data = await request.validate(StaffValidator)
        const staff = await Staff.create({
            hotelId: data.hotel_id,
            name: data.name,
            phoneNumber: data.phone_number
            
        })

        if (data.room_ids) {
            staff.related('room').attach(data.room_ids)
        }

        return "Staff member added"
    }

    public async show ({params}: HttpContextContract){

        const staff = await Staff.findOrFail(params.id)
        return staff
    }

    public async update ({request, params}: HttpContextContract){

        /*const data = await request.validate(RoomsValidator)
        const room = await Room.findOrFail(params.id)
        await room.merge({
            hotelId: data.hotel_id,
            doorNumber: data.door_number,
            floor: data.floor
        }).save()

        if (data.staff_ids) {
            room.related('staff').sync(data.staff_ids)
        }
    }*/
        const data = await request.validate(StaffValidator)
        
        const staff = await Staff.findOrFail(params.id)
        await staff.merge({
            hotelId: data.hotel_id,
            name: data.name,
            phoneNumber: data.phone_number
        }).save() 

        if (data.room_ids) {
            staff.related('room').sync(data.room_ids)
        }
    }

    public async destroy ({params}: HttpContextContract){

        const staff = await Staff.findOrFail(params.id)
        await staff.delete()

        return "Staff member deleted"

    }
}
