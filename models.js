"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


// this is our schema to represent a blog post
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { firstName: String,
            lastName: String}

});

// this is our how an author's name will be presented to a client
blogSchema.virtual("authorName").get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});



// this is how the entire post object will be presented to the client
blogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorName
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPosts = mongoose.model("BlogPosts", blogSchema);

module.exports = { BlogPosts };
