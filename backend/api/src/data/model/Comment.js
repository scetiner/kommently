var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    page: { type: Schema.Types.ObjectId, ref: 'Page' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    s_score: { type: Number, default: 0 },
    u_score: { type: Number, default: 0 },
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    ip: {type:String },
    country_code:{type:String },
    country_name:{type:String },
    city:{type:String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

CommentSchema.plugin(mongoosePaginate);
CommentSchema.index({page: 1, user: 1}, {unique: true});


CommentSchema.pre('save', function (next) {
    var c = this;    
    c.updated_at = new Date();    

    // if created_at doesn't exist, add to that field
    if (!c.created_at)
        c.created_at = c.updated_at;

    next();
});

module.exports = mongoose.model('Comment', CommentSchema);