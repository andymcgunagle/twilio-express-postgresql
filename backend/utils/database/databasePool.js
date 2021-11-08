import pg from 'pg';

const pool = new pg.Pool({
  user: 'andrewmcgunagle',
  database: 'twilio_express_postgresql_db',
  host: 'localhost',
  port: 5432,
});

export default pool;
