const API_URL = "http://localhost:4000/api/posts";


// Function to create a new post by communicating with the backend
const submitNewPost = () => {
    const title = document.querySelector("#form_post_title").value;
    const content = document.querySelector("#form_post_content").value
    const inputFile = document.querySelector("#form_post_image");


    let data = new FormData();
    data.append("post_image", inputFile.files[0]);
    data.append("title", title);
    data.append("content", content);



    fetch(API_URL, {
        method: "POST",
        body: data
    })
    window.location.href ="index.html" 
}