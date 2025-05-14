gsap.registerPlugin(ScrollTrigger);

// Navigation Animations
gsap.from(".nav-title", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".nav-links li", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.5
});

document.querySelector(".nav-toggle").addEventListener("click", () => {
    const nav = document.querySelector("nav");
    const navLinksContainer = document.querySelector(".nav-links-container");

    // Toggle the nav-open class
    nav.classList.toggle("nav-open");

    // Check if nav is open
    const isOpen = nav.classList.contains("nav-open");

    if (isOpen) {
        // Show nav links with animation
        navLinksContainer.style.display = "block";
        gsap.fromTo(
            navLinksContainer,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
    } else {
        // Hide nav links with animation
        gsap.to(navLinksContainer, {
            y: -50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                navLinksContainer.style.display = "none";
            }
        });
    }
});

// Header Animations
gsap.from(".header-text h3", {
    y: 100,
    opacity: 0,
    scale: 0.9,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.5
});

gsap.from(".header-text span", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 1
});

gsap.from(".header-text sub", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "power3.out",
    delay: 1.5
});

const headerShapes = [".header-one-child-one", ".header-one-child-two", ".header-two-child-one", ".header-two-child-two"];
headerShapes.forEach(shape => {
    gsap.fromTo(shape, 
        { opacity: 0, scale: 0.5 },
        {
            opacity: 0.7,
            scale: 1,
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: ".header-section",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
    gsap.to(shape, {
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-20, 20),
        rotation: gsap.utils.random(-30, 30),
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Intro Section
gsap.from(".intro-text h1", {
    scrollTrigger: {
        trigger: ".intro-text",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    x: -100,
    opacity: 0,
    rotation: -5,
    duration: 1.2,
    ease: "power4.out"
});

gsap.from(".intro-text h2", {
    scrollTrigger: {
        trigger: ".intro-text",
        start: "top 75%",
        toggleActions: "play reverse play reverse"
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".intro-text p", {
    scrollTrigger: {
        trigger: ".intro-text",
        start: "top 70%",
        toggleActions: "play reverse play reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from(".intro-visual img", {
    scrollTrigger: {
        trigger: ".intro-visual",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "back.out(1.7)"
});

// Intro Two Section
gsap.from(".intro-text-two h2", {
    scrollTrigger: {
        trigger: ".intro-text-two",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
});

gsap.utils.toArray(".intro-text-two p").forEach((para, i) => {
    gsap.from(para, {
        scrollTrigger: {
            trigger: para,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        x: i % 2 === 0 ? 100 : -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.2
    });
});

gsap.from(".intro-visual-two img", {
    scrollTrigger: {
        trigger: ".intro-visual-two",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    scale: 0.7,
    opacity: 0,
    rotation: 10,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)"
});

// Project Section Slider
const projectTrack = document.querySelector(".project-track");
const projectCards = document.querySelectorAll(".project-card");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const dotsContainer = document.querySelector(".slider-dots");
let currentIndex = 0;

function createDots() {
    projectCards.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("slider-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll(".slider-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function goToSlide(index) {
    if (index < 0) {
        index = projectCards.length - 1;
    } else if (index >= projectCards.length) {
        index = 0;
    }
    currentIndex = index;
    gsap.to(projectTrack, {
        x: -currentIndex * window.innerWidth,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: updateDots
    });
    // Animate card content
    const currentCard = projectCards[currentIndex];
    gsap.fromTo(
        currentCard.querySelector("h3"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
        currentCard.querySelector("p"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
        currentCard.querySelectorAll(".project-images img"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 0.4 } // Slower stagger for more images
    );
}
prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

// Initialize slider
createDots();
goToSlide(0);

// ScrollTrigger animation for section
gsap.from(".project-section h2", {
    scrollTrigger: {
        trigger: ".project-section",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Skills Section
gsap.from(".skills-section h2", {
    scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.utils.toArray(".skill-item").forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.2
    });
});

// Goals Section
gsap.from(".goals-section h2", {
    scrollTrigger: {
        trigger: ".goals-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.utils.toArray(".goal-item").forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        y: 80,
        opacity: 0,
        rotation: i % 2 === 0 ? 10 : -10,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.2
    });
});

// Footer (Contact) Section
gsap.from("footer h2", {
    scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".contact-form", {
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

gsap.utils.toArray(".contact-form input, .contact-form textarea").forEach(field => {
    gsap.from(field, {
        scrollTrigger: {
            trigger: field,
            start: "top 90%",
            toggleActions: "play reverse play reverse"
        },
        x: gsap.utils.random(-50, 50),
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

gsap.from(".contact-form button", {
    scrollTrigger: {
        trigger: ".contact-form button",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
});

gsap.from(".social-links a", {
    scrollTrigger: {
        trigger: ".social-links",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});