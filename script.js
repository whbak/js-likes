/* make localStorage */
function makeStorage() {
    const likesBewaar = localStorage.getItem('likes');
    let addobjLikes = [];
    if (likesBewaar == null) {
        addobjLikes.push(
            {
                like: "0",
                dislike: "0",
            },
        );
        let addJson = JSON.stringify(addobjLikes);
        localStorage.setItem('likes', addJson);
        console.log('makestorage: ', addJson);
    }
}

function getWeb() {
    makeStorage();
    const likesOpslag = localStorage.getItem('likes');
    let objLikes = JSON.parse(likesOpslag);
    const requestDog = 'https://dog.ceo/api/breeds/image/random';
    /* fetch randomusr url */
    fetch(requestDog)
        .then(res => res.json())
        .then(res => {
            if (res.status == 'success') {
                const divDoos = document.querySelector('.persons');
                /* create div */
                let addDiv = document.createElement('div');
                /* create Elements */
                let H1 = document.createElement('h1');
                H1.innerHTML = 'PictureRater';
                let Img = document.createElement('img');
                Img.src = res.message;
                Img.setAttribute('alt', 'plaatje hond');
                /* create buttons */
                let addKnoppendiv = document.createElement('div');
                addKnoppendiv.className = 'knoppen';
                let buttonLike = document.createElement('button');
                buttonLike.innerHTML = '<img src="ok.png"/>';
                buttonLike.id = 'ok';
                let buttonDislike = document.createElement('button');
                buttonDislike.innerHTML = '<img src="nok.png"/>';
                buttonDislike.id = 'nok';
                /* create liked, disliked text */
                let divLike = document.createElement('div');
                divLike.innerText = 'You liked: ';
                divLike.id = 'likes';
                let spanLike = document.createElement('span');
                spanLike.id = 'spanlikes';
                spanLike.innerText = `${objLikes[0].like} dogs `;
                let divDislike = document.createElement('div');
                divDislike.innerText = 'You disliked: ';
                divDislike.id = 'dislikes';
                let spanDislike = document.createElement('span');
                spanDislike.id = 'spandislikes';
                spanDislike.innerText = `${objLikes[0].dislike} dogs `;
                /* append Element divs */
                divLike.appendChild(spanLike);
                divDislike.appendChild(spanDislike);
                addKnoppendiv.appendChild(buttonLike);
                addKnoppendiv.appendChild(buttonDislike);
                /* append Elements */
                addDiv.appendChild(H1);
                addDiv.appendChild(Img);
                addDiv.appendChild(addKnoppendiv);
                addDiv.appendChild(divLike);
                addDiv.appendChild(divDislike);
                divDoos.appendChild(addDiv);
            } else {
                console.log('Geen internet');
            }
        });
}

getWeb();

function getLike() {
    const likesOpslag = localStorage.getItem('likes');
    let objLikes = JSON.parse(likesOpslag);
    console.log('objlikes: ', objLikes[0].like);
    let updateobjLikes = objLikes[0].like;
    updateobjLikes++;
    objLikes[0] = {
        like: updateobjLikes,
        dislike: objLikes[0].dislike,
    };
    let addJson = JSON.stringify(objLikes);
    localStorage.setItem('likes', addJson);
    console.log('addjson update: ', addJson);
}

function getDislike() {
    const likesOpslag = localStorage.getItem('likes');
    let objLikes = JSON.parse(likesOpslag);
    console.log('objdislikes: ', objLikes[0].dislike);
    let updateobjDislikes = objLikes[0].dislike;
    updateobjDislikes++;
    objLikes[0] = {
        like: objLikes[0].like,
        dislike: updateobjDislikes,
    };
    let addJson = JSON.stringify(objLikes);
    localStorage.setItem('likes', addJson);
    console.log('addjson update: ', addJson);
}

function herlaadWindow() {
    window.location.reload();
    console.log('reload page');
}

let likeKlik = 0;
let dislikeKlik = 0;
let okLike = document.querySelector('.persons');
okLike.onclick = function (event) {
    console.log('event node id: ', event.target.parentNode.id);
    if (event.target.parentNode.id == 'ok') {
        getLike();
        let okteller = document.querySelector('#spanlikes');
        const likesGet = localStorage.getItem('likes');
        let objLikes = JSON.parse(likesGet);
        okteller.innerText = `${objLikes[0].like} dogs `;
        console.log('likes: ', objLikes[0].like);
        herlaadWindow();
    } else if (event.target.parentNode.id == 'nok') {
        getDislike();
        let nokteller = document.querySelector('#spandislikes');
        const likesGet = localStorage.getItem('likes');
        let objLikes = JSON.parse(likesGet);
        nokteller.innerText = `${objLikes[0].dislike} dogs `;
        console.log('dislikes: ', objLikes[0].dislike);
        herlaadWindow();
    } else {
        console.log('geen like of dislike knop');
    }
};
