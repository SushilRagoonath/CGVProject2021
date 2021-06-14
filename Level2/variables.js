//holds globals that may need accessing troughout the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer;
var stellarBackground
var clock = new THREE.Clock();
//lighting
var lightAmbient;
var directionalLight1;
var directionalLight2;
var particleLightl;
var firstcontrols;
var loader = new THREE.GLTFLoader();
var player;
var points;
//gameplay models
var xWing;
var xWingBox;
var bullets;
var turretModel;
var turretBox;
//audio
var listener; 
var audioLoader;
var sound;
//textures
var textureLoader;
var snowRoughness;
var snowNormal;
var asteroidAlbedo;
var floorSpec;
var checkeredTexture;
var brickTexture;
var brickRoughness;
var brickNormal;

//gameplay stats
var hp;
var gamePaused;
var timeLeft;

//minimap variables
var mapCamera, mapWidth = 160, mapHeight = 160; 
