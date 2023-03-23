import { test } from '@japa/runner'
import Answer from '../../app/Models/Answer'
import Database from '@ioc:Adonis/Lucid/Database'
import { obtenerTokenAutorizacion } from '../utils/TestAuht'

const baseRoute = '/api/v1/form'

const dataQuestion = {
    "question": "¿que dia es hoy?",
    "options": [
        {
            "opcion": "esta es correcta",
            "iscorrect": true
        }, {
            "opcion": "incorrecta",
            "iscorrect": false
        }, {
            "opcion": "incorrecta",
            "iscorrect": false
        }, {
            "opcion": "incorrecta",
            "iscorrect": false
        }]
}

let token: string;

test.group('Form', (group) => {
    group.setup(async () => {
        token = await obtenerTokenAutorizacion()
    })


    test('crear formulario respuesta', async ({ client, assert }) => {
        await client.post('/api/v1/questions/create').json(dataQuestion)
            .header('Authorization', `Bearer ${token}`)
        const answers = await Database.from('answers').select('id')
        const idsAnswers = answers.map((answer: Answer) => answer.id)
        const data = {
            "student_id": 1,
            "answers": idsAnswers,
            "state": true
        }

        try {
            const response = await client.post(`${baseRoute}/postQuestions`).json(data)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(201)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('crear formulario respuesta con datos incorrectos', async ({ client, assert }) => {
        const data = {
            "student_id": 0,
            "answers": [0,1],
            "state": true
        }

        try {
            const response = await client.post(`${baseRoute}/postQuestions`).json(data).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('Listar pregunta con respuestas', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/getQuestions`)
                .header('Authorization', `Bearer ${token}`) 
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })
})