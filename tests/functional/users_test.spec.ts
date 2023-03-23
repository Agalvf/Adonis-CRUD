import { test } from '@japa/runner'
import User from '../../app/Models/User';
import { obtenerTokenAutorizacion } from '../utils/TestAuht';

const BASE_ROUTE = '/api/v1/users'
const ERROR_MESSAGE = 'Test failed with error: ';
let token: string;

test.group('Users', (group) => {
    group.setup(async () => {
        token = await obtenerTokenAutorizacion()
    })


    test('Crear estudiante', async ({ client, assert }) => {
        const userData = {
            "first_name": "daniel",
            "second_name": "jose",
            "surname": "cruz",
            "second_sur_name": "casallas",
            "type_document": 1,
            "document_number": Math.floor(Math.random() * 1000000000),
            "email": `danielc88@gmail.co+${Math.floor(Math.random() * 1000000000)}`,
            "password": "123456789",
            "rol_id":1,
            "phone": "32123122314",
            "state": true
        }

        try {
            const response = await client.post(`${BASE_ROUTE}/create`).json(userData).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(201)
            assert.exists(response)
        } catch (error) {
            assert.fail(ERROR_MESSAGE + error.message);
        }
    })

    test('Crear estudiante con email y documento ya existente', async ({ client, assert }) => {
        const userData = {
            "first_name": "daniel",
            "second_name": "jose",
            "surname": "cruz",
            "second_sur_name": "casallas",
            "type_document": 1,
            "document_number": 99999999,
            "email": "danielc88@gmail.co",
            "password": "123456789",
            "rol_id":1,
            "phone": "32123122314",
            "state": true
        }
        try {
            const response = await client.post(`${BASE_ROUTE}/create`).json(userData).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(409)
            assert.exists(response)
        } catch (error) {
            assert.fail(ERROR_MESSAGE + error.message);
        }
    })

    test('Crear estudiante con datos incorrectos', async ({ client, assert }) => {
        const userData = {
            "first_name": "",
            "second_name": "",
            "surname": "",
            "second_sur_name": "",
            "type_document": "",
            "document_number": "",
            "email": "",
            "password": "",
            "rol_id": "",
            "phone": "",
            "state": true
        }
        try {
            const response = await client.post(`${BASE_ROUTE}/create`).json(userData).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(ERROR_MESSAGE + error.message);
        }
    })

    test('Login', async ({ client, assert }) => {
        try {
            const response = await client.post('/api/v1/auth/login').json({
                "email": "danielc88@gmail.co",
                "password": "123456789",
            }).timeout(5000)


            response.assertStatus(200)
            assert.exists(response)

        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('login con contraseña incorrecta', async ({ client, assert }) => {
        try {
            const response = await client.post('/api/v1/auth/login').json({
                "email": "danielc88@gmail.co",
                "password": "",
            }).timeout(5000)

            response.assertStatus(401)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('login con datos incorrecto', async ({ client, assert }) => {
        try {
            const response = await client.post('/api/v1/auth/login').json({
                "email": "",
                "password": "",
            }).timeout(5000)

            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('Listar usuario por ID', async ({ client, assert }) => {
        try {
            const data = await User.findBy('email', 'danielc88@gmail.co')
            const response = await client.get(`${BASE_ROUTE}/getUser/${data?.$attributes.id}`).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('404 error listar usuario', async ({ client, assert }) => {
        try {
            const response = await client.get(`${BASE_ROUTE}/getUser/1000`).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(404)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })
    




    test('Listar estudiantes', async ({ client, assert }) => {
        try {
            const response = await client.get(`${BASE_ROUTE}/getUsers`).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('Consultar estudiante', async ({ client, assert }) => {
        try {
            const data = await User.findBy('email', 'danielc88@gmail.co')
            const response = await client.get(`${BASE_ROUTE}/getUser/${data?.$attributes.id}`).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('404 error consultar estudiante', async ({ client, assert }) => {
        try {
            const response = await client.get(`${BASE_ROUTE}/getUser/0`).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(404)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('Actualizar estudiante', async ({ client, assert }) => {
        try {
            const response = await client.put(`${BASE_ROUTE}/update/1`).json(
                {
                    "phone": "32123122314"
                }).timeout(5000).header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('404 error actualizar estudiante', async ({ client, assert }) => {
        try {
            const response = await client.put(`${BASE_ROUTE}/update/0`).json(
                {
                    "first_name": "daniel",
                    "second_name": "jose",
                    "surname": "cruz",
                    "second_sur_name": "casallas",
                    "type_document": 1,
                    "document_number": "123456789",
                    "email": "danielc88@gmail.co,",
                    "phone": "32123122314"
                }).timeout(5000).header('Authorization', `Bearer ${token}`)
            response.assertStatus(404)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })
})





