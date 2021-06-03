//holds all variables we may need troughout the scenes lifetime
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer;
var stellarBackground
var clock = new THREE.Clock();
var spotlight;
var particleLightl;
var firstcontrols;
var loader = new THREE.GLTFLoader();
var player;
var points;
var timeLeft;
var xWing;
var xWingBox;
var turret;
var ground;
var composer;
var listener; //audio
var audioLoader;
var sound;
var textureLoader;
var snowRoughness;
var snowNormal;
var snowBump;
var checkeredTexture;
var brickTexture;
var brickRoughness;
var brickNormal;
