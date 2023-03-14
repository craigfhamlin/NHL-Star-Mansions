const cardObjectDefinitions = [
  { id: 1, imagePath: "/images/boba.jpg" },
  { id: 2, imagePath: "/images/ovi.jpg" },
  { id: 3, imagePath: "/images/keenan.jpg" },
  { id: 4, imagePath: "/images/panda.jpg" },
];

const insults = [
  "You lose - stupid egg!",
  "You lose - bad egg!",
  "You lose - tortoise egg!",
  "You lose - rolling egg!",
  "You lose - cào nǐ zǔzōng shíbā dài!!",
  "You lose - nǐ tā mā de kàn shénme?!!",
];

const captions = [
  "Boba Fett \n Bounty Hunter",
  "V. Putzelensky \n Gangstas",
  "Mke Kennan \n Coach",
  "Captain Panda \n Center",
];

const pandaId = 4;

const cardBackImgPath = "/images/sexy-card.png";

let cards = [];

const playGameButtonElem = document.getElementById("playGame");
const pageButton = document.getElementById("prick");
const cardContainerElem = document.querySelector(".card-container");

const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";

const numCards = cardObjectDefinitions.length;

let cardPositions = [];

let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;

const currentGameStatusElem = document.querySelector(".current-status");
const scoreContainerElem = document.querySelector(".header-score-container");
const scoreElem = document.querySelector(".score");
const roundContainerElem = document.querySelector(".header-round-container");
const roundElem = document.querySelector(".round");

const winColor = "green";
const loseColor = "red";
const primaryColor = "black";

let roundNum = 0;
let maxRounds = 4;
let score = 0;

let gameObj = {};

loadGame();

function endRound() {
  setTimeout(() => {
    startRound();
  }, 3000);
}

function chooseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
    flipCard(card, false);

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(
        currentGameStatusElem,
        "block",
        primaryColor,
        "Card positions revealed"
      );

      endRound();
    }, 3000);
    cardsRevealed = true;
  }
}

function updateStatusElement(elem, display, color, innerHTML) {
  elem.style.display = display;

  if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }
}

function outputChoiceFeedBack(hit) {
  if (hit || roundNum == 4) {
    location.replace("page2.html");
  } else {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    const lose = getRandomInt(6);
    const joe = insults[lose];
    updateStatusElement(currentGameStatusElem, "block", loseColor, joe);
  }
}
function evaluateCardChoice(card) {
  if (card.id == pandaId || roundNum == 4) {
    location.replace("page2.html");
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

function canChooseCard() {
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function loadGame() {
  createCards();

  cards = document.querySelectorAll(".card");

  cardFlyInEffect();

  playGameButtonElem.addEventListener("click", () => startGame());

  updateStatusElement(scoreContainerElem, "none");
  updateStatusElement(roundContainerElem, "none");
}

function startGame() {
  initializeNewGame();
  startRound();
}

function initializeNewGame() {
  score = 0;
  roundNum = 0;

  shufflingInProgress = false;

  updateStatusElement(scoreContainerElem, "flex");
  updateStatusElement(roundContainerElem, "flex");

  updateStatusElement(
    scoreElem,
    "block",
    primaryColor,
    `Score <span class='badge'>${score}</span>`
  );
  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function startRound() {
  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function initializeNewRound() {
  roundNum++;
  playGameButtonElem.disabled = true;

  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    "Shuffling..."
  );

  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function collectCards() {
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

function transformGridArea(areas) {
  cardContainerElem.style.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card, index) => {
    addChildElement(cellPositionElem, card);
  });
}

function removeShuffleClasses() {
  cards.forEach((card) => {
    card.classList.remove("shuffle-left");
    card.classList.remove("shuffle-right");
  });
}

function animateShuffle(shuffleCount) {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  let card1 = document.getElementById(random1);
  let card2 = document.getElementById(random2);

  if (shuffleCount % 4 == 0) {
    card1.classList.toggle("shuffle-left");
    card1.style.zIndex = 100;
  }
  if (shuffleCount % 10 == 0) {
    card2.classList.toggle("shuffle-right");
    card2.style.zIndex = 200;
  }
}

function shuffleCards() {
  let shuffleCount = 0;
  const id = setInterval(shuffle, 12);

  function shuffle() {
    randomizeCardPositions();

    animateShuffle(shuffleCount);

    if (shuffleCount == 500) {
      clearInterval(id);
      shufflingInProgress = false;
      removeShuffleClasses();
      dealCards();
      updateStatusElement(
        currentGameStatusElem,
        "block",
        primaryColor,
        "where does the winner hiding?"
      );
    } else {
      shuffleCount++;
    }
  }
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}

function returnGridAreasMappedToCardPos() {
  let firstPart = "";
  let secondPart = "";
  let areas = "";

  cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + "a ";
    } else if (cardPositions[index] == 2) {
      areas = areas + "b ";
    } else if (cardPositions[index] == 3) {
      areas = areas + "c ";
    } else if (cardPositions[index] == 4) {
      areas = areas + "d ";
    }
    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = "";
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
  });

  return `"${firstPart}" "${secondPart}"`;
}

function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}

function createCards() {
  cardObjectDefinitions.forEach((cardItem) => {
    createCard(cardItem);
  });
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;

  if (flipToBack && !innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.add("flip-it");
  } else if (innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.remove("flip-it");
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) =>
    setTimeout(() => flipCard(card, flipToBack), index * 100)
  );
}

function cardFlyInEffect() {
  const id = setInterval(flyIn, 5);
  let cardCount = 0;

  let count = 0;

  function flyIn() {
    count++;
    if (cardCount == numCards) {
      clearInterval(id);
      playGameButtonElem.style.display = "inline-block";
    }
    if (count == 1 || count == 250 || count == 500 || count == 750) {
      cardCount++;
      let card = document.getElementById(cardCount);
      card.classList.remove("fly-in");
    }
  }
}

function createCard(cardItem) {
  //create div elements that make up a card
  const cardElem = createElement("div");
  const cardInnerElem = createElement("div");
  const cardFrontElem = createElement("div");
  const cardBackElem = createElement("div");

  //create front and back image elements for a card
  const cardFrontImg = createElement("div");
  const playerImage = createElement("img");
  const team = createElement("img");
  const cardFrontFigure = createElement("figure");
  const figCaption = createElement("figcaption");
  const cardBackImg = createElement("img");

  //add class and id to card element
  addClassToElement(cardElem, "card");
  addClassToElement(cardElem, "fly-in");
  addIdToElement(cardElem, cardItem.id);

  //add class to inner card element
  addClassToElement(cardInnerElem, "card-inner");

  //add class to front card element
  addClassToElement(cardFrontElem, "card-front");

  //add class to cardFrontFigure
  addClassToElement(cardFrontFigure, "figure");

  //add class to figCaption
  addClassToElement(figCaption, "name");

  //add class to back card element
  addClassToElement(cardBackElem, "card-back");

  addClassToElement(playerImage, "player");

  //add src attribute and appropriate value to img element - back of card
  addSrcToImageElem(cardBackImg, cardBackImgPath);

  //add src attribute and appropriate value to img element - front of card
  addSrcToImageElem(playerImage, cardItem.imagePath);

  //add src attribute and appropriate value to flag img element - front of card
  if (cardItem.id == 4) {
    addSrcToImageElem(team, "/images/ChinaFlag.png");
  } else {
    addSrcToImageElem(team, "/images/yankee.png");
  }

  //assign class to back image element of back of card
  addClassToElement(cardBackImg, "card-img");

  //assign class to front image element of front of card
  addClassToElement(cardFrontImg, "card-img");

  //assign class to front image element of front of card
  addClassToElement(team, "team-logo");

  //add child elements to figure
  addChildElement(cardFrontFigure, playerImage);
  addChildElement(cardFrontFigure, team);
  addChildElement(cardFrontFigure, figCaption);

  //add child element to cardFrontImg
  addChildElement(cardFrontImg, cardFrontFigure);

  //add front image element as child element to front card element
  addChildElement(cardFrontElem, cardFrontImg);

  //add back image element as child element to back card element
  addChildElement(cardBackElem, cardBackImg);

  //add front card element as child element to inner card element
  addChildElement(cardInnerElem, cardFrontElem);

  //add back card element as child element to inner card element
  addChildElement(cardInnerElem, cardBackElem);

  //add inner card element as child element to card element
  addChildElement(cardElem, cardInnerElem);

  //add card element as child element to appropriate grid cell
  addCardToGridCell(cardElem);

  initializeCardPositions(cardElem);

  attachClickEventHandlerToCard(cardElem);

  figCaption.innerHTML = captions[cardItem.id - 1];
}

function attachClickEventHandlerToCard(card) {
  card.addEventListener("click", () => chooseCard(card));
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function createElement(elemType) {
  return document.createElement(elemType);
}
function addClassToElement(elem, className) {
  elem.classList.add(className);
}
function addIdToElement(elem, id) {
  elem.id = id;
}
function addSrcToImageElem(imgElem, src) {
  imgElem.src = src;
}
function addChildElement(parentElem, childElem) {
  parentElem.appendChild(childElem);
}

function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);

  const cardPosElem = document.querySelector(cardPositionClassName);

  addChildElement(cardPosElem, card);
}

function mapCardIdToGridCell(card) {
  if (card.id == 1) {
    return ".card-pos-a";
  } else if (card.id == 2) {
    return ".card-pos-b";
  } else if (card.id == 3) {
    return ".card-pos-c";
  } else if (card.id == 4) {
    return ".card-pos-d";
  }
}
let deg = 0;

setInterval(function () {
  deg < 360 ? deg++ : (deg = 0);
}, 15);
