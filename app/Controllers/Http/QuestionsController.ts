import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from '../../Models/Question'
import Answer from '../../Models/Answer'

export default class QuestionsController {
    public async registerQuestion({ request, response }: HttpContextContract) {
        const dataQuestion = request.only(['question', 'options'])
        try {
            const question = await Question.create({
                question: dataQuestion.question,
                state: true,
            })

            const newOptions = dataQuestion.options.map((option: any) => ({
                answer: option.opcion,
                is_correct: option.iscorrect,
                question_id: question.$attributes.id,
                state: true
            }))
            await Answer.createMany(newOptions)
            return response.status(200).json({ state:true, message: 'Pregunta creada exitosamente' })
        } catch (error) {
            return response.status(400).json({ state: false, message: 'Error al crear la pregunta' })
        }
    }

    public async getQuestions({ response }: HttpContextContract) {
        const questions = await Question.all()
        return response.status(200).json(questions)
    }

    public async getQuestionId({ params, response }: HttpContextContract) {
        try {
            const question = await Question.findOrFail(params.id)
            return response.status(200).json({ data: question })
        } catch (error) {
            return response.status(400).json({ message: 'Pregunta no encontrada' })
        }
    }

    public async updateQuestion({ params, request, response }: HttpContextContract) {
        const dataQuestion = request.only(['question'])
        try {
            const question = await Question.findOrFail(params.id)
            question.merge(dataQuestion)
            await question.save()
            return response.status(200).json({ message: 'Pregunta actualizada correctamente', question })
        } catch (error) {
            return response.status(400).json({ message: 'Error en la actualización de la pregunta' })
        }
    }

    public async deleteQuestion({ params, response }: HttpContextContract) {
        try {
            const question = await Question.findOrFail(params.id)
            await question.delete()
            return response.status(200).json({ message: 'Pregunta eliminada con éxito' })
        } catch (error) {
            return response.status(400).json({ message: 'Error al eliminar la pregunta' })
        }
    }


}
