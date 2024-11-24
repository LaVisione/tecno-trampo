import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('Tecnospeed', 'postgres', '1234', {
host: 'localhost',
dialect: 'postgres',
});
