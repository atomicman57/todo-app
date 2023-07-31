import knex from 'knex'
import TaskRepo from './task.model'

const db = knex({
  client: 'sqlite3',
  connection: './db.sqlite',
  useNullAsDefault: true,
})

export default {
  db,
  taskRepo: new TaskRepo(db),
}
