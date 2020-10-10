const express = require("express");
const app = express();
const Post = require("./api/models/post")
const postData = new Post();
const bodyParser = require("body-parser");
const multer = require("multer");


// Adding upload functionality to the app using multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimeType) => {
    switch (mimeType) {
      case "image/png":
        return ".png";
      case "image/jpeg":
        return ".jpg";
    }
}

//  Uploading to storage
let upload = multer({ storage: storage });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use(bodyParser.json());

// Making the Images available to the frontend
app.use("/images", express.static('images'));

app.get("/api", (req, res) => {
    res.status(200).send(postData.readData())
})

app.post("/api/posts", upload.single("post_image"), (req,res) => {
    const newPosts = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image":req.file.path,
        "added_date": `${Date.now()}`
    }
    postData.addBlogPost(newPosts)
    res.status(201);
    res.send("ok");
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