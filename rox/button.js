// button
class Button {
  
    // constructor
    constructor(x, y, col, text) {
      this.x = x;
      this.y = y;
      this.w = 100;
      this.h = 100;
      this.col = col;
      this.text = text
    }
    
    // contains
    contains(x, y) {
      return (x > this.x && x < this.x+this.w && y > this.y && y < this.y+this.h);
    }
    
    // show
    show() {
      fill(this.col);
      noStroke();
      rect(this.x, this.y, this.w, this.h, 10);
      fill(color('hsb(160, 100%, 50%)'));
      text(this.text, this.x+16, this.y+this.h/1.75);
    }
  }