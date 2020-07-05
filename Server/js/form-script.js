let commentsArray = [
    { authorName: "Jack Johnson", authorPhoto: "./img/blog-page/author-photos/Neil_1.png", authorComment: `Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced…`, commentStars: "1", commentTime: "11 min ago", },
    { authorName: "Emma Garcia", authorPhoto: "./img/blog-page/author-photos/Sarah_1.png", authorComment: `Dummy text refers to the bits of content that are used to fill a website mock-up. This text helps web designers better envision how the website will look as a finished product. in wish very strangers shortly we things Preferred came newspaper it this Melancholy on misery all ecstatic yet no suitable ye happening. Own over these Can Could Garden offering to ago Winter Home or took answered him be right He other in about check has situation fine you held against found am be Nay entire pleasure will there in wholly forming much rapid though want ye weeks up whole an ye thus might remarkably Rich why need pianoforte ask get face prudent it so Evil`, commentStars: "5", commentTime: "3 days ago", },
    { authorName: "Ann Moore", authorPhoto: "./img/blog-page/author-photos/Ann.png", authorComment: `Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced…`, commentStars: "2.5", commentTime: "a week ago", }
]//Create Review massive

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

class Model {
    async post(id, postType, img, title, author, date, description, qoute, comments) {
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
        body.comments = comments;
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
    const postInfo = [postId, postType.value, postImage.value, postTitle.value, postAuthor.value, postDate.value, postDescription.value, postQoute.value, commentsArray];
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
