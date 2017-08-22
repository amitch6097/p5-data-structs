
function setup() {

  createCanvas(1000, 400)
  background(0)

  var node = new Node(floor(random(0, 100)));
  var tree = new Tree(500, 50, 50, node);
  tree.show();


  var addButton = createButton("Add Node");
  addButton.mousePressed(tree.addNode)

}
