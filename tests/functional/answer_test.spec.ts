import { test } from '@japa/runner'
import Question from '../../app/Models/Question'
import Answer from '../../app/Models/Answer'
import { createQuestion } from '../utils/functions'
import { obtenerTokenAutorizacion } from '../utils/TestAuht'

const baseRoute = '/api/v1/answer'
const baseQuestion = '/api/v1/questions'

const dataQuestion = {
    "question": "prueba_tests",
    "state": true
}

let question: Question | null;
let token : string;

test.group('Answer', (group) => {
    group.setup(async () => {
        token = await obtenerTokenAutorizacion()
        await createQuestion(dataQuestion) 
        question = await Question.findBy('question', dataQuestion.question)
    })

    test('crear respuesta', async ({ client, assert }) => {
        const data = {
            "answer": "prueba_tests",
            "is_correct": true,
            "question_id": question?.$attributes.id,
            "state": true
        }

        try {
            const response = await client.post(`${baseRoute}/create`).json(data)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(201)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('Crear respuesta con datos incorrectos', async ({ client, assert }) => {
        const data = {
            "answer": "prueba_tests",
            "is_correct": true,
            "question_id": 0,
            "state": true
        }

        try {
            const response = await client.post(`${baseRoute}/create`).json(data)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar respuesta ID', async ({ client, assert }) => {

        const answer = await Answer.query().where('answer', 'prueba_tests').first()
        try {
            const response = await client.get(`${baseRoute}/${answer?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar respuesta ID incorrecto', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/0`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(404)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar respuestas', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/getAnswers`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.isArray(response.body().data)
        } catch (error) {
            assert.fail(error.message)
        }
    })


    test('actualizar respuesta con datos incorrectos', async ({ client, assert }) => {
        const data = {
            "answer": "prueba_tests",
            "is_correct": true,
            "question_id": 0,
            "state": true
        }
        try {
            const response = await client.put(`${baseRoute}/0`).json(data)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(404)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('actualizar respuesta', async ({ client, assert }) => {
        const answer = await Answer.query().where('answer', 'prueba_tests').first()
        const data = {
            "opcion": "prueba_tests",
            "is_correct": true,
        }
        try {
            const response = await client.put(`${baseQuestion}/updateAnswer/${answer?.$attributes.id}`).json(data)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar respuesta por ID de pregunta', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseQuestion}/getOptions/${question?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.isArray(response.body().options)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar respuestas por ID de pregunta incorrecto', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/getAnswersByQuestion/0`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(404)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('eliminar respuesta', async ({ client, assert }) => {
        const answer = await Answer.query().where('answer', 'prueba_tests').first()
        const question = await Question.query().where('question', 'prueba_tests').first()
        try {
            const response = await client.delete(`${baseRoute}/${answer?.$attributes.id}`)  
                .header('Authorization', `Bearer ${token}`)
            await client.delete(`${baseQuestion}/${question?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('eliminar respuesta incorrecta', async ({ client, assert }) => {
        try {
            const response = await client.delete(`${baseRoute}/0`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(404)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    }
    )
})
