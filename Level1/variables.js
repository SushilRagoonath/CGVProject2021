var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer;
var clock = new THREE.Clock();
let lightAmbient = new THREE.AmbientLight(0x2FFFFFF); // soft white light
let particleLight = new THREE.PointLight( 0xff0000, 1, 100 )
var firstcontrols;
var loader = new THREE.GLTFLoader();
var player;
var xWing;
var xWingBox;
var rings;
var ringBoxes;