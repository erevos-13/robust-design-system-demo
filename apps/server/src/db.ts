import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database!');
  } catch (error) {
    console.error('Connection failed:', error);
  }
};

export default { sequelize, connectDB };