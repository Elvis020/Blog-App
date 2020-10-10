const API__URL = "http://localhost:4000/api";
const BASE_URL = "http://localhost:4000";



window.onload = () => {
    getPosts();
}


const getPosts = () => {
    fetch(API__URL, {
        method: "GET"
    }).then(res => {
        return res.json()
    }).then(data => {
        buildPosts(data)
    })
}


const buildPosts = (blogPosts) => {
    let blogPostContent = "";
    for (blogPost of blogPosts) {
        const postDate = new Date(parseInt(blogPost.added_date)).toDateString();
        const postImage = `${BASE_URL}/${blogPost.post_image}`;
        const postLink = `/FrontEnd/blog_post.html?id=${blogPost.id}`
        blogPostContent += `
        <a class="post__link" href="${postLink}">
            <div class="post">
                <div class ="post__image"
                style="background-image:url(${postImage})"> </div>
                <div class="post__content">
                    <div class="post__date"> ${postDate} </div> 
                    <div class="post__title"><h4>${blogPost.title}</h4></div> 
                    <div class="post__text"> ${blogPost.content} </div>
                </div>
            </div>
        </a>
        `
    };

    document.querySelector('.blog__posts').innerHTML = blogPostContent
    console.log(blogPosts);
}


// <div class="post__image" style="background-image:url(${BASE_URL}/${blogPost.post_image})"><div>