import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class HotelValidator {
  
    public schema = schema.create({
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

    public messages = {'name.unique':"Le nom de cet hotel apparait déjà dans la table !"}
  }
/*
export default function valid(request: any){
    return request.validate({
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
}*/
