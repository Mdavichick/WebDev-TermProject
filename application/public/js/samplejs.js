function fadeOut(event){
console.log(event)
    let div = event.currentTarget;
let currentOpacity = 1.0;
let timer = setInterval(() => {
    if(currentOpacity < 0.05){
        clearInterval(timer);
        div.remove();
        let count = document.getElementById('container').children.length;
        document.getElementById('items-count').innerHTML = `There are ${count} photo(s) being shown`;
    }
    div.style.opacity = currentOpacity;
    currentOpacity -= .05;
},5);
}



function createPhotoCard(data, containerDiv){
    // let div = document.createElement('div');
    // let img = document.createElement('img');
    // let p = document.createElement("P");
    // // let t = document.createTextNode(data.title);
    // let t = document.createTextNode(`${data.title}`);
    // img.src = data.url;
    //
    // img.width = 200;
    // img.height = 200;
    // img.alt = "This was a fake image"
    // p.innerText = data.title;
    // div.appendChild(img);
    // containerDiv.append(div);
    // p.setAttribute('id',`photo-${data.id}`);
    // p.setAttribute('class',`fadeout`);


    let photoDiv = document.createElement('div');
    let imgTag = document.createElement('img');
    let titleTag = document.createElement('h1');
    let titleText = document.createTextNode(`${data.title}`);
    photoDiv.setAttribute('id',`photo-${data.id}`);
    photoDiv.setAttribute('class', `fadeOut`);

    imgTag.src = data.url;

    imgTag.width = 200;
    imgTag.height = 200;
    imgTag.alt = "This was a fake image"
    // imgTag.setAttribute('src',`${data.url}`);
    // imgTag.setAttribute('alt','this was supposed to be a photo');
    titleTag.appendChild(titleText);
    photoDiv.appendChild(imgTag);
    photoDiv.appendChild(titleTag);
    photoDiv.addEventListener('click',fadeOut);
    containerDiv.appendChild(photoDiv);


}




let mainDiv = document.getElementById("container");
if(mainDiv){
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
        .then((data) => data.json())    // parse data
        .then ((photos) => {
            let innerHTML = "";
            photos.forEach((photo) => {
                createPhotoCard(photo, mainDiv);
            });
            document.getElementById('items-count').innerHTML = `There are ${photos.length} photo(s) being shown`;
        })
}

