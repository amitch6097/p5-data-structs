function Tree(x, y, size){
  var that = this;

  this.x = x;
  this.y = y;
  this.size = size;

  this.node = new Node();
  this.node.setSizing(500, 30, 30);
  this.node.getHeight();


  this.show = function(){
    background(0);
    this.node.show();
  }

  this.addNode = function(){
    var node = new Node();
    var tempNodeStack = []
    tempNodeStack.push(that.node);

    while(true){
      var tempNode = tempNodeStack.shift();

      if(tempNode.left === undefined){
        node.setSizing(tempNode.x - tempNode.size, tempNode.y + tempNode.size, tempNode.size)
        tempNode.left = node;
        node.setParent(tempNode);
        break;

      } else if (tempNode.right === undefined) {
        node.setSizing(tempNode.x + tempNode.size, tempNode.y + tempNode.size, tempNode.size)
        tempNode.right = node;
        node.setParent(tempNode);
        break;

      } else {
        tempNodeStack.push(tempNode.left);
        tempNodeStack.push(tempNode.right);
      }
    }

    var height = node.getHeight();

    var nodeStack = [];
    nodeStack.push(that.node);

    while(nodeStack.length > 0){
      var temp_node = nodeStack.shift()
      console.log(temp_node)

      if(temp_node.left){
        var dif = (height - temp_node.left.height + 1);
        temp_node.left.setSizing(temp_node.x - (Math.pow(2, dif) * temp_node.size/4 ), temp_node.left.y, temp_node.size);
        nodeStack.push(temp_node.left);
      }
      if(temp_node.right){
        var dif = (height - temp_node.right.height + 1);
        temp_node.right.setSizing(temp_node.x + (Math.pow(2, dif) * temp_node.size/4), temp_node.right.y, temp_node.size);
        nodeStack.push(temp_node.right);
      }
    }
    that.show();
  }
}

function sFact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

function Node(x, y){
  var that = this;

  this.x = undefined;
  this.y = undefined;
  this.parent = undefined;
  this.left = undefined;
  this.right = undefined;
  that.size = undefined;
  this.height = undefined;

  // this.digit = random(0, 100);
  this.digit = 2;

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

    ellipse(that.x, that.y, that.size);
    text(that.digit, that.x, that.y);

    if(this.left !== undefined){
      this.left.show();
    }
    if(this.right !== undefined){
      this.right.show();
    }
  }
}
