import TypesDocument from '../../app/Models/TypesDocument'
import Role from '../../app/Models/Role'
import User from '../../app/Models/User'
import Question from '../../app/Models/Question'
import Answer from '../../app/Models/Answer'

async function createTypeDocument(data) {
    const typeDocument = await TypesDocument.create(data)
    return typeDocument
}

async function createRol(data) {
    const rol = await Role.create(data)
    return rol
}

async function createUser(data) {
    const user = await User.create(data)
    return user
}

async function createQuestion(data) {
    const question = await Question.create(data)
    return question
}


async function createAnswer(data) {
    const answer = await Answer.create(data)
    return answer
}


async function deleteAll() {
    await TypesDocument.query().delete()
    await Role.query().delete()
    await User.query().delete()
    await Question.query().delete()
    await Answer.query().delete()
}

export { createTypeDocument, createRol, createUser, createQuestion, createAnswer, deleteAll }