import { Router } from "express";
import Todo from "../models/Todo";

const router = Router();

// create todo
router.post('/', async (req,res) => {
    try {
        const todo = await Todo.create(req.body);
        res.send(todo)
    } catch (error) {
        res.send(error);
    }
})

// read todo
router.get('/', async (req,res) => {
    try {
        const todos = await Todo.find();
        res.send(todos)
    } catch (error) {
        res.send(error);
    }
});

// update todo
router.put('/', async (req,res) => {
    try {
        const todo = await Todo.findOneAndUpdate({_id: req.body._id}, req.body, {new: true});
        res.send(todo)
    } catch (error) {
        res.send(error)
    }
})
// delete todo
router.delete('/:id', async (req,res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) return res.status(404).send('Todo not found');
        todo.remove();
        res.send('Deleted')
    } catch (error) {
        res.send("No record found");
    }
})

export default router;