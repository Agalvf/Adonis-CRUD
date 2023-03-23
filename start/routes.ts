
import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'UsersController.login')
  }).prefix('auth')

  Route.group(() => {
    Route.group(() => {

      Route.group(() => {
        Route.post('/postQuestions', 'FormsController.registerForm')
        Route.get('/getQuestions', 'FormsController.getAllQuestions')
      }).prefix('form')
      Route.group(() => {
        Route.post('/create', 'UsersController.registerUser')
        Route.get('/getUsers', 'UsersController.getUsers')
        Route.put('/update/:id', 'UsersController.updateUser')
        Route.get('/getUser/:id', 'UsersController.updateUser')
        Route.delete('/delete/:id', 'UsersController.deleteUser')
      }).prefix('users')
      Route.group(() => {
        Route.post('/create', 'RolesController.registerRole')
        Route.get('/getRoles', 'RolesController.obtenerRoles')
        Route.get('/:id', 'RolesController.getRoleId')
        Route.put('/:id', 'RolesController.updateRole')
        Route.delete('/:id', 'RolesController.deleteRole')
      }).prefix('roles')
      Route.group(() => {
        Route.post('/create', 'TypeDocumentsController.registerTypeDocument')
        Route.get('/getType', 'TypeDocumentsController.getTypeDocuments')
        Route.get('/:id', 'TypeDocumentsController.getTypeDocumentId')
        Route.put('/:id', 'TypeDocumentsController.updateTypeDocument')
        Route.delete('/:id', 'TypeDocumentsController.deleteTypeDocument')
      }).prefix('type')
      Route.group(() => {
        Route.post('/create', 'QuestionsController.registerQuestion')
        Route.get('/getQuestions', 'QuestionsController.getQuestions')
        Route.get('/:id', 'QuestionsController.getQuestionId')
        Route.get('/getOptions/:id', 'AnswersController.optionsAnswer')
        Route.put('/updateQuestion/:id', 'QuestionsController.updateQuestion')
        Route.put('/updateAnswer/:id', 'AnswersController.updateAnswer')
        Route.delete('/deleteQuestion/:id', 'QuestionsController.deleteQuestion')
      }).prefix('questions')

      Route.group(() => {
        Route.post('/create', 'AnswersController.registerAnswer')
        Route.get('/getAnswers', 'AnswersController.getAnswers')
        Route.get('/:id', 'AnswersController.getAnswerId')
        Route.delete('/:id', 'AnswersController.deleteAnswer')
      }).prefix('answer')
    })
  }).middleware('auth')
}).prefix('api/v1')