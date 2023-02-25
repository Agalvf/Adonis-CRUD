import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})

//Rutas para cualquier usuario
Route.post("/register","AuthController.register")
Route.post("/login","AuthController.login")
Route.get("/books","BooksController.index")
Route.get("/books/:id","BooksController.show")

Route.group(() => {
  Route.group(()=>{ //Rutas para los editores
    Route.get("/users","AuthController.searchAll")
    Route.get("/user/:id","AuthController.searchUserId")
    Route.put("/user/update/:id","AuthController.updateUser")
    Route.get("/profile","ProfilesController.getAllProfiles")
    Route.get("/profile/:id","ProfilesController.searchProfileId")
    Route.put("/profile/update/:id","ProfilesController.editProfile")
    Route.put("/books/update/:id","BooksController.update")
  }).middleware("profiles:1,2")
  

  Route.group(()=>{ //Rutas para los administradores
    Route.delete("/user/:id","AuthController.delete")
    Route.post("/profile","ProfilesController.registerProfile")
    Route.delete("/profile/:id","ProfilesController.deleteProfile")
    Route.post("/books","BooksController.store")
    Route.delete("/books/:id","BooksController.delete")
  }).middleware("profiles:1")
}).prefix('api').middleware('auth')
