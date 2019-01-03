var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    g_id: { type: String, required: true, unique: true },
    avatar: { type: String },
    username: { type: String },    
    created_at: Date,
    updated_at: Date
});


UserSchema.pre('save', function(next) {
    var user = this;
    // change the updated_at field to current date
    user.updated_at = new Date();

    // if created_at doesn't exist, add to that field
    if (!user.created_at)
        user.created_at = user.updated_at;

    next();
});

module.exports = mongoose.model('User', UserSchema);