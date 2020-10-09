const fs = require('fs');
const path = require('path');
const dataInPath = path.join(__dirname, '/data.json');

class Post {

    getData() {
        return this.readData();
    }


    getIndividualBlog(postId) {
        const posts = this.getData();
        const findPost = posts.find(post => post.id == postId);
        return findPost;
    }


    // Function to add a new Blog Post to the array of blog Post
    addBlogPost(newPost) {
        let currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeBlogPost(currentPosts)
    }

    // Function to read the data of the array of blog Post available
    readData() {
        let rawData = fs.readFileSync(dataInPath)
        let post = JSON.parse(rawData);
        return post;
    }

    storeBlogPost(rawData) {
        let data = JSON.stringify(rawData)
        fs.writeFileSync(dataInPath, data)
    }


}

module.exports = Post;