const express = require('express');
const todos = require('../data/lists.json')
const ToDoModel  = require('../models/to-do-list-model');

const router = express.Router();

// Getting all lists using GET
const { getalltodos, getSingleTodo, addTodo, updateTodo, updateStatus, deleteTodo } = require('../controllers/to-do-list-controllers');
router.get('/', getalltodos);
// router.get('/', async (req, res) => {
//     const list = await ToDoModel.find();
//     if(list.length == 0){
//        return res.status(400).json({
//             message: "No To-Do items found"
//         });
//     }
//     else{
//         return res.status(200).json({
//             message: "To-Do items retrieved successfully",
//             data: list
//         });
//     }
// })

// Adding new list using POST 
router.get("/:title", getSingleTodo);

// router.get('/:title', async (req, res) => {
//     const {title} = req.params;
//     const list = await ToDoModel.find({title});  // returns an array

//     if (!list || list.length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: `No To-Do items found for ${title}`
//         });
//     }

//     return res.status(200).json({
//         success: true,
//         message: "To-Do items retrieved successfully",   
//         data: list
//     });
// });

// POST - Add new To-Do (MongoDB)
router.post("/", addTodo)

// router.post('/', async (req, res) => {
//     let {data} = req.body;
//     const newTitle = await ToDoModel.create(data);
//     res.status(201).json({
//         message: "New To-Do item added successfully",
//         data: newTitle
//     });
// });

// Updating a To-Do item using PUT
router.put("/:title", updateTodo)

// router.put('/', async (req, res) => {
//     const { title, data } = req.body;

//     const updatedToDo = await ToDoModel.findOneAndUpdate(
//         { id },   // find by title
//         data,               // update fields
//         { new: true }       // return updated document
//     );

//     if (!updatedToDo) {
//         return res.status(404).json({
//             message: "To-Do item not found"
//         });
//     }

//     res.status(200).json({
//         message: "To-Do item updated successfully",
//         data: updatedToDo
//     });
// });

// PATCH - Update single status of To-Do (MongoDB)
router.patch("/:title", updateStatus)

// Deleting a To-Do item using DELETE
router.delete("/:title", deleteTodo)

// router.delete('/:title', async (req, res) => {
//     const { title } = req.params;
//     const deletedToDo = await ToDoModel.findOneAndDelete({ title });
//     if (!deletedToDo) {
//         return res.status(404).json({
//             status: false,
//             message: "To-Do item not found"
//         });
//     }
//     res.status(200).json({
//         status: true,
//         message: "To-Do item deleted successfully",
//         data: deletedToDo
//     });

// })

module.exports = router;