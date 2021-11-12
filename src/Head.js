class Head {
  constructor(el, apple) {
    this.node = document.createElement("div");
    this.node.setAttribute("id", "head");
    el.appendChild(this.node);

    this.boardBackgroundColor = el.style;

    this.apple = apple;
    const possibleValues = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    this.hexString = "#";
    for(let i = 0; i < 6; i++) {
      this.hexString += possibleValues[Math.floor(Math.random() * possibleValues.length)];
    }
    this.boardBackgroundColor.backgroundColor = this.hexString;

    this.body = new Body(el, this);
    this.body.addNode();

    this.currentDirection = "right";
    this.SPEED = 250;

    this.node.style.top = `${(0)}px`;
    this.node.style.left = `${(0)}px`;;

    setTimeout(this.move.bind(this), this.SPEED);
    setTimeout(this.changeBackgroundColor.bind(this), 100);

    this.lockout = false;
  }

  move() {
    const head = this.node;
    const direction = this.currentDirection;

    let topPosition = Number(head.style.top.replace("px", ""));
    let leftPosition = Number(head.style.left.replace("px", ""));

    this.lockout = false;

    if (direction === "right") {
      head.style.left = `${(leftPosition += 50)}px`;
      console.log(head.style.left);
    }

    //when I add this, the snake can move left
    if (direction === "left") {
      head.style.left = `${(leftPosition -= 50)}px`;
    }

    if (direction === "up") {
      head.style.top = `${(topPosition -= 50)}px`;
    }

    if (direction === "down") {
      head.style.top = `${(topPosition += 50)}px`;
    }
    for (let i = 0; i < this.body.bodyArray.length - 1; i++) {
      if (
        topPosition ===
          Number(this.body.bodyArray[i].node.style.top.replace("px", "")) &&
        leftPosition ===
          Number(this.body.bodyArray[i].node.style.left.replace("px", ""))
      ) {
        alert("You died!");
        return;
      }
    }

    // console.log("SNEK CORDS "+this.node.style.top+" "+this.node.style.left)
    // console.log("APPLE CORDS "+this.apple.node.style.top+" "+this.apple.node.style.left)

    if (
      this.node.style.top === this.apple.node.style.top &&
      this.node.style.left === this.apple.node.style.left
    ) {
      //add something to track apples
      this.body.addNode();
      this.apple.move(this.findRandomEmptySquare()); //passed list of eligible squares for moving
      // console.log("sneklength is"+this.body.bodyArray.length);
    }

    this.body.updateBody();

    //when I comment this out the speed doesn't update
    if (
      topPosition < 700 &&
      topPosition >= 0 &&
      leftPosition < 700 &&
      leftPosition >= 0
    ) {
      setTimeout(this.move.bind(this), this.SPEED);
    } else {
      alert("We believe in you! Close this window to try again!");
      // setTimeout(this.move.bind(this), this.SPEED);
      // location.href = "https://www.youtube.com/watch?v=-ZGlaAxB7nI"
    }
  }
  //find empty squares
  findRandomEmptySquare() {
    //start a map of all the square (use the one in main.js)
    //testing shows that the range is 0-650 for coords, not 0-700
    const boardMap = new Map();
    for (let k = 0; k < 14 * 14; k++) {
        //iterate through boardmap to toggle everything true : eligible for spawning
      //first node is top, second, left
    //given a top coord (y), reverse engineer is divided by 50*14
    //given a left coord (x), reverse engineer is divided by 50
      boardMap[[Math.floor(k / 14) * 50, (k * 50) % 700]] = true;
  }
      //if a square in the array is on the body, toggle false
    //loop through the body to toggle body pieces false
    for(let i = 0; i < this.body.bodyArray.length; i++) {
      boardMap[[Number(this.body.bodyArray[i].node.style.top.replace('px','')), Number(this.body.bodyArray[i].node.style.left.replace('px',''))]] = false;

    }
    // create new array to hold eligible spaces on the board
    // iterate through boardMap and push properties with value "true" to array of eligible spaces
    const emptySpaces = [];
    for(const property in boardMap) {
      if(boardMap[property]) {
        // console.log(property+" "+boardMap[property]);
        emptySpaces.push(property);
      }
    }
    // console.log("empty spaces are: "+emptySpaces);
    //randomly pick an element from the second array and return it
    return emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  }

  changeBackgroundColor() { 
    const possibleValues = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

    let newChar = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    let newHex = this.hexString.split("");
    newHex[1+Math.floor(Math.random()*(this.hexString.length-1))] = newChar;
    console.log("new char: "+newChar+" new: "+newHex+" old: "+this.hexString)
    this.hexString = newHex.join("");
    this.boardBackgroundColor.backgroundColor = this.hexString;
    console.log("hexstring is "+this.hexString);
    setTimeout(this.changeBackgroundColor.bind(this), 200);
  }
}
