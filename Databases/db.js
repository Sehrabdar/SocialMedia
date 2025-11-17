import {Sequelize} from 'sequelize';
import config from '../config.js';
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres',
    port: config.db.port,
    logging: console.log
});


export default sequelize;