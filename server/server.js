// import module
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db';
import todoRoutes from './routes/todoRoutes'

dotenv.config();

// initialize express
const app = express();

// middlewares
app.use(express.json());
app.use(cors())

// routes
app.get('/', (req,res)=>{
    res.send('welcome to my Todo')
});
app.use('/todo', todoRoutes)

// server function
const startServer = async()=>{
    try {
        await connectDB()
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
startServer()