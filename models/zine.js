var mongoose = require('mongoose');

var ZineSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  pages: []
});

ZineSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      title: ret.title,
      description: ret.description,
      image: ret.image,
      pages: ret.pages
    };
    return returnJson;
  }
});

module.exports = mongoose.model('Zine', ZineSchema);