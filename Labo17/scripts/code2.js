let global = {
    IMAGE_COUNT: 5, // aantal figuren
    IMAGE_SIZE: 48, // grootte van de figuur
    IMAGE_PATH_PREFIX: "images/", // map van de figuren
    IMAGE_PATH_SUFFIX: ".png", // extensie van de figuren
    MOVE_DELAY: 4000, // aantal milliseconden voor een nieuwe afbeelding verschijnt
    score: 1, // aantal hits
    timeoutId: 0 // id van de timeout timer, zodat we die kunnen annuleren
};

const setup = () => {
    let btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", start)

}

const start = () => {
    let btnStart = document.getElementById("btnStart");
    btnStart.style.display = "none"
    let playfield = document.getElementById("playField");
    let img= document.createElement("img");
    //img inladen met aan random pic
    let imgList = [ "images/1.png", "images/2.png", "images/3.png", "images/4.png"];
    let afbeelding = Math.floor(Math.random() * imgList.length);
    img.setAttribute("src", imgList[afbeelding]);
    //img toevoegen aan playfield
    playfield.appendChild(img);

    //andere functies
    img.addEventListener('click', control)
    img.addEventListener("click", positie)
    global.timeoutId = setTimeout(positie, global.MOVE_DELAY)



}
const control = (event) => {
    //img element oproepen
    let img= document.querySelector("img");
    let txtOutput = document.getElementById("txtOutput");
    let bom = img.getAttribute('src')
    if (event){
        if (bom === "images/0.png"){
            window.alert("GAME OVER");
            img.removeEventListener("click", positie);// hierdoor stop ik de functie positie
            clearTimeout(global.timeoutId);
        }else{
            txtOutput.textContent = "Aantal hits: " + global.score++

        }
    }
}

const positie = () => {
    //timer resetten en setten
    clearTimeout(global.timeoutId);

    if (global.score >= 10){
        let move = 1000;
        global.timeoutId = setTimeout(positie, move)
    }else{
        global.timeoutId = setTimeout(positie, global.MOVE_DELAY)
    }
    //img element oproepen
    let img= document.querySelector("img");

    //img veranderen bij ieder klik
    let imgList = ["images/0.png", "images/1.png", "images/2.png", "images/3.png", "images/4.png"];
    let afbeelding = Math.floor(Math.random() * imgList.length);
    img.setAttribute("src", imgList[afbeelding]);

    //de afmeting ophalen van playfield en img
    let playfield = document.getElementById("playField")
    let playfieldHeight = playfield.clientHeight;
    let playfieldWidth = playfield.clientWidth;
    let afmetingIMG = global.IMAGE_SIZE;
    //de img positie laten veranderen
    img.id="target"
    img.style.top = Math.floor(Math.random() * (playfieldHeight - afmetingIMG)) + "px";
    img.style.left = Math.floor(Math.random() * (playfieldWidth - afmetingIMG)) + "px";

}

window.addEventListener("load", setup);