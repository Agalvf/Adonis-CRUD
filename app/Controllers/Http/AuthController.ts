import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "../../Models/User";

export default class AuthController {

    public async register({ request, auth, response }: HttpContextContract) {
        const dataUser = request.only([
            'name', 'last_name', 'type_id', 'id_number', 'address',
            'neighborhood', 'municipality', 'department', 'email', 'password', 'profile_id'
        ]);

        const userFound = await User.findBy('email', dataUser.email)
        if (userFound) {
            return response.status(409).json({ message: 'Error, el correo ya se encuentra en uso' })
        }

        console.log(dataUser)
        const user = await User.create(dataUser)
        const token = await auth.use("api").login(user, {
            expiresIn: "30 mins"
        })

        return {
            token,
            "msg": "usuario registrado correctamente"
        }
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        try {
            const token = await auth.use("api").attempt(email, password, {
                expiresIn: "100 mins"
            })
            return {
                token,
                "msg": "usuario logueado correctamente"
            }
        } catch (error) {
            return response.unauthorized('Credenciales invalidad')
        }
    }

    public async searchAll({ response }: HttpContextContract) {
        const users = await User.all()
        return response.status(200).json({ users: users })
    }

    public async searchUserId({ params, response }: HttpContextContract) {
        try {
            const user = await User.findOrFail(params.id)
            return response.status(200).json({ user })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).json({ message: `Usuario no encontrado con la id ${params.id}` });
            }
            return response.status(500).json({ message: 'Error al encontrar el usuario' });
        }
    }

    public async updateUser({ request, params, response }: HttpContextContract) {

        try {
            const user = await User.findOrFail(params.id);
            const dataUser = request.only([
                'name', 'lastName', 'typeId', 'IdNumber', 'address',
                'neighborhood', 'municipality', 'department', 'email', 'password', 'profile_id'
            ]);

            user.merge(dataUser);
            await user.save()

            return response.status(200).json({message: "Se actualizo con éxito el usuario"})
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).json({ message: `Usuario no encontrado con la id ${params.id}` });
            }
            return response.status(500).json({ message: 'Error al actualizar el usuario' });
        }     
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const user = await User.findOrFail(params.id)
            user.delete()
            return response.status(200).json({ mensaje: 'Se elimino correctamente el usuario' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).json({ message: `Usuario no encontrado con la id ${params.id}` });
            }
            return response.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    }
}
