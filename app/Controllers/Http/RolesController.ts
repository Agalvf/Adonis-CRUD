import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from '../../Models/Role'

export default class RolesController{
    public async registerRole({request,response}:HttpContextContract){
        const dataRole = request.only(['name','state'])
        try {
            const role = await Role.create(dataRole)
            return response.status(200).json({message:'Rol creado correctamente',data:role})
        } catch (error) {
            return response.status(400).json({message:'Error en el registro del rol'})
        }
    }

    public async getRoleId({params,response}:HttpContextContract){
        try {
            const role = await Role.findOrFail(params.id)
            return response.status(200).json({data:role})
        } catch (error) {
            return response.status(400).json({message:'Error en la búsqueda del rol'})
        }
    }

    public async obtenerRoles({response}:HttpContextContract){
        const data = await Role.all()
        return response.status(200).json({data:data})
    }

    public async updateRole({params,request,response}:HttpContextContract){
        try {
            const role = await Role.findOrFail(params.id)
            const data = request.all()

            await role.merge(data).save()
            return response.status(200).json({message:'El rol fue actualizado correctamente'})
        } catch (error) {
            return response.status(400).json({message:'Error en la búsqueda del rol'})
        }
    }

    public async deleteRole({params,response}:HttpContextContract){
        try {
            const data = await Role.findOrFail(params.id)
            await data.delete()
            return response.status(200).json({message:'Se elimino correctamente el rol'})
        } catch (error) {
            return response.status(400).json({message:'Error en la búsqueda del rol'})
        }
    }
}
