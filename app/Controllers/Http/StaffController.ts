import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff'
import StaffValidator from 'App/Controllers/Validators/StaffValidator'

export default class StaffController {
    public async index ({}:HttpContextContract){
        return Staff.all()
    }

    public async store ({request}: HttpContextContract){

        const data = await request.validate(StaffValidator)
        await Staff.create(data)

        return "Staff member added"
    }

    public async show ({params}: HttpContextContract){

        const staff = await Staff.findOrFail(params.id)
        return staff
    }

    public async update ({request, params}: HttpContextContract){

        const staff = await Staff.findOrFail(params.id)
        await staff.merge(await request.validate(StaffValidator)).save()
    }

    public async destroy ({params}: HttpContextContract){

        const staff = await Staff.findOrFail(params.id)
        await staff.delete()

        return "Staff member deleted"

    }
}
