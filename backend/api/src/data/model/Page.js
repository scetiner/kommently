var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
    url: { type: String, required: true, index: { unique: true } },
    s_score: { type: Number, default: 0 },
    u_score:{ type: Number, default: 0 },
    c_count:{ type: Number, default: 0 },
    visits:{ type: Number, default: 1 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


PageSchema.pre('save', function(next) {
    var page = this;
    // page the updated_at page to current date
    page.updated_at = new Date();

    // if created_at doesn't exist, add to that field
    if (!page.created_at)
        page.created_at = page.updated_at;
    next();
});

module.exports = mongoose.model('Page', PageSchema);