import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from '../../Models/Answer'

export default class AnswersController {
    public async registerAnswer({ request, response }: HttpContextContract) {
        const data = request.only(['answer', 'is_correct', 'question_id', 'state'])
        try {
            await Answer.create(data);
            return response.status(201).json({ message: 'Respuesta registrada correctamente' })
        } catch (error) {
            return response.status(400).json({ message: 'Error en el registro de la respuesta' })
        }
    }

    public async getAnswerId({ params, response }) {
        try {
            const answer = await Answer.findOrFail(params.id)
            return response.status(200).json({ data: answer })
        } catch (error) {
            return response.status(404).json({ message: 'Error en la búsqueda de la respuesta' })
        }
    }

    public async getAnswers({ response }: HttpContextContract) {
        const data = await Answer.all()
        return response.status(200).json({ data: data })
    }


    public async updateAnswer({params,request,response}:HttpContextContract){
        try {
            const answer = await Answer.findOrFail(params.id)
            const data = request.only(['opcion', 'is_correct'])
            await answer.merge(
                    {answer: data.opcion, is_correct: data.is_correct}
                ).save()
            return response.status(200).json({state: true, message: 'Opción editada con éxito'})
        } catch (error) {
            return response.status(404).json({state: false, message: 'Error al editar la opción' })
        }
    }

    public async optionsAnswer({params,response}:HttpContextContract){
        try {
            const data = await Answer.query().where('question_id',params.id)
            return response.status(200).json(
                {
                    state: true,
                    message: "Listado de opciones",
                    options: data
                }
            )
        } catch (error) {
            return response.status(404).json({ message: 'Error en la obtención de los datos' })
        }
    }


    public async deleteAnswer({params,response}:HttpContextContract){
        try {
            const data = await Answer.findOrFail(params.id)
            await data.delete()
            return response.status(200).json({message: 'Se elimino correctamente la respuesta'})
        } catch (error) {
            return response.status(404).json({ message: 'Error en eliminar la respuesta' })
        }
    }
}
