export default () => ({
  database: {
    host: process.env.DB_HOST || 'database',
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || '23ökjIJÖkj2ijök2kökjö',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  }
});
