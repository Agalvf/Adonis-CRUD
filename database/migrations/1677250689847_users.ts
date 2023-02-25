import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 180).notNullable()
      table.string('last_name', 180).notNullable()
      table.integer('type_id').notNullable()
      table.integer('id_number').notNullable()
      table.string('address', 180).notNullable()
      table.string('neighborhood', 100).notNullable()
      table.string('municipality', 100).notNullable()
      table.string('department', 100).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.integer('profile_id').unsigned().references('profiles.id').onDelete('cascade').notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
