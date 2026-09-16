FUERZA VIVA
Industry: Gym / Fitness & Wellness
Objective: A modern, interactive fitness website designed around strength, discipline, and performance, combining a bold gym aesthetic with an immersive 3D physics experience.

Live Demo: https://gym-rose-three.vercel.app/

Technologies Used

HTML5 — semantic structure and website content
CSS3 — responsive layouts, custom styling, animations, gradients, cards, navigation, and mobile breakpoints
JavaScript (ES6+)— navigation, interactive components, membership toggle, schedule filters, FAQ accordion, counters, mobile menu, and user interactions
Three.js — 3D rendering, camera movement, lighting, and interactive gym objects
Cannon-es— real-time physics simulation for 3D objects, gravity, collisions, and movement
GSAP — smooth animations, scroll-based reveals, and interactive motion
Google Fonts— Oswald and Work Sans for a bold modern fitness aesthetic
Vercel — deployment and hosting

Sections

1. Hero— bold FUERZA VIVA introduction with the tagline "BUILD STRENGTH. BUILD DISCIPLINE." and an immersive 3D physics experience
2. About — introduces the FUERZA VIVA training philosophy with the message "TRAIN HARD. TRAIN SMART."
3. Programs — six training programs including Barbell Club, Metcon, Mobility Flow, Boxing, Personal Training, and Small Group Training
4. Trainers — dedicated trainer section featuring Marcus, Priya, Diego, and Sam
5. Membership — three membership options with an interactive monthly/annual pricing toggle
6. Schedule — weekly training schedule with filters for Strength, Cardio, and Mobility
7. Testimonials — member feedback section showcasing the gym experience
8. FAQ — frequently asked questions using an interactive accordion
9. Contact — gym contact information, location, opening hours, and contact details
10. Footer — FUERZA VIVA branding, navigation information, copyright, and developer credit


 Interactive Features

The website includes multiple interactive features:

1. 3D Physics Hero Experience — interactive 3D objects rendered using Three.js and Cannon-es
2. Mouse Camera Parallax — the 3D camera responds to mouse movement
3. Physics-Based Objects — floating dumbbells and kettlebells respond to gravity and physics
4. Responsive Navigation — desktop navigation with a mobile-friendly menu
5. Membership Toggle — switches between monthly and annual membership pricing
6. Schedule Filters — filter training sessions by Strength, Cardio, and Mobility
7. FAQ Accordion — expandable questions and answers
8. Animated Counters — numbers animate when the relevant section enters the viewport
9. Scroll Progress Indicator— visual progress indicator while scrolling through the website
10. Back-to-Top Button — smoothly returns the user to the hero section
11. Responsive Design — optimized for desktop, tablet, and mobile screens

3D Physics Experience

The hero section contains an interactive physics-driven environment created using Three.js and Cannon-es.

The experience includes:

* Real-time 3D rendering
* Physics-based dumbbells and kettlebells
* Gravity simulation
* Object movement and collisions
* Invisible boundary walls
* Interactive camera parallax
* Dynamic lighting
* Smooth animation
* Responsive behavior for different screen sizes

The 3D experience is designed to make the website feel more immersive than a traditional static gym website.

GSAP Animations Used

GSAP is used to provide smooth motion and visual transitions throughout the website.

Animations include:

* Hero text entrance animations
* Section reveal animations
* Scroll-based fade and slide effects
* Animated statistics/counters
* Navigation transitions
* Smooth UI interactions
* 3D scene movement and presentation effects

Website Design

The website follows a modern fitness-oriented visual style with:

* Dark gym-inspired interface
* Bold typography
* High-contrast visual elements
* Strong CTA buttons
* Full-width hero section
* Interactive 3D elements
* Responsive cards and sections
* Smooth scrolling and animations
* Mobile-responsive layout

The overall design focuses on strength, discipline, energy, and performance.

File Description

index.html
Contains the complete website structure and sections.

style.css
Contains the website styling, responsive layouts, animations, colors, typography, and UI components.

script.js
Contains JavaScript functionality, Three.js scene, Cannon-es physics, GSAP animations, navigation, filters, FAQ, counters, and other interactions.

gym-background.jpg
Background image used in the FUERZA VIVA website hero section.

README.md
Project documentation and setup instructions.

 How to Run

You can run the project directly by opening `index.html` in a modern web browser.

Or use a local development server:

```bash
npx serve .
```

You can also use VS Code Live Server:

1. Open the project folder in VS Code.
2. Install the Live Server extension.
3. Right-click `index.html`.
4. Select Open with Live Server.
5. The website will open in your browser.

No build step is required. The project uses CDN-based libraries for Three.js and GSAP.

 Deployment

The website is deployed using Vercel.

Live Website: [FUERZA VIVA — Live Demo](https://gym-rose-three.vercel.app/)

The project can be deployed by connecting the GitHub repository to Vercel. Every new push to the main branch can then be deployed automatically.

GitHub Repository

The project source code is maintained in the GitHub repository:

[FUERZA VIVA — GitHub Repository](https://github.com/ankitabose24/gym)

Future Enhancements

Possible future improvements include:

* Online gym membership registration
* Online class booking system
* Trainer appointment scheduling
* User login and registration
* Payment gateway integration
* Backend database integration
* Member dashboard
* Workout tracking
* BMI and fitness calculator
* AI-powered workout recommendations
* Real-time class availability
* Admin dashboard
* Instagram/social media integration

Credits

Designed & Developed by

ANKITA BOSE

A SuuSri AI

The project was developed as a modern full-stack/web development project focusing on responsive UI design, JavaScript interactions, animation, and 3D physics-based web experiences.

---

### Architecture
`Frontend (Form) → API (/api/contact) → Express Backend → Nodemailer (SMTP) → Company Email`

- **Frontend**: Responsive contact form with client-side validation, error banners, and loading state.
- **API Endpoint**: `POST /api/contact` handling JSON payloads with CORS enabled.
- **Backend Validation**: Strict server-side verification for names, emails, and messages, plus HTML sanitization.
- **Nodemailer & SMTP**: Transports email notifications using Gmail SMTP / secure TLS with an automated test fallback.
- **Vercel Deployment**: Serverless architecture powered by `vercel.json` routing `/api/(.*)` to `api/index.js`.

### Local Setup & Running
```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (.env)
cp  .env
# Edit .env with your SMTP credentials

# 3. Start development server
npm start
```
Server runs at `http://localhost:5000`.

