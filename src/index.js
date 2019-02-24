import db from './services/db';
import './services/memcached';
import app from './server';

const start = async (db, engine, app) => {
  try {
    await db;

    app.listen(3000, '0.0.0.0', () => {
      console.log('API Listen on port 3000');
    });

  } catch (error) {
    console.log(error);
    throw new Error('Start is failed');
  }
};

start(db, null, app);
