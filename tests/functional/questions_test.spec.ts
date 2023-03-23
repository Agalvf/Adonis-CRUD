import { test } from '@japa/runner'
import Question from '../../app/Models/Question'
import { obtenerTokenAutorizacion } from '../utils/TestAuht'

const baseRoute = '/api/v1/questions'
let token: string

test.group('Questions', (group) => {
    group.setup(async () => {
        token = await obtenerTokenAutorizacion()
    })

    test('Crear pregunta', async ({ client, assert }) => {
        const data = {
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
                }
            ]
        }
        try {
            const response = await client.post(`${baseRoute}/create`).json(data)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('Crear pregunta sin opciones', async ({ client, assert }) => {
        const data = {
            "question": "¿que dia es hoy?",
            "options": [1000, 1000]
        }
        try {
            const response = await client.post(`${baseRoute}/create`).json(data).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })


    test('listar preguntas', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/getQuestions`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.isArray(response.body())
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar pregunta ID', async ({ client, assert }) => {
        const rol = await Question.query().where('question', '¿que dia es hoy?').first()
        try {
            const response = await client.get(`${baseRoute}/${rol?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar pregunta ID no existe', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/0`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })


    test('eliminar pregunta', async ({ client, assert }) => {
        const question = await Question.query().where('question', '¿que dia es hoy?').first()
        try {
            const response = await client.delete(`${baseRoute}/deleteQuestion/${question?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('eliminar pregunta no existe', async ({ client, assert }) => {
        try {
            const response = await client.delete(`${baseRoute}/deleteQuestion/0`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })
})