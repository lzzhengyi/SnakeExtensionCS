//array of places you shouldn't teleport to when eaten
//the head knows where it's been, so we can push x/y coords to the body?
//tracks the last x/y of the head (shadow)
//when we reach the apple, we check the positions of the shadows
//we have to track shadows equal to apples eaten->
//each shadow should have a lifespan of some kind, positions behind the apple

//if each body is a single piece
//then we need an array somewhere to track all the body pieces

//one algorithm is to move all body parts
//the other is to delete pieces at the tail and add pieces at the head to represent "moving"

//this is the implementation of the body as individual pieces stored on a separate array
class Body {
    constructor(el, head) {
//apples eaten variable used to array size
      this.head = head; //apples eaten is in here
      this.bodyArray = [];
      this.el = el;

      //add new body coordinates at the beginning of an array
      //remove the stale ones at the end of the array

      //one algorithm:
      //when we add something to the array, iterate backwards from array.length (apples eaten)
      //update the thing at the end with the thing before it and so on
      //then index 0 becomes the new item
      //the final index we maintain = tail value/apples eaten

      //body node constructor

    }
  
    addNode (){
        this.bodyArray.push(new BodyNode(this, this.bodyArray.length));
        //automatically knows coords from head
    }

    updateBody() {
    //loop through our body array and draw all the pieces?
    //different for i = length-1, i < length -1
    //assuming i = length-1 is the latest piece of the body, which we will put in the head's coordinates into
    //assuming i = 0 is the piece we are about to delete

    //i < array.length-1  cases, we should steal the position of the piece after us (i+1)
      for(let i = 0; i < this.bodyArray.length; i++) {
          if (i < this.bodyArray.length-1){

            let topPosition = Number(this.bodyArray[i + 1].node.style.top.replace('px', ''));
            let leftPosition = Number(this.bodyArray[i + 1].node.style.left.replace('px', ''));
        
            this.bodyArray[i].node.style.left = `${(leftPosition)}px`;
            this.bodyArray[i].node.style.top = `${(topPosition)}px`;

              //steal the coords of the one in front of you
            //   this.bodyArray[i].node.style.top = this.bodyArray[i + 1].node.style.top;
            //   this.bodyArray[i].node.style.left = this.bodyArray[i + 1].node.style.left;
              console.log(i+"th node is at "+this.bodyArray[i].node.style.left+" "+this.bodyArray[i].node.style.top);
          } else {
              //take the coords from the head if i = length-1
              let topPosition = Number(this.head.node.style.top.replace('px', ''));
              let leftPosition = Number(this.head.node.style.left.replace('px', ''));
          
              this.bodyArray[i].node.style.left = `${(leftPosition)}px`;
              this.bodyArray[i].node.style.top = `${(topPosition)}px`;

            // this.bodyArray[i].node.style.top = this.head.node.style.top;
            // this.bodyArray[i].node.style.left = this.head.node.style.left;        
          }
          
      }
      
    }
  }

  class BodyNode {
    constructor (body, index){
        this.node = document.createElement('img');
        this.node.setAttribute('id', 'body');
        this.node.setAttribute('src', 'src/assets/MichaelBase.png');
        body.el.appendChild(this.node);
  
        // this.node.setAttribute('src', 'src/assets/apple.jpg');

        //whose position is this?
        this.node.style.top = body.head.node.style.top;
        this.node.style.left = body.head.node.style.left;
    }
  }