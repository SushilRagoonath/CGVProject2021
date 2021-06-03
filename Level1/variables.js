var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer;
var stellarBackground
var clock = new THREE.Clock();
var lightAmbient;
var directionalLight1;
var directionalLight2;
var particleLightl;
var firstcontrols;
var loader = new THREE.GLTFLoader();
var player;
var points;
var timeLeft;
var xWing;
var xWingBox;
const ringNumber =30;
var rings;
var ringBoxes;
var ringsRemoved;
var instancedCollisionBoulder;
var boulderBoxes;
var composer;
var listener; //audio
var audioLoader;
var sound;
var textureLoader;
var snowRoughness;
var snowNormal;
var hp;
var flag;
var asteroidAlbedo;
var floorSpec;
var flagBox;
var checkeredTexture;
var mapCamera, mapWidth = 160, mapHeight = 160; //minimap variables

