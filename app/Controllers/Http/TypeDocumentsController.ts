import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypesDocument from '../../Models/TypesDocument'

export default class TypeDocumentsController {
    public async registerTypeDocument({ request, response }: HttpContextContract) {
        const data = request.only(['name', 'state'])
        try {
            await TypesDocument.create(data)
            return response.status(200).json({ message: 'Tipo de documento creado correctamente' })
        } catch (error) {
            return response.status(400).json({ message: 'Error en el registro del tipo de documento' })
        }
    }

    public async getTypeDocumentId({ params, response }: HttpContextContract) {
        try {
            const data = await TypesDocument.findOrFail(params.id)
            return response.status(200).json({ data: data })
        } catch (error) {
            return response.status(400).json({ message: 'Error en la búsqueda del tipo de documento' })
        }
    }

    public async getTypeDocuments({ response }: HttpContextContract) {
        const data = await TypesDocument.all()
        return response.status(200).json({ data: data })
    }

    public async updateTypeDocument({ params, request, response }: HttpContextContract) {
        try {
            const data = await TypesDocument.findOrFail(params.id)
            const dataForm = request.all()

            await data.merge(dataForm).save()
            return response.status(200).json({ message: 'El tipo de documento fue actualizado correctamente' })
        } catch (error) {
            return response.status(400).json({ message: 'Error en la búsqueda del tipo de documento' })
        }
    }

    public async deleteTypeDocument({ params, response }: HttpContextContract) {
        try {
            const data = await TypesDocument.findOrFail(params.id)
            await data.delete()
            return response.status(200).json({ message: 'Se elimino correctamente el tipo de documento' })
        } catch (error) {
            return response.status(400).json({ message: 'Error en la búsqueda del tipo de documento' })
        }
    }

}
