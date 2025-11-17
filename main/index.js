import { log, error } from 'console';
import express from 'express';
import userRoutes from '../Routes/userRoutes.js';
import sequelize from '../Databases/db.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use('/users', userRoutes);

(async() => {
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync();
        console.log("Database synced successfully."); 
    }
    catch (error){
        console.error('Unable to connect to the database', error);
    }
})();

app.listen(port, () => {
    console.log("Server has started");
});

