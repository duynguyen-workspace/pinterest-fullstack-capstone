import { Sequelize } from "sequelize";

const sequelize = new Sequelize('db_pinterest', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3307'
});

export default sequelize;