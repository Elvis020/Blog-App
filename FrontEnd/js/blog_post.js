const API__URL = "http://localhost:4000/api/";
const BASE_URL = "http://localhost:4000";



window.onload = () => {
    getPosts();
    getPostParams();
}

const getPostParams =() => {
    // This gives us the full link in the search bar
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams);
    return urlParams.get("id")
}


const getPosts = () => {
    const postId = getPostParams();
    const url = `${API__URL}${postId}`
    fetch(url, {
        method: "GET"
    }).then(res => {
        return res.json()
    }).then((data) => {
        buildPosts(data)
    })
}


const buildPosts = (data) => {
    console.log(data);
    const blogPostDate = new Date(parseInt(data.added_date)).toDateString();
    const post__image = `${BASE_URL}/${data.post_image}`;
    document.querySelector("header").style.backgroundImage = `url(${post__image})`
    document.getElementById("individual__post__title").innerText = data.title;
    document.getElementById("individual__post__date").innerText = `Published on ${blogPostDate}`;
    document.getElementById("individual__post__content").innerText = data.content;
}