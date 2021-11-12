document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const board = document.querySelector('#board');

  const tasty = new Apple(board);
  const head = new Head(board, tasty);

  tasty.move();

  board.setAttribute("style","100, 100, 200")

  body.addEventListener('keydown', (e) => {
    console.log(e.code); //so we know what's pressed
    if (e.code === 'ArrowLeft') {
      console.log('pressed left'); 
      if(head.currentDirection !== 'right' && !head.lockout) {
        head.currentDirection = 'left';
        head.lockout = true;
      }
    }
    if (e.code === 'ArrowRight') {
      console.log('pressed right');
      if (head.currentDirection !== 'left' && !head.lockout){
        head.currentDirection = 'right';
        head.lockout = true;
      }
    }
    if (e.code === 'ArrowUp') {
      console.log('pressed up');
      if (head.currentDirection !== 'down' && !head.lockout){
        head.currentDirection = 'up';  
        head.lockout = true;
      }
    }
    if (e.code === 'ArrowDown') {
      console.log('pressed down');
      //stop it from going backwards
      if (head.currentDirection !== 'up' && !head.lockout){
        head.currentDirection = 'down';
        head.lockout = true;
      }
    }
  });
});
