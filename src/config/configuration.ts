export default () => ({
  database: {
    host: process.env.DB_HOST || 'database',
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE || true,
  },
});
