import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Book from '../../Models/Book';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BooksController {
    public async store({ request }: HttpContextContract) {
        const dataBook = request.only(['title','author','publisher','format','number_pages','user_id'])
        await Book.create(dataBook)
        return {
            "Libro": dataBook,
            "msg": "Registro ingresado correctamente",
            "estado": 200
        }
    }

    public async index() {
        const books = await Book.query()
        return books
    }

    public async show({ response, params }: HttpContextContract) {
        try {
            const book = await Book.findOrFail(params.id);
            return response.status(200).json({ book })
        } catch (error) {
            if (error.name == 'ModelNotFoundException') { //Manejar mejor los errores 
                response.status(400).json({ mensaje: 'Libro no encontrado' })
            } else {
                response.status(500).json({ mensaje: 'Error en encontrar el libro' })
            }
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        try {
            const book = await Book.findOrFail(params.id);
            const dataBook = request.only(['title','author','publisher','format','number_pages','user_id'])
            book.merge(dataBook).save()
            return response.status(200).json({message: "El libro fue correctamente actualizado"})
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).json({ message: `Libro no encontrado con la id ${params.id}` });
            }
            return response.status(500).json({ message: 'Error al editar el libro' });
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const book = await Book.findOrFail(params.id)
            book.delete()
            return response.status(200).json({ mensaje: 'Libro eliminado correctamente' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).json({ message: `Libro no encontrado con la id ${params.id}` });
            }
            return response.status(500).json({ message: 'Error al eliminar el libro' });
        }
    }
}
