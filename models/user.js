var mongoose = require('mongoose');
// Setup schema
var taskSchema = mongoose.Schema({
    title:{
        type:String
    },
    status:{
        type:String
    }
})
var listSchema = mongoose.Schema({
    title:{
        type:String
    },
    tasks:[taskSchema]
})
var boardSchema = mongoose.Schema({
    title:{
        type:String
    },
    lists:[listSchema]
})
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo:{
        type:String,
        required:true
    },
    boards:[boardSchema]

});
// Export Contact model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}