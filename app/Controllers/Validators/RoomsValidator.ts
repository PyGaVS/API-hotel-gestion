import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RoomsValidator {

    public schema = schema.create({
        floor: schema.number([
            rules.range(-1, 20),
        ]),
        door_number: schema.number([
            rules.range(1, 99)
        ]),
        hotel_id: schema.number([
            rules.exists({ table: 'hotels', column: 'id' })
        ]),
        staff_ids: schema.array.optional().members(
            schema.number([
                rules.exists({ table: 'staff', column: 'id' })
        ])
        )
    })

    public messages = {'hotel_id.exists':"L'id de l'hotel ne correspond pas à un hotel existant !"} 
}