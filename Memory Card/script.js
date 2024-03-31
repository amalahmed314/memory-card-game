const section = document.querySelector("#game-board");
const playerLivesCount = document.querySelector("span");
const resetButton = document.getElementById("reset-button");
let playerLives = 6;

//link text
playerLivesCount.textContent = playerLives;

//generate the data--> return array of images
const getData = () =>[
    {imgSrc:'./images/1.png', name:"pic1"},
    {imgSrc:'./images/3.png', name:"pic3"},
    {imgSrc:'./images/4.png', name:"pic4"},
    {imgSrc:'./images/5.png', name:"pic5"},
    {imgSrc:'./images/6.png', name:"pic6"},
    {imgSrc:'./images/7.png', name:"pic7"},
    {imgSrc:'./images/8.png', name:"pic8"},
    {imgSrc:'./images/9.png', name:"pic9"},
    {imgSrc:'./images/1.png', name:"pic1"},
    {imgSrc:'./images/3.png', name:"pic3"},
    {imgSrc:'./images/4.png', name:"pic4"},
    {imgSrc:'./images/5.png', name:"pic5"},
    {imgSrc:'./images/6.png', name:"pic6"},
    {imgSrc:'./images/7.png', name:"pic7"},
    {imgSrc:'./images/8.png', name:"pic8"},
    {imgSrc:'./images/9.png', name:"pic9"},
    
];

//Shuffffle
const randomize =()=>{
    const cardData =getData();
    cardData.sort(()=>Math.random()-0.5);
    return cardData;
    //console.log(cardData);
};
//randomize();

// card Generator function
const cardGenerator =()=>{
    const cardData = randomize();
   // console.log(cardData);
   //Generate HTML
  
   cardData.forEach((item)=>{
   // console.log(item);
   const card = document.createElement("div");
   const face = document.createElement("img");
   const back = document.createElement("div");
   card.classList ='card';
   face.classList ='face';
   back.classList ='back';
   //Attach the info to the cards
   face.src = item.imgSrc;
   card.setAttribute('name',item.name)
    // Wrap face and back inside the card
    card.appendChild(face);
    card.appendChild(back);
   // Attach the cards to the section
   section.appendChild(card);
   card.addEventListener("click",(e) =>{
   card.classList.toggle("toggleCard");
    checkCards(e);
  });

   });
    // Show cards for 1 second
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.add('toggleCard');
            setTimeout(() => card.classList.remove('toggleCard'), 1500);
        });
    }, 1000);
   
   
};
//Check Cards
const checkCards = (e) => {
    const clickedCard = e.target;
   // console.log(clickedCard);
   clickedCard.classList.add("flipped");
   const flippedCards = document.querySelectorAll(".flipped");
   const toggleCard = document.querySelectorAll(".toggleCard");
   
   console.log(flippedCards);
   //Logic
   if(flippedCards.length === 2){
     if(flippedCards[0].getAttribute('name')=== flippedCards[1].getAttribute('name')){
    
       console.log("match");
       flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents ="none";
       });
      }else{
    console.log("wrong");
    flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"),1000);
    });
    playerLives--;
    playerLivesCount.textContent = playerLives;
    if(playerLives === 0 ){
        restart("😓 try again 👎");
    }
     }
    }
    // Run a check to see if we won the game
    if(toggleCard.length ===16){
        restart("✌️ You Won 🥳 ");
    }
};
//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents ="none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize when restart
        setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name",item.name);
        section.style.pointerEvents ="all";
    },1000);
        

    });
    playerLives = 6;
    playerLivesCount.textContent =playerLives;
    setTimeout(() => window.alert(text),100);
    // Show cards for 1 second after resetting
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.add('toggleCard');
            setTimeout(() => card.classList.remove('toggleCard'), 1500);
        });
    }, 1000);
};
// Event listener for the "Reset Game" button
resetButton.addEventListener("click", () => {
    restart("Game Restarted 👍");
    // Show cards for 1 second after resetting
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.add('toggleCard');
            setTimeout(() => card.classList.remove('toggleCard'), 1500);
        });
    }, 1000);
});

// Initialize the game
cardGenerator();


