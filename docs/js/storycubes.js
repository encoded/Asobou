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
scene.add( group );

//global group variable
let numRow = 9;
let numColomn = 6;
let size  = 40; //size box grid
let margin = 10; //margin between boxes and frame

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
			mesh.position.set( x, y, -1);
			group.add( mesh );
		}
	}
}

DrawGrid();

//========================CUSTOM FUNCTION =======================//



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
