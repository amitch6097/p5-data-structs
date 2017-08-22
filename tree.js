function Tree(x, y, size, node){
  var that = this;

  this.x = x;
  this.y = y;
  this.size = size;

  this.node = node;
  this.node.setSizing(this.x, this.y, this.size);
  this.node.getHeight();

  this.show = function(){
    clear()
    background(0);
    this.node.show();
  }

  this.reAlignNodes = function(height){
    var nodeStack = [];
    nodeStack.push(that.node);

    //loop through all nodes and distance them accordingly
    while(nodeStack.length > 0){
      var temp_node = nodeStack.shift()

      if(temp_node.left){
        var dif = (height - temp_node.left.height + 1);
        temp_node.left.setSizing(temp_node.x - (Math.pow(2, dif) * temp_node.size/3 ), temp_node.left.y, temp_node.size);
        nodeStack.push(temp_node.left);
      }

      if(temp_node.right){
        var dif = (height - temp_node.right.height + 1);
        temp_node.right.setSizing(temp_node.x + (Math.pow(2, dif) * temp_node.size/3), temp_node.right.y, temp_node.size);
        nodeStack.push(temp_node.right);
      }
    }
  }

  this.addNode = function(){

    //make new node
    var node = new Node(floor(random(0, 100)));

    that.addBinary(that.node, node);

    //get the current heigh of the tree -- which will be the the height of the last node
    var height = node.getHeight();
    that.reAlignNodes(height);

    //show after changing distance
    that.show();
  }

  this.addNextOpen = function(headNode, nodeToAdd){

    var nodeStack = []
    nodeStack.push(headNode);

    //loop through nodes till we find an open slot
    while(true){
      var tempNode = nodeStack.shift();

      if(tempNode.left === undefined){
        that.addLeft(tempNode, nodeToAdd);
        break;

      } else if (tempNode.right === undefined) {
        that.addRight(tempNode, nodeToAdd);
        break;

      } else {
        nodeStack.push(tempNode.left);
        nodeStack.push(tempNode.right);
      }
    }
  }

  this.addBinary = function(headNode, nodeToAdd){

    var tempNode = headNode;

    while(true){
      if(tempNode.getDigit() > nodeToAdd.getDigit()){
        if(tempNode.left === undefined){
          that.addLeft(tempNode, nodeToAdd);
          break;
        }else{
          // animateLeft(tempNode, nodeToAdd, 0);
          tempNode = tempNode.left;
          continue
        }
      } else {
        if(tempNode.right === undefined){
          that.addRight(tempNode, nodeToAdd);
          break;
        }else{
          // animateRight(tempNode, nodeToAdd, 0);
          tempNode = tempNode.right;
          continue
        }
      }
    }
  }

  this.addLeft = function(parent, child){
    // child.setSizing(parent.x - parent.size, parent.y + parent.size, parent.size)
    parent.left = child;
    child.setParent(parent);
    animateLeft(parent, child, 0);
  }
  this.addRight = function(parent, child){
    // child.setSizing(parent.x + parent.size, parent.y + parent.size, parent.size)
    parent.right = child;
    child.setParent(parent);
    animateRight(parent, child, 0);
  }


  ///TODO animations do not start at the top
  ///to do this we need to draw the one circle, but when done this somehow
  //screws up the location

  function animateLeft (parent, child, i) {
    setTimeout(function () {
      child.setSizing(parent.x - i, parent.y + i, parent.size)
      that.show();
      child.show();
      i+= parent.size/10;
      if (i <= parent.size) {
         animateLeft(parent, child, i);
      }
    }, 100)
  }

  function animateRight (parent, child, i) {
    setTimeout(function () {
      child.setSizing(parent.x + i, parent.y + i, parent.size)
      that.show();
      child.show();
      i+= parent.size/10;
      if (i <= parent.size) {
         animateRight(parent, child, i);
      }
    }, 100)
  }
}

function sFact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

function Node(digit){
  var that = this;

  this.x = undefined;
  this.y = undefined;
  this.parent = undefined;
  this.left = undefined;
  this.right = undefined;
  that.size = undefined;
  this.height = undefined;

  this.digit = digit

  this.getHeight = function(){
    if(that.height !== undefined){
      return that.height;
    }
    var height = 0
    var temp_node = this;
    while(temp_node.parent !== undefined){
      height +=1;
      temp_node = temp_node.parent;
    }
    that.height = height;
    return height;
  }

  this.getDigit = function(){
    return that.digit;
  }

  this.setSizing = function(x, y, size){
    that.x = x;
    that.y = y;
    that.size = size;
  }

  this.setParent = function(node){
    that.parent = node;
  }

  this.show = function(){
    if(that.x === undefined || that.y === undefined){
      return;
    }
    if(this.left !== undefined){
      line(that.x,that.y, this.left.x, this.left.y);
      this.left.show();
    }
    if(this.right !== undefined){
      line(that.x,that.y, this.right.x, this.right.y);
      this.right.show();
    }
    stroke(255)
    ellipse(that.x, that.y, that.size);
    text(that.digit, that.x-textSize()/2, that.y+textSize()/4);
  }
}
