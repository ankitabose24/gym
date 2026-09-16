/* =====================================================
   FUERZA VIVA
   JAVASCRIPT + THREE.JS + PHYSICS
===================================================== */


/* =====================================================
   MODULE IMPORTS (three.js + cannon-es physics)
===================================================== */

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js";

import * as CANNON from
    "https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/+esm";


/* =====================================================
   GSAP
===================================================== */

gsap.registerPlugin(ScrollTrigger);


/* =====================================================
   HEADER
===================================================== */

const header =
    document.getElementById("header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });


/* =====================================================
   SCROLL PROGRESS
===================================================== */

const progressBar =
    document.getElementById("progressBar");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const progress =
        (scrollTop / pageHeight) * 100;

    progressBar.style.width =
        progress + "%";

});


/* =====================================================
   HERO ANIMATION
===================================================== */

gsap.from(".eyebrow", {

    opacity: 0,

    y: 30,

    duration: 0.8,

    delay: 0.2

});


gsap.from(".hero h1", {

    opacity: 0,

    y: 60,

    duration: 1,

    delay: 0.35,

    ease: "power3.out"

});


gsap.from(".hero-description", {

    opacity: 0,

    y: 30,

    duration: 0.8,

    delay: 0.7

});


gsap.from(".hero-buttons", {

    opacity: 0,

    y: 30,

    duration: 0.8,

    delay: 0.85

});


gsap.from(".hero-stats .stat", {

    opacity: 0,

    y: 25,

    duration: 0.6,

    delay: 1,

    stagger: 0.15

});


/* =====================================================
   COUNTERS
===================================================== */

document
    .querySelectorAll("[data-count]")
    .forEach(counter => {

        const target =
            Number(counter.dataset.count);


        ScrollTrigger.create({

            trigger: counter,

            start: "top 90%",

            once: true,

            onEnter: () => {

                gsap.to(counter, {

                    innerText: target,

                    duration: 1.5,

                    snap: {
                        innerText: 1
                    },

                    ease: "power2.out"

                });

            }

        });

    });


/* =====================================================
   SCROLL ANIMATIONS
===================================================== */

gsap.utils
    .toArray(".section")
    .forEach(section => {

        gsap.from(
            section.querySelectorAll(
                ".section-heading, .about-content, .program-card, .trainer-card, .plan"
            ),
            {

                scrollTrigger: {

                    trigger: section,

                    start: "top 80%"

                },

                opacity: 0,

                y: 35,

                duration: 0.7,

                stagger: 0.08,

                ease: "power2.out"

            }
        );

    });


/* =====================================================
   MEMBERSHIP SWITCH
===================================================== */

const billingSwitch =
    document.getElementById("billingSwitch");

const monthlyLabel =
    document.getElementById("monthlyLabel");

const annualLabel =
    document.getElementById("annualLabel");

const prices =
    document.querySelectorAll(".price");


let annual =
    false;


billingSwitch.addEventListener("click", () => {

    annual = !annual;


    billingSwitch.classList.toggle(
        "on",
        annual
    );


    monthlyLabel.classList.toggle(
        "active",
        !annual
    );


    annualLabel.classList.toggle(
        "active",
        annual
    );


    prices.forEach(price => {

        if (annual) {

            price.innerText =
                price.dataset.annual;

        } else {

            price.innerText =
                price.dataset.monthly;

        }

    });

});


/* =====================================================
   SCHEDULE FILTER
===================================================== */

const filters =
    document.querySelectorAll(".filter");

const scheduleRows =
    document.querySelectorAll(".schedule-row");


filters.forEach(filter => {

    filter.addEventListener("click", () => {


        filters.forEach(button => {

            button.classList.remove("active");

        });


        filter.classList.add("active");


        const selected =
            filter.dataset.filter;


        scheduleRows.forEach(row => {

            if (
                selected === "all" ||
                row.dataset.type === selected
            ) {

                row.classList.remove("hidden");

            } else {

                row.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   TESTIMONIAL SLIDER
===================================================== */

const testimonials = [

    {

        text:
            '"FUERZA VIVA is the first gym where I actually enjoy training."',

        author:
            "— RITIKA S., MEMBER"

    },

    {

        text:
            '"The coaches actually care about my technique and progress."',

        author:
            "— ARJUN M., MEMBER"

    },

    {

        text:
            '"I started as a beginner and now strength training is part of my lifestyle."',

        author:
            "— NEHA T., MEMBER"

    }

];


const testimonialText =
    document.getElementById(
        "testimonialText"
    );

const testimonialAuthor =
    document.getElementById(
        "testimonialAuthor"
    );

const testimonialDots =
    document.getElementById(
        "testimonialDots"
    );


let testimonialIndex = 0;


/* CREATE DOTS */

testimonials.forEach(
    (_, index) => {

        const dot =
            document.createElement("span");

        dot.className =
            "testimonial-dot";


        if (index === 0) {

            dot.classList.add("active");

        }


        dot.addEventListener(
            "click",
            () => {

                testimonialIndex =
                    index;

                showTestimonial();

            }
        );


        testimonialDots.appendChild(dot);

    }
);


function showTestimonial() {

    const item =
        testimonials[testimonialIndex];


    gsap.to(
        testimonialText,
        {

            opacity: 0,

            duration: 0.2,

            onComplete: () => {

                testimonialText.innerText =
                    item.text;

                testimonialAuthor.innerText =
                    item.author;


                gsap.to(
                    testimonialText,
                    {

                        opacity: 1,

                        duration: 0.3

                    }
                );

            }

        }
    );


    document
        .querySelectorAll(".testimonial-dot")
        .forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === testimonialIndex
                );

            }
        );

}


/* AUTO SLIDER */

setInterval(() => {

    testimonialIndex =
        (testimonialIndex + 1)
        % testimonials.length;

    showTestimonial();

}, 5000);


/* =====================================================
   FAQ
===================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question.addEventListener(
        "click",
        () => {


            const isOpen =
                item.classList.contains(
                    "active"
                );


            faqItems.forEach(
                faq => {

                    faq.classList.remove(
                        "active"
                    );

                }
            );


            if (!isOpen) {

                item.classList.add(
                    "active"
                );

            }

        }
    );

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

});


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =====================================================
   THREE.JS + CANNON-ES
===================================================== */


/* =====================================================
   CANVAS
===================================================== */

const canvas =
    document.getElementById(
        "physicsCanvas"
    );


/* =====================================================
   RENDERER
===================================================== */

const renderer =
    new THREE.WebGLRenderer({

        canvas: canvas,

        alpha: true,

        antialias: true

    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


/* =====================================================
   SCENE
===================================================== */

const scene =
    new THREE.Scene();


/* =====================================================
   CAMERA
===================================================== */

const camera =
    new THREE.PerspectiveCamera(

        45,

        window.innerWidth /
        window.innerHeight,

        0.1,

        100

    );


camera.position.set(
    0,
    1.5,
    9
);


/* =====================================================
   LIGHTS
===================================================== */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.8
    );


scene.add(
    ambientLight
);


const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );


directionalLight.position.set(
    4,
    7,
    8
);


scene.add(
    directionalLight
);


const orangeLight =
    new THREE.PointLight(
        0xd98a5f,
        8,
        15
    );


orangeLight.position.set(
    -4,
    2,
    4
);


scene.add(
    orangeLight
);


/* =====================================================
   PHYSICS WORLD
===================================================== */

const world =
    new CANNON.World({

        gravity:
            new CANNON.Vec3(
                0,
                -2,
                0
            )

    });


world.allowSleep = true;


/* =====================================================
   FLOOR
===================================================== */

const floorBody =
    new CANNON.Body({

        mass: 0,

        shape:
            new CANNON.Plane()

    });


floorBody.quaternion.setFromEuler(
    -Math.PI / 2,
    0,
    0
);


world.addBody(
    floorBody
);


/* =====================================================
   OBJECTS ARRAY
===================================================== */

const physicsObjects = [];


/* =====================================================
   CREATE DUMBBELL
===================================================== */

function createDumbbell(
    x,
    y,
    z,
    scale = 1
) {


    const group =
        new THREE.Group();


    /* MATERIALS */

    const blackMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x171614,

            roughness: .35,

            metalness: .8

        });


    const metalMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x77716a,

            roughness: .4,

            metalness: .8

        });


    /* HANDLE */

    const handle =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                .12,
                .12,
                1.7,
                16
            ),

            metalMaterial

        );


    handle.rotation.z =
        Math.PI / 2;


    group.add(
        handle
    );


    /* WEIGHTS */

    [-.9, .9].forEach(
        position => {


            const weight =
                new THREE.Mesh(

                    new THREE.CylinderGeometry(
                        .52,
                        .52,
                        .38,
                        12
                    ),

                    blackMaterial

                );


            weight.rotation.z =
                Math.PI / 2;


            weight.position.x =
                position;


            weight.castShadow = true;


            group.add(
                weight
            );

        }
    );


    group.position.set(
        x,
        y,
        z
    );


    group.scale.setScalar(
        scale
    );


    scene.add(
        group
    );


    /* PHYSICS */

    const body =
        new CANNON.Body({

            mass: 1.5,

            shape:
                new CANNON.Box(

                    new CANNON.Vec3(
                        1 * scale,
                        .4 * scale,
                        .4 * scale
                    )

                ),

            position:
                new CANNON.Vec3(
                    x,
                    y,
                    z
                ),

            linearDamping: .5,

            angularDamping: .6

        });


    body.velocity.set(
        (Math.random() - .5) * 1.5,
        0,
        0
    );


    body.angularVelocity.set(
        Math.random(),
        Math.random(),
        Math.random()
    );


    world.addBody(
        body
    );


    physicsObjects.push({

        mesh: group,

        body: body

    });

}


/* =====================================================
   CREATE KETTLEBELL
===================================================== */

function createKettlebell(
    x,
    y,
    z,
    scale = 1
) {


    const group =
        new THREE.Group();


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x25231f,

            roughness: .35,

            metalness: .75

        });


    /* BODY */

    const bodyMesh =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                .75,
                24,
                18
            ),

            material

        );


    bodyMesh.scale.y =
        1.15;


    group.add(
        bodyMesh
    );


    /* HANDLE */

    const handle =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                .5,
                .12,
                12,
                24,
                Math.PI
            ),

            material

        );


    handle.rotation.z =
        Math.PI;


    handle.position.y =
        .65;


    group.add(
        handle
    );


    group.position.set(
        x,
        y,
        z
    );


    group.scale.setScalar(
        scale
    );


    scene.add(
        group
    );


    /* PHYSICS */

    const physicsBody =
        new CANNON.Body({

            mass: 2,

            shape:
                new CANNON.Sphere(
                    .7 * scale
                ),

            position:
                new CANNON.Vec3(
                    x,
                    y,
                    z
                ),

            linearDamping: .55,

            angularDamping: .7

        });


    world.addBody(
        physicsBody
    );


    physicsObjects.push({

        mesh: group,

        body: physicsBody

    });

}


/* =====================================================
   ADD 3D OBJECTS
===================================================== */

createDumbbell(
    -3,
    3,
    -1,
    .7
);


createDumbbell(
    3,
    4,
    -2,
    .5
);


createKettlebell(
    2.5,
    2,
    0,
    .7
);


createKettlebell(
    -2,
    4,
    -2,
    .45
);


/* =====================================================
   PARTICLES
===================================================== */

const particleGeometry =
    new THREE.SphereGeometry(
        .045,
        8,
        8
    );


const particleMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xd98a5f

    });


const particles = [];


for (let i = 0; i < 40; i++) {


    const particle =
        new THREE.Mesh(

            particleGeometry,

            particleMaterial

        );


    particle.position.set(

        (Math.random() - .5) * 12,

        Math.random() * 7 - 1,

        (Math.random() - .5) * 5

    );


    particle.userData.speed =
        .2 + Math.random() * .5;


    scene.add(
        particle
    );


    particles.push(
        particle
    );

}


/* =====================================================
   MOUSE MOVEMENT
===================================================== */

let mouseX = 0;

let mouseY = 0;


window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            (event.clientX /
                window.innerWidth -
                .5);

        mouseY =
            (event.clientY /
                window.innerHeight -
                .5);

    }
);


/* =====================================================
   ANIMATION
===================================================== */

const clock =
    new THREE.Clock();


function animate() {


    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            .033
        );


    /* PHYSICS */

    world.step(
        1 / 60,
        delta,
        3
    );


    /* UPDATE OBJECTS */

    physicsObjects.forEach(
        object => {

            object.mesh.position.copy(
                object.body.position
            );


            object.mesh.quaternion.copy(
                object.body.quaternion
            );

        }
    );


    /* PARTICLES */

    const time =
        performance.now() * .001;


    particles.forEach(
        particle => {

            particle.position.y +=
                Math.sin(
                    time *
                    particle.userData.speed
                ) * .0015;


            particle.rotation.x += .002;

            particle.rotation.y += .002;

        }
    );


    /* CAMERA */

    camera.position.x +=
        (
            mouseX * .7 -
            camera.position.x
        ) * .025;


    camera.position.y +=
        (
            1.5 -
            mouseY * .4 -
            camera.position.y
        ) * .025;


    camera.lookAt(
        0,
        1.3,
        0
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {


        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


    }
);
/* =====================================================
   CONTACT FORM SUBMISSION (HTTP POST -> /api/contact)
===================================================== */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn?.querySelector(".btn-text");
const btnLoader = submitBtn?.querySelector(".btn-loader");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Reset previous state
        formStatus.style.display = "none";
        formStatus.className = "form-status";
        document.querySelectorAll(".field-error").forEach(el => el.textContent = "");

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const programInput = document.getElementById("program");
        const messageInput = document.getElementById("message");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const program = programInput.value;
        const message = messageInput.value.trim();

        // Client-side validation
        let hasError = false;

        if (!name || name.length < 2) {
            document.getElementById("nameError").textContent = "Please enter your full name.";
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            document.getElementById("emailError").textContent = "Please enter a valid email address.";
            hasError = true;
        }

        if (!message || message.length < 5) {
            document.getElementById("messageError").textContent = "Please write a message (at least 5 characters).";
            hasError = true;
        }

        if (hasError) return;

        // Button Loading State
        submitBtn.disabled = true;
        if (btnText) btnText.style.display = "none";
        if (btnLoader) {
            btnLoader.style.display = "inline-flex";
            btnLoader.style.alignItems = "center";
            btnLoader.style.justifyContent = "center";
        }

        try {
            // HTTP POST Request to Express API Endpoint
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, program, message })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                formStatus.innerHTML = `<span>✓</span> <span>${data.message || "Thank you! Your inquiry has been sent."}</span>`;
                formStatus.className = "form-status success";
                formStatus.style.display = "flex";
                contactForm.reset();
            } else {
                const errorMsg = data.details ? data.details.join(" ") : (data.error || "Failed to send message. Please try again.");
                formStatus.innerHTML = `<span>⚠️</span> <span>${errorMsg}</span>`;
                formStatus.className = "form-status error";
                formStatus.style.display = "flex";
            }
        } catch (error) {
            console.error("Submission error:", error);
            formStatus.innerHTML = `<span>⚠️</span> <span>A network error occurred. Please check your connection and try again.</span>`;
            formStatus.className = "form-status error";
            formStatus.style.display = "flex";
        } finally {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = "inline-block";
            if (btnLoader) btnLoader.style.display = "none";
        }
    });
}