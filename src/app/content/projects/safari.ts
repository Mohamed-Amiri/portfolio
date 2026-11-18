import { Project } from '../models';

/** Source: github.com/Mohamed-Amiri/Safari README + environment files. */
export const SAFARI: Project = {
  slug: 'safari',
  name: 'Safari',
  alias: 'SafariHub',
  tagline: 'Travel booking platform for small-group trips with live seat availability and an admin back office.',
  summary:
    'Users explore trips with search and filters, book seats, save favourites and leave reviews; admins manage trips, users and platform statistics from a dedicated dashboard. Spring Boot REST API with MySQL, JWT and Swagger docs; Angular 18 SPA with lazy-loaded routes.',
  period: '2025 – 2026',
  liveUrl: 'https://safari-chi-pearl.vercel.app/',
  repoUrl: 'https://github.com/Mohamed-Amiri/Safari',
  stack: ['Angular 18', 'TypeScript 5.5', 'SCSS', 'RxJS', 'Java 17', 'Spring Boot 3.5', 'MySQL', 'JWT', 'MapStruct', 'Swagger', 'Docker', 'Vercel', 'Azure App Service'],

  poster: {
    src: 'images/safari-home.png',
    srcSmall: 'images/safari-home-640.png',
    alt: 'Voyage (Safari) home page: trip search over a desert photo',
    width: 1280,
    height: 800,
  },

  screenshots: [
    {
      src: 'images/safari-home.png',
      srcSmall: 'images/safari-home-640.png',
      alt: 'Safari home page with destination, trip style and budget search',
      caption: 'Explore trips: destination, trip style and budget filters.',
      width: 1280,
      height: 800,
    },
    // Idea: add screenshots of trip detail with booking panel, my bookings, saved trips, admin dashboard, trip editor.
  ],

  architecture: [
    { name: 'Client', detail: 'Angular 18 SPA ("Voyage") — standalone components, routes lazy-loaded with loadComponent, organised as core / features / layout / shared. Deployed on Vercel.' },
    { name: 'API', detail: 'Spring Boot 3.5 REST API under /api/v1 with a common response envelope { success, message, data, errors, timestamp }. Stateless JWT (jjwt 0.12), BCrypt, roles USER / ADMIN. Deployed on Azure App Service (France Central).' },
    { name: 'Domain', detail: 'Controller → Service (interface + impl) → Repository. Entities, DTOs and MapStruct mappers kept separate; GlobalExceptionHandler produces the standard error envelope.' },
    { name: 'Data', detail: 'MySQL 8 with Hibernate ddl-auto=update; a DataSeeder inserts a default admin and sample trips on first boot.' },
    { name: 'Ops', detail: 'Dockerfile for the API, Spring Actuator health endpoint, springdoc-openapi Swagger UI, backend unit tests on H2.' },
  ],

  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      paragraphs: [
        'Safari (SafariHub) is a full-stack travel booking application: a Spring Boot REST API serving an Angular SPA branded "Voyage". Users browse trips, book reservations, leave reviews and save favourites; admins manage trips and users from a dedicated dashboard.',
      ],
    },
    {
      id: 'problem',
      heading: 'Problem',
      paragraphs: [
        'Booking seats on small-group trips means capacity is finite and shared: two users must not be able to reserve the same last seat, filters have to stay fast as the catalogue grows, and an administrator needs a safe place to manage inventory and users without touching the database by hand.',
      ],
    },
    {
      id: 'solution',
      heading: 'Solution',
      paragraphs: [
        'A versioned REST API that enforces seat counts server-side on every reservation, with search, filtering and pagination handled in the back end; a stateless JWT session re-validated on reload through /auth/me; and an admin area with its own layout shell, guarded routes and endpoints for trip CRUD, user management and platform stats.',
      ],
    },
    {
      id: 'features',
      heading: 'Main features',
      bullets: [
        'Register / login with JWT; session persisted and re-validated on reload via /auth/me.',
        'Explore trips with keyword search and filters (destination, country, category, price range) plus pagination.',
        'Trip detail page with availability, reviews and a booking panel.',
        'Book and cancel reservations — seat counts enforced server-side.',
        'Save / unsave favourite trips (heart state hydrated on boot).',
        'Write, edit and delete reviews with star rating.',
        'Account page: update profile, change password.',
        'Admin: dashboard with platform stats (users, trips, reservations, reviews, favourites); full trip CRUD with seat and pricing management; user list, promote to admin, delete.',
      ],
    },
    {
      id: 'architecture',
      heading: 'Architecture',
      paragraphs: [
        'The back end is layered — controller → service (interface + implementation) → Spring Data JPA repository — with entity / DTO / mapper separation via MapStruct, a security package (JWT filter, UserDetailsService, method-level @PreAuthorize) and a GlobalExceptionHandler producing the standard envelope. Public endpoints are limited to registration, login, trip reads and trip reviews; everything else requires a Bearer token.',
        'The front end is organised as core (API access, auth, guards, interceptors, domain services), features (explore, trip detail, bookings, saved, account, auth, admin), layout (public and admin shells) and shared/ui (reusable components, pipes, directives). Routes are lazy-loaded.',
      ],
    },
    {
      id: 'technologies',
      heading: 'Technologies',
      bullets: [
        'Back end: Java 17, Spring Boot 3.5 (Web, Data JPA, Security, Validation, Actuator), MySQL 8, jjwt 0.12, BCrypt, MapStruct 1.6, Lombok, springdoc-openapi, Maven.',
        'Front end: Angular 18, TypeScript 5.5, SCSS, RxJS, Angular CLI 18.',
        'Configuration via environment variables: JWT_SECRET, JWT_EXPIRATION_MS, CORS_ALLOWED_ORIGINS, ADMIN_EMAIL / ADMIN_PASSWORD.',
        'Testing: backend unit tests on an H2 in-memory database; frontend unit tests.',
      ],
    },
    {
      id: 'challenges',
      heading: 'Technical challenges',
      bullets: [
        'Seat integrity: enforcing remaining-seat counts in the service layer so concurrent bookings cannot oversell a trip.',
        'Consistent API contract: a single response envelope and error shape across all endpoints, so the Angular layer can handle success and failure uniformly.',
        'Session restoration: keeping the user signed in across reloads by re-validating the stored JWT against /auth/me and hydrating favourites on boot.',
      ],
    },
    {
      id: 'deployment',
      heading: 'Deployment',
      bullets: [
        'Front end: Vercel (safari-chi-pearl.vercel.app).',
        'Back end: Azure App Service, France Central region; Dockerfile available for container deployment; Actuator health endpoint.',
      ],
    },
  ],
};
