import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hotel from 'App/Models/Hotel'

export default class HotelController {
    public async index ({}:HttpContextContract){
        //let hotels = await Hotel.all()
        return Hotel.all()
    }

    public async store ({request}: HttpContextContract){
        //const data = request.only(['name', 'city'])

        const data = await request.validate({
            schema: schema.create({
                name: schema.string({ trim: true }, [
                    rules.maxLength(255),
                    rules.unique({
                        table: 'hotels', 
                        column: 'name'
                    })
                ]),
                city: schema.string({ trim: true }, [
                    rules.maxLength(255)
                ]),
            }),
            messages:{
                'name.unique':"Le nom de cet hotel apparait déjà dans la table !"
            }
        })


        await Hotel.create(data)
    }

    public async update ({request, params}: HttpContextContract){

        const hotel = await Hotel.findOrFail(params.id)

        await hotel.merge(
            await request.validate({
                schema: schema.create({
                    name: schema.string({ trim: true }, [
                        rules.maxLength(255),
                        rules.unique({
                            table: 'hotels', 
                            column: 'name'
                        })
                    ]),
                    city: schema.string({ trim: true }, [
                        rules.maxLength(255)
                    ]),
                })
            })).save()
    }

    public async destroy ({request, params}: HttpContextContract){

        const hotel = await Hotel.findOrFail(params.id)

        await hotel.delete()
    }
}