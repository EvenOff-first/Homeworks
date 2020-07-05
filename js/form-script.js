class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

class Model {
    async post(id, postType, img, title, author, date, description, qoute) {
        // Requst link
        const requestURL = "http://localhost:3000/api/create-article";
        //Create object and full it
        const body = new Object();
        body.id = id;
        body.postType = postType;
        body.img = img;
        body.title = title;
        body.author = author;
        body.date = date;
        body.description = description;
        body.qoute = qoute;
        const headers = {
            'Content-type': 'application/json'
        }
        // Request
        fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        }).then(async response => {
            if (response.ok) {
                setTimeout(() => controller.view.renderPostPage(postId), 2000);
                return response.json();
            }

            return response.status;
        })
    }

    async getList() {
        const requestURL = "http://localhost:3000/api/list";
        let response = await fetch(requestURL);
        let content = await response.json();
        return content;
    }

    async getPostId() {
        const requestURL = "http://localhost:3000/api/list";
        let response = await fetch(requestURL);
        let content = await response.json();
        for (const key in content) {
            if (content.length === content[key].id) {
                postId = content[key].id;
            }
        }
        postId += 1;
        return postId;
    }
}

class View {
    async renderPostPage(postId) {//Open post page
        window.location.href = "./post.html";
    }
}


const view = new View();// Create objects MVC
const model = new Model();
const controller = new Controller(model, view);

const button = document.querySelector('#submit-button');
const postImage = document.querySelector('#post-image');
const regExp = /^[A-Z].{2,20}[,.:?!-]{0,}$/;// Regular for check Title

let postId;// Create variable for post id
controller.model.getPostId();// getting post id

button.onclick = function (event) {
    event.preventDefault();// off default submit from button

    //Get blocks from html page
    const postType = document.querySelector('#post-type');
    const postTitle = document.querySelector('#post-title');
    const postAuthor = document.querySelector('#post-author');
    const postDate = document.querySelector('#post-date');
    const postDescription = document.querySelector('#post-description');
    const postQoute = document.querySelector("#post-qoute");

    if (regExp.test(postTitle.value)) {// Check Title on regular
    const postInfo = [postId, postType.value, postImage.value, postTitle.value, postAuthor.value, postDate.value, postDescription.value, postQoute.value];
    controller.model.post(...postInfo);

    // Clearing inputs
    postType.value = "choose one";
    postTitle.value = "";
    postImage.value = "";
    postAuthor.value = "";
    postDate.value = "";
    postDescription.value = "";
    postQoute.value = "";
    
    postId = controller.model.getPostId();
    } else {//Activates if Title inccorect
        alert("Title must have from two to twenty letters and first letter must be uppercase");
    }
}
