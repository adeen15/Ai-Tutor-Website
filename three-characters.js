import * as THREE from 'three';

class CharacterManager {
    constructor() {
        this.characters = new Map();
        this.init();
    }

    init() {
        this.containers = document.querySelectorAll('[data-three-char]');
        this.containers.forEach(container => {
            const charType = container.getAttribute('data-three-char');
            this.createCharacter(container, charType);
        });

        window.addEventListener('resize', () => this.onWindowResize());
        this.animate();
    }

    createCharacter(container, type) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(2, 2, 5);
        scene.add(directionalLight);

        const group = new THREE.Group();
        scene.add(group);

        const model = this.buildModel(type);
        group.add(model);

        this.characters.set(container, { scene, camera, renderer, group, type });
    }

    buildModel(type) {
        const group = new THREE.Group();
        let bodyColor, headColor;

        switch (type) {
            case 'dino':
                bodyColor = 0x4caf50;
                headColor = 0x81c784;
                break;
            case 'milo':
                bodyColor = 0x795548;
                headColor = 0x8d6e63;
                break;
            case 'alien':
                bodyColor = 0x9c27b0;
                headColor = 0xba68c8;
                break;
            case 'cat':
                bodyColor = 0xe91e63;
                headColor = 0xf06292;
                break;
            case 'bee':
                bodyColor = 0xffeb3b;
                headColor = 0xfff176;
                break;
            default:
                bodyColor = 0x2196f3;
                headColor = 0x64b5f6;
        }

        // Body
        const bodyGeo = new THREE.SphereGeometry(1, 32, 32);
        const bodyMat = new THREE.MeshPhongMaterial({ color: bodyColor });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(body);

        // Head
        const headGeo = new THREE.SphereGeometry(0.6, 32, 32);
        const headMat = new THREE.MeshPhongMaterial({ color: headColor });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 1.2;
        group.add(head);

        // Eyes
        const eyeGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const eyeMat = new THREE.MeshPhongMaterial({ color: 0x000000 });
        
        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(-0.2, 1.3, 0.5);
        group.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.position.set(0.2, 1.3, 0.5);
        group.add(rightEye);

        return group;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.characters.forEach(char => {
            char.group.rotation.y += 0.01;
            char.group.position.y = Math.sin(Date.now() * 0.002) * 0.1;
            char.renderer.render(char.scene, char.camera);
        });
    }

    onWindowResize() {
        this.characters.forEach((char, container) => {
            char.camera.aspect = container.clientWidth / container.clientHeight;
            char.camera.updateProjectionMatrix();
            char.renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    refreshCharacter(id, type) {
        const container = document.getElementById(id);
        if (!container) return;
        
        const charData = this.characters.get(container);
        if (charData) {
            charData.group.clear();
            charData.group.add(this.buildModel(type));
            charData.type = type;
        }
    }
}

// Initialize when library is ready
document.addEventListener('DOMContentLoaded', () => {
    const manager = new CharacterManager();
    window.refreshThreeCharacters = (id, type) => manager.refreshCharacter(id, type);
});
