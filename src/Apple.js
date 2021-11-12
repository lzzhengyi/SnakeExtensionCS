class Apple {
  constructor(el) {
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'apple');
    this.node.setAttribute('src', 'src/assets/MichaelBase.png');

    el.appendChild(this.node);

    this.node.style.left = 0; //THIS DOESNT WORK
    this.node.style.top = 0;

    //this.SPEED = 250;

    // setTimeout(this.move.bind(this), this.SPEED);
  }

  move(emptySquare) { // have this an array of squares to randomly pick from
    const dogPictures = ['src/assets/regiscone.png','src/assets/regisleft.png','src/assets/regisright.png'];
    // const dogPictures = ['src/assets/regiscone.png','src/assets/regisright.png'];
    this.node.setAttribute('src', dogPictures[Math.floor(Math.random()*dogPictures.length)]);
    // alert(this.node.src);
    const head = this.node;

    // let topPosition = Number(head.style.top.replace('px', ''));
    // let leftPosition = Number(head.style.left.replace('px', ''));
    

    if (!emptySquare){
      head.style.left = `${(50 * Math.floor(Math.random()*14))}px`;
      head.style.top = `${(50 * Math.floor(Math.random()*14))}px`;
    } else {
      console.log(emptySquare+" will be where the next apple spawns "+Array.isArray(emptySquare));
      const splitArray = emptySquare.split(",");
      console.log(splitArray+" is array now? "+Array.isArray(splitArray));
      head.style.top = `${splitArray[0]}px`;
      head.style.left = `${splitArray[1]}px`;
    }

    // setTimeout(this.move.bind(this), this.SPEED);
  }
}
