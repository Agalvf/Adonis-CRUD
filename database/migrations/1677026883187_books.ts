import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.integer('author').notNullable()
      table.integer('publisher').unsigned().notNullable()
      table.string('format',200).notNullable()
      table.integer('number_pages').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
