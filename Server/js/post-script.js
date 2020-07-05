
let id = 0;// Create id for rendering comments
const comments = document.querySelector('.comments');

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    handleGetLastId() {
        this.model.getLastId();
    }

    handlePostPage() {
        this.view.postPage(postId);
    }

    handleGetDate(number) {
        return this.model.getDate(number);
    }

    handleCheckPostType(postType) {
        return this.model.checkPostType(postType);
    }
}

class Model {
    async getLastId() {
        const requestURL = "http://localhost:3000/api/list";
        let response = await fetch(requestURL);
        let content = await response.json();
        for (const key in content) {
            if (content.length === content[key].id) {
                postId = content[key].id;
            }
        }

        return postId;
    }

    getDate(number) { // Get month
        let monthArray = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'];
        switch (number) {
            case '01': return monthArray[0];
            case '02': return monthArray[1];
            case '03': return monthArray[2];
            case '04': return monthArray[3];
            case '05': return monthArray[4];
            case '06': return monthArray[5];
            case '07': return monthArray[6];
            case '08': return monthArray[7];
            case '09': return monthArray[8];
            case '10': return monthArray[9];
            case '11': return monthArray[10];
            case '12': return monthArray[11];
        }
    }

    checkPostType(postType) {// Checking post type
        switch (postType) {
            case "text": return ""; break;
            case "video": return `
            <video controls>
                <source src="#" type="video/mp3">
            </video>`; break;
            case "audio": return `
                <audio controls>
                    <source src="#" type="audio/mpeg">
                </audio>
            `; break;
            case "picture": return `
                <img src="#" alt="Image">
            `; break;
            default: return "hello"; break;
        }
    }

    renderComments(commentsArray) {// Rendering comments
        setTimeout(() => {
            if (id < 3) {
                comments.innerHTML += `
                    <div class="comments__item row">
                    <div class="comments__photo">
                        <img src="${commentsArray[id].authorPhoto}" alt="">
                    </div>
                    <div class="comments__content">
                        <div class="comments__content__head row">
                            <div class="author__name">
                                <h4>${commentsArray[id].authorName}</h4>
                            </div>
                            <div class="blog__post-stars row">
                                <div class="star">
                                    <img src="./img/icons/Star.svg" alt="">
                                </div>
                                <div class="star">
                                    <img src="./img/icons/Star-1.svg" alt="">
                                </div>
                                <div class="star">
                                    <img src="./img/icons/Star-1.svg" alt="">
                                </div>
                                <div class="star">
                                    <img src="./img/icons/Star-1.svg" alt="">
                                </div>
                                <div class="star">
                                    <img src="./img/icons/Star-1.svg" alt="">
                                </div>
                            </div>
                            <div class="released__time row">
                                <img src="./img/icons/a-icon-time.svg" alt="">
                                <span>${commentsArray[id].commentTime}</span>
                            </div>
                        </div>
                        <div class="comments__content__body">
                            ${commentsArray[id].authorComment}
                        </div>
                        <div class="readMore row">
                            <a href="#">Read more</a>
                        </div>
                    </div>
                </div>
                    `;
                id += 1;
                this.renderComments(commentsArray);
            }
        }, 600);
    }
}


class Viewer {
    async postPage(postId) {
        const requestURL = `http://localhost:3000/api/list/${postId}`;
        let response = await fetch(requestURL);
        let content = await response.json();
        // Get block from the post page
        const postTitle = document.querySelector("#post-title");
        const postAuthor = document.querySelector("#post-author");
        const postImage = document.querySelector("#post-image");
        const postDate = document.querySelector("#post-date");
        const postText = document.querySelector(".post__text");
        const postType = document.querySelector("#post-type");
        const comments = document.querySelectorAll(".comments__item");
        let type = controller.handleCheckPostType(content.postType);// Find post type
        // Full post page
        postType.innerHTML = `${type}`;
        postTitle.innerHTML = `<h1>${content.title}</h1>`;
        postAuthor.innerText = `${content.author}`;
        let day = content.date[8] + content.date[9];
        let monthNumber = content.date[5] + content.date[6];
        let year = content.date[0] + content.date[1] + content.date[2] + content.date[3];
        let month = controller.handleGetDate(monthNumber);
        postDate.innerHTML = `
        <span class="day">${day}</span>
        <span class="month">${month}</span>,
        <span class="year">${year}</span>
        `
        postImage.src = `${content.img}`;
        postText.innerHTML = `<p>${content.description}</p>`
        postText.innerHTML += `
        <div class="comment">
            <div class="comment__rectangle"></div>
                <p id="qoute">
                ${content.qoute}
                </p>
            </div>`
        controller.model.renderComments(content.comments);// Activate comments rendering
    }
}
let postId;// Id of rendering post

const view = new Viewer();
const model = new Model();
const controller = new Controller(model, view);

controller.handleGetLastId();// Getting id for render post
setTimeout(() => controller.handlePostPage(postId), 2000);
