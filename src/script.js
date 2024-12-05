import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


/**
 * Texturas: Configuración correcta
 */
const textures = [];
const imageSources = ['Portada.jpg', 'EstoNoTe.jpg', 'Pastel.jpg', 'Paola.jpg', 'Animal.png'];

// Cargar imágenes y texturas
imageSources.forEach((src, index) => {
    const image = new Image();
    const texture = new THREE.Texture();
    textures.push(texture);

    image.onload = () => {
        texture.image = image;
        texture.needsUpdate = true; // Marcar la textura como lista
    };

    image.src = src; // Asignar la fuente de la imagen
});


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Escena
const scene = new THREE.Scene();


// Cargar el archivo MatCap
const textureLoader = new THREE.TextureLoader();
const matcapTexture1 = textureLoader.load('/textures/matcaps/3.png');
const matcapTexture2 = textureLoader.load('/textures/matcaps/5.png');
const matcapTexture3 = textureLoader.load('/textures/matcaps/Metal2.png');
const matcapTexture4 = textureLoader.load('/textures/matcaps/Metal3.png');

// Cargar modelo GLTF
let PetalosGrandes;
const gltfLoader = new GLTFLoader();
gltfLoader.load('/models/PetalosGrandes.gltf', (gltf) => {
    PetalosGrandes = gltf.scene;
    PetalosGrandes.scale.set(0.001, 0.001, 0.001);
    PetalosGrandes.position.set(0.1, -0.2, 0.2);
    PetalosGrandes.rotation.set(0.3, Math.PI / 10, 0);
    scene.add(PetalosGrandes);
    console.log(PetalosGrandes.traverse)
    const matcapMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture1, // Asignar la textura MatCap
        color: new THREE.Color (0x6A19D3)
    })
    
    PetalosGrandes.traverse(
        (child) => {
            if (child instanceof THREE.Mesh){
                child.material = matcapMaterial
            }
        }
        )
        
});

let PetalosChicos;
gltfLoader.load('/models/PetalosChicos.gltf', (gltf) => {
    PetalosChicos = gltf.scene;
    PetalosChicos.scale.set(0.001, 0.001, 0.001);
    PetalosChicos.position.set(0.1, -0.2, 0.2);
    PetalosChicos.rotation.set(0.3, Math.PI / 10, 0);
    scene.add(PetalosChicos);
    console.log(PetalosChicos.traverse)
    const matcapMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture1, // Asignar la textura MatCap
        transparent: true,
        color: new THREE.Color (0xA63EEB)
    })
    
    PetalosChicos.traverse(
        (child) => {
            if (child instanceof THREE.Mesh){
                child.material = matcapMaterial
            }
        }
        )
        
});

let CentroFlor;
gltfLoader.load('/models/CentroFlor.gltf', (gltf) => {
    CentroFlor = gltf.scene;
    CentroFlor.scale.set(0.001, 0.001, 0.001);
    CentroFlor.position.set(0.1, -0.2, 0.2);
    CentroFlor.rotation.set(0.3, Math.PI / 10, 0);
    scene.add(CentroFlor);
    console.log(CentroFlor.traverse)
    const matcapMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture1, // Asignar la textura MatCap
        color: new THREE.Color (0xFFB258)
    })
    
    CentroFlor.traverse(
        (child) => {
            if (child instanceof THREE.Mesh){
                child.material = matcapMaterial
            }
        }
        )
        
});

let Pelos;
gltfLoader.load('/models/Pelo.gltf', (gltf) => {
    Pelos = gltf.scene;
    Pelos.scale.set(0.001, 0.001, 0.001);
    Pelos.position.set(0.1, -0.2, 0.2);
    Pelos.rotation.set(0.3, Math.PI / 10, 0);
    scene.add(Pelos);
    console.log(Pelos.traverse)
    const matcapMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture1, // Asignar la textura MatCap
        fog: false,
    
        color: new THREE.Color (0xA399F5)
    })
    
    Pelos.traverse(
        (child) => {
            if (child instanceof THREE.Mesh){
                child.material = matcapMaterial
            }
        }
        )
        
});



/**
 * Planos
 */
const createPlane = (geometry, materialProps, position, rotation) => {
    const material = new THREE.MeshBasicMaterial(materialProps);
    const mesh = new THREE.Mesh(geometry, material);
   // this.instance.toneMappingExposure = 1.75
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    scene.add(mesh);
    return mesh;
};

const planos = [
    createPlane(
        new THREE.PlaneGeometry(0.1 * 1.4, 0.2 * 1.1, 3),
        { map: textures[0], side: THREE.DoubleSide },
        [0.4 - 0.08, 0.09, 0.2],
        [0, -0.3, 0]
    ),
    createPlane(
        new THREE.PlaneGeometry(0.2 * 0.8, 0.1 * 1, 3),
        { map: textures[1], side: THREE.DoubleSide },
        [0.2, 0.099 * 1.9, 0.1],
        [0, 0.02, 0]
    ),
    createPlane(
        new THREE.PlaneGeometry(0.2 * 1.1, 0.1 * 1.3, 3),
        { map: textures[2], side: THREE.DoubleSide },
        [0.1 * 1.2, 0.1 * 1.4, 0.3],
        [0, 0.40, 0]
    ),
    createPlane(
        new THREE.PlaneGeometry(0.2*0.8,  0.1*1,  3),
        { map: textures[4], side: THREE.DoubleSide },
        [-0.08, 0.099 * 1.8, 0.2],
        [0, 1, 0]
    ),
    createPlane(
        new THREE.PlaneGeometry(0.1*1.4, 0.2*1.1 , 3),
        { map: textures[3], side: THREE.DoubleSide },
        [-0.03, 0.099 * 1.4, 0.5],
        [0, 1.2, 0]
    ),
   
];


///CORAZONES////
class Heart {
    constructor(scene, color = 0xF54A9A, scale = 9, position = { x: 2, y: 0, z: 0 }) {
        //Crear la forma del corazón
        const heartShape = new THREE.Shape();
        const x = 0, y = 0;

        heartShape.moveTo(x + 5, y + 5);
        heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
        heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
        heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
        heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
        heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
        heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

        //Crear la geometría y el material
        const geometry = new THREE.ShapeGeometry(heartShape);
        const textureLoader = new THREE.TextureLoader();
        const matcapTextureHeart = textureLoader.load('/textures/matcaps/Metal4.png');
        const matcapMaterialHeart = new THREE.MeshMatcapMaterial({
            matcap: matcapTextureHeart, // Asignar la textura MatCap
            color: new THREE.Color (0xDD5EEB)
        })
 
        //Crear la malla
        this.mesh = new THREE.Mesh(geometry, matcapMaterialHeart);
        this.mesh.rotation.z = Math.PI;
        this.mesh.scale.set(scale, scale, scale);
        this.mesh.position.set(position.x, position.y, position.z);

        //Agregar la malla a la escena
        scene.add(this.mesh);

        this.mesh.traverse(
            (child) => {
                if (child instanceof THREE.ShapeGeometry) {
                    child.material = matcapMaterialHeart;
                }
            }
        );
        

    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    setScale(scale) {
        this.mesh.scale.set(scale, scale, scale);
    }

    setColor(color) {
        this.mesh.material.color.set(color);
    }
}

//Corazones derecha
const heart1 = new Heart(scene, 0xF54A9A, 0.03, { x: 1.5, y: 0.8, z: 0 });
const heart2 = new Heart(scene, 0xF54A9A, 0.01, { x: 2, y: 1.1, z: 0 });
const heart3 = new Heart(scene, 0xF54A9A, 0.06, { x: 3, y: 2.1, z: 0 });
const heart4 = new Heart(scene, 0xF54A9A, 0.01, { x: 3.6, y: 2.2, z: 0 });
const heart5 = new Heart(scene, 0xF54A9A, 0.02, { x: 4.1, y: 2.7, z: 0 });

//Corazones izquierda
const heart6 = new Heart(scene, 0xF54A9A, 0.04, { x: -1.5, y: -0.8, z: 0 });
const heart7 = new Heart(scene, 0xF54A9A, 0.01, { x: -2.9, y: -1.8, z: 0 });
const heart8 = new Heart(scene, 0xF54A9A, 0.08, { x: -4.2, y: -2.3, z: 0 });
const heart9 = new Heart(scene, 0xF54A9A, 0.01, { x: -6.4, y: -4.2, z: 0 });
const heart10 = new Heart(scene, 0xF54A9A, 0.04, { x: -8, y: -5, z: 0 });
const heart11 = new Heart(scene, 0xF54A9A, 0.01, { x: -11.2, y: -6.7, z: 0 });
const heart12 = new Heart(scene, 0xF54A9A, 0.07, { x: -12.2, y: -7.2, z: 0 });



//**Hacer que los planos se muevan */
// Crear el raycaster y vector del mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Crear un objeto para almacenar las posiciones originales de los planos
const originalPositions = {};

// Añadir evento para detectar el movimiento del mouse
window.addEventListener('mousemove', (event) => {
    // Convertir las coordenadas del mouse al rango [-1, 1]
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// Crear un sistema de partículas
const particleCount = 200; // Número de partículas
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3); // Posiciones de las partículas

// Inicializar posiciones de las partículas
for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = 0; // x
    positions[i * 3 + 1] = 0; // y
    positions[i * 3 + 2] = 0; // z
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//const particleTexture = new THREE.TextureLoader().load('/textures/Luna.png');
// Material de las partículas
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Color dorado (brillos)
    size: 0.1, // Tamaño de las partículas
    sizeAttenuation: true // Ajustar tamaño según la distancia de la cámara
});

// Crear el objeto de partículas
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// Animar las partículas para seguir al mouse
function animateParticles() {
    const particlePositions = particleGeometry.attributes.position.array;

    for (let i = particleCount - 1; i > 0; i--) {
        // Mover cada partícula hacia la posición de la anterior
        particlePositions[i * 2] = particlePositions[(i - 1) * 3];
        particlePositions[i * 5 + 2] = particlePositions[(i - 1) * 3 + 1];
        particlePositions[i * 5 + 2] = particlePositions[(i - 1) * 3 + 2];
    }

    // La primera partícula sigue al mouse
    particlePositions[0] = mouse.x * 2; // Ajustar escala para que cubra toda la pantalla
    particlePositions[1] = mouse.y * 2;
    particlePositions[2] = 0; // Mantenerlas planas en z

    particleGeometry.attributes.position.needsUpdate = true; // Actualizar las posiciones
}

////////////////////////////////

    // Actualizar el raycaster basado en la posición del mouse y la cámara
    raycaster.setFromCamera(mouse, camera);

    // Detectar intersecciones con los planos
    const intersects = raycaster.intersectObjects(planos);
      

    // Si hay intersecciones, aplica el efecto al primer plano intersectado
    if (intersects.length > 0) {
        const intersectedPlane = intersects[0].object;

        // Si no se ha guardado la posición original, guardarla
        if (!originalPositions[intersectedPlane.uuid]) {
            originalPositions[intersectedPlane.uuid] = intersectedPlane.position.y;
        }

        const originalY = originalPositions[intersectedPlane.uuid];

        // Mover el plano hacia arriba con GSAP durante 0.5 segundos
        gsap.to(intersectedPlane.position, {
            y: originalY + 0.02, // Mueve el plano 0.02 unidades hacia arriba
            duration: 0.5,        // La animación dura 0.5 segundos
            onComplete: () => {
                // Regresa el plano a su posición original después de 0.5 segundos
                gsap.to(intersectedPlane.position, {
                    y: originalY,       // Regresa a la posición original
                    duration: 0.5       // La animación de vuelta también dura 0.5 segundos
                });
            }
        });
    }
});


/**
 * Luces
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

/**
 * Cámara
 */
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100);
camera.position.set(2, 2, 5);
scene.add(camera);
let previousMouseX = 0;
let previousMouseY = 0;


// Crear el sistema de partículas UNA VEZ
const particleCount = 200;
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
    color: 0xffd700,
    size: 0.1,
    transparent: true,
    opacity: 0.8,
});

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// Actualizar las partículas
function animateParticles() {
    const particlePositions = particleGeometry.attributes.position.array;

    for (let i = particleCount - 1; i > 0; i--) {
        particlePositions[i * 2] = particlePositions[(i - 1) * 3];
        particlePositions[i * 3 + 1] = particlePositions[(i - 1) * 3 + 1];
        particlePositions[i * 3 + 2] = particlePositions[(i - 1) * 3 + 2];
    }

    particlePositions[0] = mouse.x * 2;
    particlePositions[1] = mouse.y * 2;
    particlePositions[2] = 0;

    particleGeometry.attributes.position.needsUpdate = true;
}



//Para que la cámara se mueva con el mouse
window.addEventListener('mousemove', (event) => {
    // Calculamos la diferencia del movimiento
    const deltaX = event.clientX - previousMouseX;
    const deltaY = event.clientY - previousMouseY;

    // Ajustamos la cámara en función del movimiento del mouse
    camera.position.x -= deltaX * 0.0001;  // Multiplicamos por un factor para hacer el movimiento más sutil
    camera.position.y += deltaY * 0.0001;  // De igual forma, multiplicamos por un factor

    // Guardamos la posición actual del mouse para el próximo movimiento
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

// Controles
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true *1000;
//controls.enableZoom = false; // Desactiva el zoom con la rueda del mouse
controls.enableRotate = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x000000, 0); // Fondo transparente

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Rotación
 */
let rotationAngle = 0;
function rotateOnScroll(event) {
    const scrollSpeed = 0.001; // Ajusta según lo necesario
    rotationAngle += event.deltaY * scrollSpeed;

    if (PetalosGrandes) PetalosGrandes.rotation.y = rotationAngle;
    planos.forEach((plano, i) => (plano.rotation.y = rotationAngle - (i + 1) * 0.9));
    
    if (PetalosChicos) PetalosChicos.rotation.y = rotationAngle;
    planos.forEach((plano, i) => (plano.rotation.y = rotationAngle - (i + 1) * 0.9));

    if (CentroFlor) CentroFlor.rotation.y = rotationAngle;
    planos.forEach((plano, i) => (plano.rotation.y = rotationAngle - (i + 1) * 0.9));

    if (Pelos) Pelos.rotation.y = rotationAngle;
    planos.forEach((plano, i) => (plano.rotation.y = rotationAngle - (i + 1) * 0.9));
}

window.addEventListener('wheel', rotateOnScroll);


window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    

/**
 * Animación
 */
function animate() {
    controls.update();
    animateParticles(); // Mu
    renderer.render(scene, camera);
  
    requestAnimationFrame(animate);
}
animate();
