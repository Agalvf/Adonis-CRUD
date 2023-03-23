import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '../../Models/User'

export default class UsersController {
    public async registerUser({ request, response }: HttpContextContract) {
        const dataUser = request.only(['first_name', 'second_name', 'surname', 'second_sur_name', 'type_document', 'document_number', 'email', 'password', 'rol_id', 'phone', 'state'])
        try {
            const userExists = await User.findBy('email', dataUser.email) || await User.findBy('document_number', dataUser.document_number);
            if (userExists) {
                return response.status(409).json({ message: 'El correo o documento ya se encuentra registrado' });
            }


            const salt = bcryptjs.genSaltSync(10)
            dataUser.password = bcryptjs.hashSync(dataUser.password, salt)

            await User.create(dataUser)
            return response.status(201).json({ message: 'Usuario creado correctamente' })
        } catch (error) {
            console.log(error)
            return response.status(400).json({ message: 'Fallo en la creación del usuario' })
        }
    }

    public async login({ request, response }: HttpContextContract) {
        const data = request.only(['email', 'password'])
        try {
            const user = await User.query().where('email', data.email).preload('role').firstOrFail()
            const validPassword = await bcryptjs.compare(data.password, user.password)
            if (!validPassword) {
                return response.status(401).json({
                    state: false,
                    message: 'contraseña o email invalido'
                })
            }


            const payload = {
                id: user.id,
                first_name: user.first_name,
                role: user.role.name
            }

            const token: string = this.generateToken(payload)

            return response.status(200).json(
                {
                    state: true,
                    id: user.id,
                    first_name: user.first_name,
                    role: user.role.name,
                    message: "Ingreso exitoso",
                    token
                }
            )
        } catch (error) {
            return response.status(400).json({ message: 'Contraseña o email invalido' })
        }
    }

    public generateToken(payload: any) {
        const opciones = {
            expiresIn: '5 mins',
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)
    }

    public verificarToken(authorizationHeader: string) {
        const token = authorizationHeader.split(' ')[1]
        const payload = jwt.verify(token, Env.get('JWT_SECRET_KEY'), { complete: true }).payload;
        return payload
    }

    public obtenerPayload(authorizationHeader: string) {
        const token = authorizationHeader.split(' ')[1]
        const payload = jwt.verify(token, Env.get('JWT_SECRET_KEY'), { complete: true }).payload;
        return payload
    }
    

    public async getUsers({ response }: HttpContextContract) {
        const users = await User.all()
        return response.status(200).json(
            {
                state: true,
                message: "Listado de estudiantes",
                users
            }
        )
    }

    public async getUser({ params, response }: HttpContextContract) {
        try {
            const user = await User.findOrFail(params.id)
            return response.status(200).json({ user })
        } catch (error) {
            return response.status(404).json({ message: 'Error al consultar el detalle del usuario' })
        }
    }

    public async updateUser({ params, request, response }: HttpContextContract) {
        const dataUser = request.only(['first_name', 'second_name', 'surname', 'second_sur_name', 'type_document', 'document_number', 'email', 'password', 'rol_id', 'phone', 'state'])
        try {
            const user = await User.findOrFail(params.id)
            user.merge(dataUser)
            await user.save()
            return response.status(200).json(
                {
                    state: true,
                    message: "Se actualizo correctamente",
                }
            )
        } catch (error) {
            return response.status(404).json({ message: 'Error al actualizar' })
        }
    }
}
