import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

document.addEventListener("DOMContentLoaded", function(){
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById('threejs-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    renderer.setSize(containerWidth, containerHeight);

    container.appendChild(renderer.domElement);

    // bloom setup
    const fxcomposer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    fxcomposer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(containerWidth, containerHeight),
        1.7,
        0.9,
        0.9
    );
    fxcomposer.addPass(bloomPass);
    // end bloom setup

    const loader = new GLTFLoader();

    loader.load('model/ambalageFont.glb', function (gltf) {

        const model = gltf.scene;
        scene.add(model);
        model.position.set(0.25, 0, 0);
        model.scale.set(1, 1, 1);
        window.model = model;

        // camera.position.z = 5;

        // from anim
        gsap.from(model.position, {
            delay: 0.5,
            duration: 0.7,
            ease: "power2.out",
            x: -16,
            invalidateOnRefresh: true
        });
        gsap.from(model.rotation, {
            delay: 0.5,
            duration: 0.7,
            ease: "power2.out",
            y: -Math.PI * 0.25,
            invalidateOnRefresh: true
        });


        // Define a path using a curve
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(.25, 0, 0),
            new THREE.Vector3(0, 7, 1),
            new THREE.Vector3(0, 7, 1),
            new THREE.Vector3(.5, 18, .75),
            new THREE.Vector3(.5, 4, .75),
            new THREE.Vector3(.5, -4, .75),
            new THREE.Vector3(.5, -12, .75),
            new THREE.Vector3(0, -9, 0),
            new THREE.Vector3(-14, 0, 0),
            new THREE.Vector3(2, 0, 0)
        ]);
        
        // Move model along the path based on scroll
        function updateModelPositionOnScroll() {
            if (!model) return;

            const scrollY = window.scrollY;
            const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);

            const pointOnCurve = curve.getPoint(scrollPercent);
            model.position.copy(pointOnCurve);

            if(scrollPercent < 0.35){
                model.rotation.set(0, scrollPercent * -Math.PI * .5, 0);
                // model.rotation.y = Math.PI * .25;
            } else if(scrollPercent < .71){
                model.rotation.set(0, scrollPercent * -Math.PI * 1.9, 0);
                // model.rotation.y = Math.PI * .9;
            } else if(scrollPercent < 1){
                model.rotation.set(0, scrollPercent * -Math.PI * .4, 0); //last Z scrollPercent * -Math.PI * .02
                // model.rotation.y = Math.PI * 1;
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', updateModelPositionOnScroll);
    });

    // FXAA Shader Pass
    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();
    fxaaPass.material.uniforms['resolution'].value.set(1 / (container.clientWidth * pixelRatio), 1 / (container.clientHeight * pixelRatio));
    fxcomposer.addPass(fxaaPass);

    function animate() {
        requestAnimationFrame(animate);

        // fx composere renderer
        fxcomposer.render();
    }

    animate();

    function myFunc(media){
        if(media.matches){
            // document.body.style.background = "red";
            camera.position.z = 10;
        } else{
            // document.body.style.background = "blue";
            camera.position.z = 5;
        }
    }

    var media = window.matchMedia("(max-width: 768px)");

    myFunc(media);

    media.addEventListener("change", function(){
        myFunc(media);
    });

});