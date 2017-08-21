var tree = new Tree(0, 0, 1000);

function setup() {

  createCanvas(1000, 400)
  background(0)
  tree.show();
  var addButton = createButton("Add Node");
  addButton.mousePressed(tree.addNode)

}
