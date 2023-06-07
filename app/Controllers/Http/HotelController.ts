import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Controllers/Validators/HotelValidator'

export default class HotelController {
    public async index ({}:HttpContextContract){
        //let hotels = await Hotel.all()
        return Hotel.all()
    }

    public async store ({request}: HttpContextContract){
       
       const data = await request.validate(HotelValidator)
       await Hotel.create(data)

       return "Hotel created"
    }


    public async update ({request, params}: HttpContextContract){

        const hotel = await Hotel.findOrFail(params.id)
        await hotel.merge(await request.validate(HotelValidator)).save()
    }


    public async show ({params}: HttpContextContract){

        const hotel = await Hotel.findOrFail(params.id)
        return hotel
    }


    public async destroy ({params}: HttpContextContract){

        const hotel = await Hotel.findOrFail(params.id)
        await hotel.delete()

        return "Hotel deleted"
    }
}