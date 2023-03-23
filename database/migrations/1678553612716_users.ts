import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name',255).notNullable()
      table.string('second_name',255)
      table.string('surname',255).notNullable()
      table.string('second_sur_name',255).notNullable()
      table.integer('type_document').unsigned().references('types_documents.id').onDelete('cascade')
      table.integer('document_number').notNullable().unique()
      table.string('email',255).notNullable().unique()
      table.string('password',255).notNullable()
      table.integer('rol_id').unsigned().references('roles.id').onDelete('cascade')
      table.string('phone',255).notNullable()
      table.boolean('state').notNullable().defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
