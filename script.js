const getPost = async(searchTerm='') => {
    const response = await axios.get(`https://61ab59be264ec200176d411b.mockapi.io/api/posts/${searchTerm}`);
    console.log(response);
    return response.data

}
//getPost();


const postContainer = document.querySelector('#post-container');
var constId = 0;

const showPost = async() =>{
    const posts = await getPost();
    //console.log(posts);
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
        <div class="post">
            <div class="date-container">
                <p>
                    <span id="date-post">${post.createdAt}</span>
                    <span id="options-btn">...</span>
                    <div id="options-menu">
                        <div>delete</div>
                        <div>coment</div>
                    </div>
                </p>
            </div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class='post-body'>
                    ${post.content}
                </p>
            </div>
        </div>
        `
        postContainer.appendChild(postElement);
        constId = `${post.id}`
        console.log(constId);
    })
    
}
showPost();
const createPost = document.querySelector('.submitPost');
const form = document.querySelector('.newpost');
const dateNewPost = document.querySelector('#npost-date');
const titleNewPost = document.querySelector('#npost-title');
const bodyNewPost = document.querySelector('#npost-body');
const upPost = document.querySelector('#submit');

const optionsBtn = document.querySelector('#options-btn');
const menuPost = document.querySelector('#options');

createPost.addEventListener('click', ()=> {
    form.style.display = 'flex';
    console.log(titleNewPost.value, dateNewPost.value)
});

const uploadPost = async () =>{
    const postId = parseInt(constId) + 1;
    const datos = {id:`${postId}` , title: `${titleNewPost.value}`, content: `${bodyNewPost.value}`, createdAt:`${dateNewPost.value}`}
    const response = await axios.post('https://61ab59be264ec200176d411b.mockapi.io/api/posts', datos);
    console.log(response.data);
}

upPost.addEventListener('click', uploadPost);

optionsBtn.addEventListener('click', () => {
    menuPost.style.display = 'flex';
})