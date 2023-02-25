import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from '../../Models/Profile'

export default class ProfilesController {
    public async registerProfile({ request, response }: HttpContextContract) {
        const descriptionPerfil = request.input('description');
        try {
            await Profile.create({ description: descriptionPerfil })
            return response.status(201).json({ message: 'Perfil creado correctamente' })
        } catch (error) {
            return response.status(500).json({ message: 'Error al crear el perfil' })
        }
    }

    public async getAllProfiles({ response }: HttpContextContract) {
        const profiles = await Profile.all()
        return response.status(200).json({ perfiles: profiles })
    }

    public async searchProfileId({ params, response }: HttpContextContract) {
        const IdProfile = params.id;
        try {
            const profile = await Profile.findOrFail(IdProfile)
            return response.status(200).json({ perfil: profile })
        }
        catch (error) {
            if (error.name == 'ModelNotFoundException') { //Manejar mejor los errores 
                return response.status(404).json({ mensaje: `Perfil no encontrado con la id ${IdProfile}` })
            } else {
                return response.status(500).json({ mensaje: 'Error en la búsqueda del perfil' })
            }
        }
    }

    public async editProfile({ request, params, response }: HttpContextContract) {
        const IdProfile = params.id;
        try {
            const profile = await Profile.findOrFail(IdProfile)

            profile.description = request.input('description')

            profile.save()

            return response.status(200).json({ mensaje: 'Perfil correctamente actualizado' })
        } catch (error) {
            if (error.name == 'ModelNotFoundException') { //Manejar mejor los errores 
                return response.status(404).json({ mensaje: `Perfil no encontrado con la id ${IdProfile}` })
            } else {
                return response.status(500).json({ mensaje: 'Error al editar el perfil' })
            }
        }
    }

    public async deleteProfile({ params, response }: HttpContextContract) {
        try {
            const profile = await Profile.findOrFail(params.id)
            profile.delete()
            return response.status(200).json({ mensaje: 'Se elimino correctamente el perfil' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).json({ message: `Perfil no encontrado con la id ${params.id}` });
            }
            return response.status(500).json({ message: 'Error al eliminar el perfil' });
        }
    }
}
