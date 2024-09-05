// db.js
const { Pool } = require("pg");
console.log(process.env.PORT);

const pool = new Pool({
  connectionString: `postgresql://postgres.vxlejaiatocwtyudkxoy:${process.env.DB_PASSWORD}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
});

const pgQuery = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
    throw err;
  } finally {
    client.release();
  }
};

const testConnection = async () => {
  try {
    await pool.query("SELECT NOW()"); // Simple query to test the connection
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to the database", err.stack);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Export the pgQuery function and the testConnection function
module.exports = {
  pgQuery,
  testConnection,
};
