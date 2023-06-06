import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Staff from 'App/Models/Staff'

export default class StaffController {
    public async index ({}:HttpContextContract){
        return Staff.all()
    }

    public async store ({request}: HttpContextContract){
        //const data = request.only(['name','phone_number', 'hotel_id'])

        const data = await request.validate({
            schema: schema.create({
                name: schema.string({ trim: true }, [
                    rules.maxLength(255),
                    rules.unique({
                        table: 'hotels', 
                        column: 'name'
                    })
                ]),
                phone_number: schema.string({ trim: true }, [
                    rules.maxLength(20),
                    rules.minLength(10),
                ]),
                hotel_id: schema.number([
                    rules.exists({ table: 'hotels', column: 'id' })
                ]),
            }),
            messages: {
                'hotel_id.exists':"L'id de l'hotel ne correspond pas à un hotel existant !"
              }
    
        })
        

        await Staff.create(data)
    }

    public async update ({request, params}: HttpContextContract){

        const staff = await Staff.findOrFail(params.id)

        await staff.merge(
            await request.validate({
                schema: schema.create({
                    name: schema.string({ trim: true }, [
                        rules.maxLength(255),
                        rules.unique({
                            table: 'hotels', 
                            column: 'name'
                        })
                    ]),
                    phone_number: schema.string({ trim: true }, [
                        rules.maxLength(20),
                        rules.minLength(10),
                    ]),
                    hotel_id: schema.number([
                        rules.exists({ table: 'hotels', column: 'id' })
                    ]),
                })
            })).save()
    }

    public async destroy ({request, params}: HttpContextContract){

        const staff = await Staff.findOrFail(params.id)

        await staff.delete()

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
