import { test } from '@japa/runner'
import Role from '../../app/Models/Role'
import { obtenerTokenAutorizacion } from '../utils/TestAuht'

const baseRoute = '/api/v1/roles'
let token: string;

test.group('Roles', (group) => {

    group.setup(async () => {
        token = await obtenerTokenAutorizacion()
    })
    
    test('crear rol', async ({ client, assert }) => {
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

    test('400 error con crear rol', async ({ client, assert }) => {
        const data = {
            "name": "prueba_tests",
            "state": "test"
        }
        const response = await client.post(`${baseRoute}/create`).json(data).timeout(5000)
            .header('Authorization', `Bearer ${token}`)
        response.assertStatus(400)
        assert.exists(response)
    }) 


    test('listar roles', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/getRoles`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.isArray(response.body().data)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('listar rol ID', async ({ client, assert }) => {
        const rol = await Role.query().where('name', 'prueba_tests').first()
        try {
            const response = await client.get(`${baseRoute}/${rol?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('400 error listar ID', async ({ client, assert }) => {
        try {
            const response = await client.get(`${baseRoute}/1000`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })


    test('actualizar rol', async ({ client, assert }) => {
        const rol = await Role.query().where('name', 'prueba_tests').first()
        const data = {
            "state": false
        }
        try {
            const response = await client.put(`${baseRoute}/${rol?.$attributes.id}`).json(data).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('400 error actualizar rol', async ({ client, assert }) => {
        const rol = await Role.query().where('name', 'prueba_tests').first()
        const data = {
            "state": "test"
        }
        try {
            const response = await client.put(`${baseRoute}/${rol?.$attributes.id}`).json(data).timeout(5000)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('eliminar rol', async ({ client, assert }) => {
        const rol = await Role.query().where('name', 'prueba_tests').first()
        try {
            const response = await client.delete(`${baseRoute}/${rol?.$attributes.id}`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(200)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    })

    test('400 error eliminar rol', async ({ client, assert }) => {
        try {
            const response = await client.delete(`${baseRoute}/0`)
                .header('Authorization', `Bearer ${token}`)
            response.assertStatus(400)
            assert.exists(response)
        } catch (error) {
            assert.fail(error.message)
        }
    }
    )
})
