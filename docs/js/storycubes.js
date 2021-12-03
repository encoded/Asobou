//---------THIS DOWNLOAD THE FILE-----------//
function download(content, fileName, contentType){
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

//on click press this
//download(JSON.stringify(flowerInfo, null, 2), 'json.txt', 'text/plain');

//--------JSON data for picture-------------//
let flowerInfo = new Object();
$.getJSON("./data/storycubes/json/flower_info.json", function(flowerInfo) {
    console.log(flowerInfo); // this will show the info it in firebug console

	flowerInfo.verbs[0] = "ciccia";

	textVerbs[textVerbs.length -1].innerHTML = flowerInfo.verbs[0];
});

//let's save the file before we unload
window.onbeforeunload = function(){
	flowerInfo.verbs[0] = "Ciccia";
 }

//-------PICTURE DATA--------------//
//this requires: picturedata.js

let pictureDataGroup = new PictureDataGroup();
let path = './images/storycubes/';
let extension = '.png';

pictures.forEach(pic => {
	let fullPath = path + pic + extension;
	pictureDataGroup.addPicture(fullPath);
});

//-------IMAGES LOADING-------------//
const loader = new THREE.TextureLoader(); //for later use
//---------------------------------//

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialiasing: false });
//renderer.setPixelRatio( 2.0); INCREASE QUALITY
renderer.setClearColor( 0x91bad6, 1);
 var container = document.getElementsByClassName('home')[0];
 var w = container.offsetWidth;
 var h = container.offsetHeight;
 renderer.setSize(w, h);
container.appendChild(renderer.domElement);

//---------------CAMERA-----------------//
 
var camera = new THREE.OrthographicCamera( w / - 2, w / 2, h / 2, h / - 2, 1, 1000 );
camera.position.set(0,0,0); // Set position like this
camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this

const light = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( light );
//---------------GROUP-------------------//
//our group of grid element
let group = new THREE.Group();
group.position.x = 0 - w/2; //becuase camera is looking at 0, 0, 0
group.position.y = 0 + h/2;
group.position.z = -1; //apparently if it's zero it is behind the camera

//global group variable
let numRow = 9;
let numColomn = 6;
let size  = 40; //size box grid
let margin = 10; //margin between boxes and frame

//---------------TEXT INFO-------------------//
//text to write in image info cavas
let canvasWrap = document.createElement('div');
let canvas = document.createElement('canvas');

let div = document.createElement('div');

let divVerbs = document.createElement('div');
divVerbs.innerHTML = 'Verbs';
let textVerbs = [];
textVerbs.push(document.createElement('div'));
textVerbs[textVerbs.length-1].innerHTML = "Temp";

textVerbs.push(document.createElement('div'));
textVerbs[textVerbs.length-1].innerText = "Hashiru";

for (let index = 0; index < textVerbs.length; index++) {
	let verb = textVerbs[index];
	verb.contentEditable = true;
	divVerbs.appendChild(verb);
}

div.appendChild(divVerbs);
// div.innerText = 
// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer metus tortor, aliquet at sapien sed, porta consequat leo. Sed elementum congue magna nec malesuada. Vestibulum volutpat ligula accumsan, consequat eros et, accumsan tellus. Nunc eu luctus sem, id blandit dui. Vivamus et lorem vulputate, tristique justo pharetra, consequat felis. Maecenas varius ut nisl quis pellentesque. Suspendisse enim purus, lobortis sed ullamcorper eget, imperdiet ac ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis ac semper est, non vestibulum arcu. In luctus ligula ac elementum venenatis. Duis volutpat sollicitudin pretium. In sed nisi ac turpis dictum dictum. Donec eget faucibus nisi. In felis quam, finibus ac neque tempor, tincidunt dignissim justo. Integer dolor ex, egestas vel orci at, consequat porta tellus. Nam commodo, tortor ac mattis placerat, mi neque bibendum velit, et varius elit nisi sed ex. Nullam ipsum purus, vehicula ut velit vehicula, blandit volutpat elit. Fusce finibus ante enim, sed aliquam velit pretium vel. Ut accumsan arcu turpis, a egestas leo eleifend eget. Duis auctor ultrices nulla eget blandit. Cras congue magna quis felis convallis, non volutpat odio fermentum. Donec fringilla luctus enim, ac accumsan ante. Phasellus tincidunt quis nibh sit amet vehicula. Vivamus ac condimentum turpis. Aliquam erat volutpat. Integer eget facilisis est, aliquet lacinia arcu. Phasellus bibendum arcu lectus, non condimentum urna placerat et. Curabitur in erat vitae enim suscipit tincidunt id ac mauris. Fusce tristique elit et diam hendrerit varius. Donec finibus blandit arcu in vehicula. Ut pretium mauris non quam aliquet, a auctor est commodo. Quisque vel elit ac arcu pretium hendrerit sed id lacus. Maecenas placerat metus eget purus commodo dapibus. Quisque mollis, dolor eget iaculis imperdiet, magna ipsum rutrum orci, ac pellentesque ligula massa et augue. Nullam consectetur dictum mauris ac condimentum. Etiam vehicula lacus turpis, eget vehicula magna interdum ac. Fusce justo lectus, sodales nec orci sed, mattis pulvinar turpis. Maecenas auctor scelerisque nisl in egestas. Etiam sit amet neque id eros mollis suscipit sed eu orci. Nulla eget diam eget orci lobortis egestas nec a enim. Praesent quis euismod sapien. Sed sed felis non mauris rutrum maximus sit amet sed mi. Duis convallis metus mi, ut posuere odio malesuada in. Vestibulum porta imperdiet augue vitae suscipit. Donec at placerat libero. Pellentesque sollicitudin justo imperdiet lorem consequat interdum. Donec nisl nisl, lacinia in lectus egestas, iaculis consectetur enim. Maecenas facilisis leo nec sem porta, ut viverra felis placerat.';
// div.contentEditable = true;

canvasWrap.appendChild(canvas);
canvasWrap.appendChild(div);

container.appendChild(canvasWrap);

let textureText = new THREE.Texture(canvas);

function changeCanvas() {
	let ctx = canvas.getContext('2d');
    ctx.font = '20pt Arial';
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(div.textContent, canvas.width / 2, canvas.height / 2);
}

div.style.position = "absolute";
div.style.left = 0+'px';
div.style.top = 0+'px';
div.style.backgroundColor = 'rgb(255, 255, 255)';
div.setAttribute('word-wrap', 'break-word');
div.style.overflowY = 'scroll';

//div.style.display = 'none';

//canvas.style.display = 'none'; //so that we hide the actual HTML canvas. Which gets inserted after the THREEJS canvas
//---------------IMAGE INFO-------------------//
//image info
let boxLength = (size+margin)*(numColomn+1);
let boxHeight = (size+margin)*(numRow+1);
let boxGeometry = new THREE.BoxGeometry( boxLength, boxHeight);
//boxGeometry.translate(0, 0); //we translate the geometry so that the reference point is TOP-LEFT instead of centre.
let boxMaterial = new THREE.MeshBasicMaterial( {
			map: textureText,
			transparent: false, //we need this to see the texture
			color: 0xffddff 
			//side: THREE.DoubleSide
		});
let imageInfoBox = new THREE.Mesh(boxGeometry, boxMaterial);

imageInfoBox.position.x = group.position.x + boxLength + boxLength/2; //considering that position is relative to the center of the box
imageInfoBox.position.y = group.position.y - boxHeight/2;
imageInfoBox.position.z = -2;

canvas.width = boxLength;
canvas.height = boxHeight; 

div.style.minHeight = boxHeight + 'px';
div.style.minWidth = boxLength + 'px';
div.style.left = boxLength+'px';
//---------------ADDING ELEMENT TO SCENE-------------------//
scene.add(group);
scene.add(imageInfoBox);
//-------------RoundedRectShape---------------//
// Rounded rectangle
const roundedRectShape = new THREE.Shape();

( function roundedRect( ctx, x, y, width, height, radius ) {

	ctx.moveTo( x, y + radius );
	ctx.lineTo( x, y + height - radius );
	ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
	ctx.lineTo( x + width - radius, y + height );
	ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
	ctx.lineTo( x + width, y + radius );
	ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
	ctx.lineTo( x + radius, y );
	ctx.quadraticCurveTo( x, y, x, y + radius );

} )( roundedRectShape, 0, 0, size, size, size/4 );

//--------------Drawing grid------------------------//
let DrawGrid = function()
{
	//let's draw each shape
	for (let row = 0; row < numRow; row++) {

		let y = -(row+1) * (size + margin);

		for (let col = 0; col < numColomn; col++) {
			// flat shape
			let x = (col+1) * (size + margin);

			//texture
			let texture = loader.load(pictureDataGroup.getPictureArray[row*numColomn+col].resourceUrl);

			//let geometry = new THREE.ShapeGeometry( roundedRectShape );
			let geometry = new THREE.PlaneGeometry( size, size );
			let material = new THREE.MeshBasicMaterial( {
				map: texture, 
				transparent: false, //we need this to see the texture
				color: 0xffff00, 
				//side: THREE.DoubleSide
			});

			let mesh = new THREE.Mesh( geometry, material);
			mesh.position.set( x, y);
			group.add( mesh );
		}
	}
}

DrawGrid();

//========================EVENT==================================//

//Resize window
var onWindowResize = function()
{
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	camera.aspect = container.offsetWidth/container.offsetHeight;
	camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);

//========================CUSTOM FUNCTION=============================//


//========================MAIN PIPELINE=============================//

//Game logic
var update = function()
{
	changeCanvas();
	textureText.needsUpdate = true;
}

//Draw scene
var render = function()
{
	renderer.render(scene, camera);
}

//Run game loop (update, render, repeat)
var GameLoop = function()
{
	requestAnimationFrame(GameLoop);

	update();
	render();

}

GameLoop();
