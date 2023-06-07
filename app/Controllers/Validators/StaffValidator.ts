import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StaffValidator {

    public schema = schema.create({
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

    public messages = {'hotel_id.exists':"L'id de l'hotel ne correspond pas à un hotel existant !"} 
}