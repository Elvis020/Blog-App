const express = require("express");
const app = express();
const Post = require("./api/models/post")
const postData = new Post();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})


// Making the Images available to the frontend
app.use("/images", express.static('images'));

app.get("/api", (req, res) => {

    // const test = {
    //     testing: "testing"
    // }
    // postData.addBlogPost(test)
    res.status(200).send(postData.readData())
})



app.get("/api/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const foundPost = postData.getIndividualBlog(postId)
    if (foundPost) {
        res.status(200).send(foundPost)
    }
    res.status(400).send("😃 Sorry,Blog Post not found 🤣")
})

app.listen(4000, () => {
    console.log("Serve is running at port http://localhost:4000 😁");
})