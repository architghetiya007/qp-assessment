module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'password',
    database: 'grocery_db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
  