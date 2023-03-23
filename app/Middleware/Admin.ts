import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from '../Controllers/Http/UsersController'
import User from '../Models/User'

export default class ValidarAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader:any = ctx.request.header('authorization')

    try{
      const usuariosController = new UsersController()
      const {id} = await usuariosController.obtenerPayload(authorizationHeader)  
      const usuario = await User.find(id) 

      if(!usuario){
        return ctx.response.status(401).json({
          msj: 'Token no válido'
        })
      }
      
      if( usuario.rol_id != 1){
        return ctx.response.status(401).json({
          msj: 'No tiene permisos para acceder a esta ruta'
        })
      }
      await next()
    }catch(error){            
      ctx.response.status(400).json({"msj": "Token no valido"})
    }    
  }
}