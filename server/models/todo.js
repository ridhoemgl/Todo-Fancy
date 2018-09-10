const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User' },
    name:{
        type: String
    },
    description:{
        type: String
    },
    duoDate:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo