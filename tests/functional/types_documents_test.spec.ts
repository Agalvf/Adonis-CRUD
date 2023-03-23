import { test } from '@japa/runner'
import TypesDocument from '../../app/Models/TypesDocument'
import { obtenerTokenAutorizacion } from '../utils/TestAuht'

const baseRoute = '/api/v1/type'
let token: string;

test.group('TypesDocument', (group) => {

    group.setup(async () => {
        token = await obtenerTokenAutorizacion()
    })


    test('crear documento', async ({ client, assert }) => {
        const data = {
            "name": "prueba_tests",
            "state": true
        }

        try {
            const response = await client.post(`${baseRoute}/create`).json(data).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('400 error crear documento', async ({ client, assert }) => {
        const data = {
            "name": "prueba_tests",
            "state": "test"
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


    test('listar documentos', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/getType`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.isArray(response.body())
        } catch (error) {

        }
    })

    test('listar documento ID', async ({ client, assert }) => {
        const document = await TypesDocument.query().where('name', 'prueba_tests').first()
        try {
            const response = await client.get(`${baseRoute}/${document?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('400 error listar documento ID', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/1000`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })


    test('actualizar documento', async ({ client, assert }) => {
        const document = await TypesDocument.query().where('name', 'prueba_tests').first()
        const data = {
            "state": false
        }
        try {
            const response = await client.put(`${baseRoute}/${document?.$attributes.id}`).json(data).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('400 error actualizar documento', async ({ client, assert }) => {
        const document = await TypesDocument.query().where('name', 'prueba_tests').first()
        const data = {
            "state": "test"
        }
        try {
            const response = await client.put(`${baseRoute}/${document?.$attributes.id}`).json(data).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })


    test('eliminar documento', async ({ client, assert }) => {
        const document = await TypesDocument.query().where('name', 'prueba_tests').first()
        try {
            const response = await client.delete(`${baseRoute}/${document?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('400 error eliminar documento', async ({ client, assert }) => {
        try {
            const response = await client.delete(`${baseRoute}/1000`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    }
    )

})
