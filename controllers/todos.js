const Todo = require('../models/Todo');

module.exports = {
    getTodos: async (req,res)=>{
        //console.log(req.user);
        try{
            const itemsLeft = await Todo.find({userId:req.user.id, completed: false});
            const itemsCompleted = await Todo.find({userId:req.user.id, completed: true});
            // console.log({
            //     'itemsLeft': itemsLeft,
            //     'itemsCompleted': itemsCompleted
            // })
            res.render('todos.ejs', {left: itemsLeft,completed: itemsCompleted,user: req.user});
        }catch(err){
            console.log(err);
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({
                todo: req.body.todoItem,
                completed: false,
                userId: req.user.id,
                dateCreated: Date(),
                dateCompleted: null
            })
            console.log('Todo has been added!');
            res.redirect('/todos');
        }catch(err){
            console.log(err);
        }
    },
    markComplete: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true,
                dateCompleted: Date()
            })
            console.log('Marked Complete');
            //res.redirect('/todos');
            res.json('Marked complete')
        }catch(err){
            console.log(err);
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false,
                dateCompleted: null
            });
            console.log('Marked Incomplete');
            //res.redirect('/todos');
            res.json('marked incomplete')
        }catch(err){
            console.log(err);
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile);
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile});
            console.log('Deleted Todo');
            // res.redirect('/todos');
            res.json('deleted todo')
        }catch(err){
            console.log(err);
        }
    }
}
