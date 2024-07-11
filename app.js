

const container = document.querySelector(".container");
const closeBtn = document.querySelector('#closeBtn')
const overlay = document.querySelector(".overlay");
const main = document.querySelector(".main");
const input = document.querySelector("#input");
const searchBtn = document.querySelector("#searchBtn");
let accessKey = `eQ8zCZyIUxCbCOi-Ka5GdyvPLUZdBqEIVxddeRskC54`;
let page = 1;





async function getAPI() {
    try{

    let value = input.value;



    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${value}&client_id=${accessKey}`;

    let response = await fetch(url);
    let data = await response.json();

    console.log(data)

    let array = data.results;

    main.innerHTML = "";

    array.map((elm) => {


    

        let images = elm.urls.small;

        console.log(images);

        let imgCaption = elm.alt_description;

        let imgContainer = document.createElement("div");
        imgContainer.className = "imgContainer";
        let img = document.createElement("img");
        img.setAttribute("src", images)
        img.className = "img";
        let des = document.createElement("div");
        des.className = "des";
        let imgName = document.createElement("span");
        imgName.innerText = imgCaption;
        imgName.className = "imgName";
        let downloadBtn = document.createElement("a");
        downloadBtn.innerHTML = `<i class="fa-solid fa-circle-down"></i>`;
        downloadBtn.className = 'downloadBtn';
        downloadBtn.target = "_blank";
        downloadBtn.download = "images"; 
        downloadBtn.href = images;


        
        

        main.appendChild(imgContainer);
        imgContainer.appendChild(img);
        imgContainer.appendChild(des);
        des.appendChild(imgName);
        des.appendChild(downloadBtn);


        // Creating the lightBox effect 
        imgContainer.addEventListener("click",maxTheImg);
        closeBtn.addEventListener("click", closeTheImg);
        overlay.addEventListener("click",hideTheImg);

        // Max the image
        function maxTheImg() {
           overlay.classList.add("overlayActive");
           container.style.position = "fixed";
          
           let imgDetail = document.createElement("div");
           imgDetail.className = "imgDetail";
           let img = document.createElement("img");
           img.setAttribute("src", images);
           let del = document.createElement("div");
           del.className = "del";
           let name = document.createElement("h4");
           name.className = "imgName";
           name.innerText = imgCaption;


            imgDetail.appendChild(img);
            imgDetail.appendChild(del);
            del.appendChild(name);
           overlay.appendChild(imgDetail);


        }

        // Close the image
        function closeTheImg() {
           overlay.classList.remove("overlayActive");
           container.style.position = "relative"
        }

        // Hide the image
        function hideTheImg(event) {
            if (event.target == overlay) {
                overlay.classList.remove("overlayActive");
                container.style.position = "relative"
            }
        }






    })

    input.value = "";}catch(errro){
        alert("please enter a valid image name...")
    }

}

// getAPI();



searchBtn.addEventListener("click", getAPI);
