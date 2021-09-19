const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  description: { type: String },
  ubication: { type: String },
  category: { type: String },
  contact: { type: String },
  userId: { type: String },
  userName: { type: String },
  userUrlImage: { type: String },
});

const Article = mongoose.model("article", ArticleSchema);
module.exports = Article;
