import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TypesProfile {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>, profilesPermited: String[]) {
    const user = auth.user;
    if(!profilesPermited.includes(user.profile_id.toString())){
      return response.status(401).send('No tienes los permisos para acceder a esta ruta')
    }
    await next()
  }
}
