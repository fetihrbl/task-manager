import Task from "../models/Task.js";
import asyncWrapper from "../middlewares/async.js";

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    success: true,
    tasks,
  });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    const error = new Error('Not Found');
    error.status = 404;
    return res.status(404).json({
      message: `No task with id: ${req.params.id}`,
    });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // güncellenmiş veriyi döner
    runValidators: true, // şema kurallarını uygular
  });

  if (!task) {
    return res.status(404).json({
      message: `No task with id: ${req.params.id}`,
    });
  }

  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({
      message: `No task with id: ${req.params.id}`,
    });
  }
  res.status(200).json({ task });
});

export { getAllTasks, createTask, getTask, updateTask, deleteTask };
