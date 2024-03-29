import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from '../Controllers/Http/UsersController'

export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')
    if (authorizationHeader == undefined) {
      return ctx.response.status(400).send({
        mensaje: "Falta el token de autorización",
        estado: 401,
      })
    }

    try {
      const usuariosController = new UsersController()
      usuariosController.verificarToken(authorizationHeader)
      await next()
    } catch (error) {
      ctx.response.status(400).send("Falla relacionada con el token")
    }
  }
}
