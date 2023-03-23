import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from '../../Models/Form'
import Question from '../../Models/Question'

export default class FormsController {
    public async registerForm({ request, response }: HttpContextContract) {
        const dataForm = request.only(['student_id', 'answers', 'state'])
        const newAnswers = dataForm.answers.map((answerId: any) => ({
            student_id: dataForm.student_id,
            answer_id: answerId,
            state: dataForm.state
        }))
        try {
            await Form.createMany(newAnswers)
            return response.status(201).json({ message: 'Formulario creado correctamente' })
        } catch (error) {
            return response.status(400).json({ message: 'Error en el registro del formulario' })
        }
    }

    public async getAllQuestions({ response }: HttpContextContract) {
        const questions = await Question.query()
            .select('id', 'question')
            .preload('answer')
        const transformedQuestions = questions.map((question) => {
            const { id, question: text } = question.toJSON()
            const options = question.answer.map(({ id, answer }) => ({ id, option: answer }))
            return { id, text, options }
        })
        return response.status(200).send({ state: true, questions: transformedQuestions })
    }
}
