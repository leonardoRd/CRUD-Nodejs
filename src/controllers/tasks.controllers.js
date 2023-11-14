import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user'); // Trae todos los task del user logueado
    res.json(tasks);
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user'); // populate para traer los datos del usuario tmb
    if(!task) return res.status(404).json({ message: "Task not found"});

    res.json(task);
}

export const createTask = async (req, res) => {
    const {title, descripcion, date} = req.body;

    const newTask = new Task({
        title,
        descripcion,
        date,
        user: req.user.id
    });

    const taskSaved = await newTask.save();
    res.json(taskSaved);
}

export const deleteTasks = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if(!task) return res.status(404).json({ message: "Task not found"});

    res.json(task);
}

export const uploadTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
    
        if(!task) return res.status(404).json({message: "task not found"});
    
        res.json(task);    
    } catch (error) {
        return res.status(400).json(["Not found"]);
    }
    
}