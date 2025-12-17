const ToDoModel  = require('../models/to-do-list-model');

exports.getalltodos = async(req, res) => {

    try{
        const list = await ToDoModel.find().sort({createdAt : -1});

        if(list.length === 0){
            return res.status(404).json({
                success: false,
                message: "No To-Do items found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "To-Do items retrieved successfully",
            data: list
        })
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }

}

exports.getSingleTodo = async(req, res) => {
    
    try{
        const {title} = req.params;
        const list = await ToDoModel.findOneAndUpdate({title});

        if (!list || list.length === 0) {
            return res.status(400).json({
                success: false,
                message: `No To-Do items found for ${title}`
            });
    }

    return res.status(200).json({
        success: true,
        message: "To-Do items retrieved successfully",
        data: list
    });
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }

}

exports.addTodo = async(req, res) =>{
    try{
        const data = req.body;
        const newTitle = await ToDoModel.create(data);
        
        res.status(201).json({
        message: "New To-Do item added successfully",
        data: newTitle
    })
    } catch(error){
        res.status(400).json({
            message: "Error adding To-Do item",
            error: error.message
        });
    }

}

exports.updateTodo = async(req, res) => {
    
    try{
        const { title } = req.params;
        const { data } = req.body;

        if(!data){
            return res.status(400).json({
                message: "Data is required"
            });
        }

        // Delete if 'Completed'
        if(data.status == "completed"){
            const deleteTodo = await ToDoModel.findOneAndDelete({title});
            if(!deleteTodo){
                return res.status(404).json({
                    message: "To-Do item not found"
                });
            }
            return res.status(200).json({
                message: "To-Do completed and removed",
                deleted: true,
                data: deleteTodo
            });
        }

        // Update if found
        const updatedToDo = await ToDoModel.findOneAndUpdate({title}, data, { new: true });

        if(!updatedToDo){
             return res.status(404).json({
                 message: "To-Do item not found"
            });
        }
        return res.status(200).json({
            message: "To-Do item updated successfully",
            deleted: false,
            data: updatedToDo
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateStatus = async(req, res) => {
    try{
        const {title} = req.params;
        const {status} = req.body;
    
        if (!title || !status) {
            return res.status(400).json({
                message: "title and status are required"
            });
        }
    
        const updatedToDo = await ToDoModel.findOneAndUpdate({title}, {status}, { new: true });
    
        if (!updatedToDo) {
            return res.status(404).json({
                message: "To-Do item not found"
            });
        }
    
        if(status == "completed"){
            const deleteTodo = await ToDoModel.findOneAndDelete({title});
            return res.status(200).json({
                message : "This task is now completed and will be removed",
                data: deleteTodo
            })
        }
    
        return res.status(200).json({
            message: "To-Do item updated successfully",
            data: updatedToDo
        });
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteTodo = async(req, res) => {
    try{
        const { title } = req.params;
        const deletedToDo = await ToDoModel.findOneAndDelete({ title });
        if (!deletedToDo) {
            return res.status(404).json({
                message: "To-Do item not found"
            });
        }
        return res.status(200).json({
            message: "To-Do item deleted successfully",
            data: deletedToDo
        });
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}