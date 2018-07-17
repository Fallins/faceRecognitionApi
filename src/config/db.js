import knex from 'knex'

const db = knex({
    client: 'pg',
    connection: {
      // host : '127.0.0.1',
      // user : 'postgres',
      // password : '1234',
      // database : 'face-recognition'
      connectionString: process.env.DATABASE_URL || '127.0.0.1',
      ssl: true
    }
})

export default db