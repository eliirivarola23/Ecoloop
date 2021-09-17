const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String},
  image: { type: String},
  description: { type: String},
  ubication: { type: String},
  category: { type: String},
  contact: { type: String},
  userId: {type: String},
  // userId: { type: mongoose.Types.ObjectId, ref: "user"},

});

const Article = mongoose.model("article", ArticleSchema);
module.exports = Article;
