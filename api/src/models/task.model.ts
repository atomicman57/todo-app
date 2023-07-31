import { BaseRepo } from './base.model'
import { Knex } from 'knex'
import { Task } from '../types/task.type'

export default class TaskRepo extends BaseRepo<Task> {
  constructor(db: Knex) {
    super(db, 'tasks')
  }

  public async find(): Promise<Task[]> {
    return await this.db(this.tableName).select().orderBy('sort', 'asc')
  }

  async reorderTasks(tasks: Task[]): Promise<void> {
    return await this.db.transaction(async (transaction) => {
      for (const task of tasks) {
        await transaction(this.tableName)
          .where({ id: task.id })
          .update({ sort: task.sort })
      }
    })
  }
}
