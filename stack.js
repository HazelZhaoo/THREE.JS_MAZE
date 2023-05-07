class Stack {
    constructor() {
      this.items = [];
    }
  
    push(element) {
      this.items.push(element);
    }
  
    pop() {
      if (this.items.length == 0) {
        return "Underflow";
      }
      return this.items.pop();
    }
  
    top() {
      return this.items[this.items.length - 1];
    }
  
    empty() {
      return this.items.length == 0;
    }
  }

export {Stack}
