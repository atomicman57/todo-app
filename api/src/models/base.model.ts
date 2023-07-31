import { Knex } from 'knex'

export class BaseRepo<T extends {}> {
  protected tableName: string
  protected db: Knex

  constructor(db: Knex, tableName: string) {
    this.db = db
    this.tableName = tableName
  }

  public async find(): Promise<T[]> {
    return await this.db(this.tableName).select<T>()
  }

  public async findById(id: number): Promise<T | null> {
    const results = await this.db(this.tableName).where({ id }).limit(1)
    return results.length ? results[0] : null
  }

  public async create(item: T): Promise<T> {
    const [insertedItem] = await this.db(this.tableName)
      .insert(item)
      .returning('*')
    return insertedItem
  }

  public async update(id: number, item: Partial<T>): Promise<number> {
    return await this.db(this.tableName).where({ id }).update(item)
  }

  public async delete(id: number): Promise<number> {
    return await this.db(this.tableName).where({ id }).del()
  }
}
