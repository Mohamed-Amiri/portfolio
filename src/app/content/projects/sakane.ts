import { Project } from '../models';

/** Source: github.com/Mohamed-Amiri/Sakane README + environment files. */
export const SAKANE: Project = {
  slug: 'sakane',
  name: 'Sakane',
  tagline: 'Vacation-rental platform where owners publish places and tenants book them with real availability.',
  summary:
    'A two-sided rental marketplace: tenants search, book, review and favourite places; owners manage listings, photos, availability calendars and incoming reservation requests from a dashboard.',
  period: '2025 – 2026',
  liveUrl: 'https://sakane.vercel.app/',
  repoUrl: 'https://github.com/Mohamed-Amiri/Sakane',
  stack: ['Angular 18', 'TypeScript', 'Signals', 'Java 17', 'Spring Boot 3.5', 'Spring Security · JWT', 'JPA · Hibernate', 'MySQL', 'Vercel', 'Azure App Service'],

  poster: {
    src: 'images/sakane-home.png',
    srcSmall: 'images/sakane-home-640.png',
    alt: 'Sakane home page with rental search, live listing count and property categories',
    width: 1280,
    height: 800,
  },

  screenshots: [
    {
      src: 'images/sakane-home.png',
      srcSmall: 'images/sakane-home-640.png',
      alt: 'Sakane home page with rental search, live listing count and property categories',
      caption: 'Public home: search by keyword, type, city and maximum price.',
      width: 1280,
      height: 800,
    },
    // Idea: add screenshots of place detail, booking flow, owner dashboard, photo upload, calendar, inbox.
  ],

  architecture: [
    { name: 'Client', detail: 'Angular 18 SPA — standalone components, signals, custom CSS design system. Deployed on Vercel.' },
    { name: 'API', detail: 'Spring Boot 3.5 REST API under /api. Stateless JWT auth (Bearer), roles enforced with @PreAuthorize. Deployed on Azure App Service (France Central).' },
    { name: 'Domain', detail: 'Controller → Service → Repository. DTOs per domain, EntityMapper, GlobalExceptionHandler with field-level validation errors.' },
    { name: 'Data', detail: 'JPA / Hibernate on a MySQL-compatible database in production; H2 in-memory for local development (seeded from data.sql).' },
    { name: 'Files', detail: 'Photo uploads stored on disk under uploads/lieux/{id}/ by PhotoStorageService and served as static content under /uploads/**.' },
  ],

  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      paragraphs: [
        'Sakane is a full-stack vacation-rental platform for Morocco-inspired stays. Two applications live in one repository: a Spring Boot back end and an Angular 18 front end. Visitors browse and search places; tenants (LOCATAIRE) book and review; owners (PROPRIETAIRE) publish and manage their properties.',
      ],
    },
    {
      id: 'problem',
      heading: 'Problem',
      paragraphs: [
        'A rental marketplace has to serve two very different users from the same data: tenants need trustworthy availability and a simple booking flow; owners need to publish listings with photos, control their calendar and handle requests without friction. Both sides need clear roles and secure access.',
      ],
    },
    {
      id: 'solution',
      heading: 'Solution',
      paragraphs: [
        'A role-aware application: one Spring Boot API with JWT authentication and per-role authorisation, and one Angular front end that adapts its navigation and screens to the signed-in role. Availability is enforced server-side when a booking is created, and reviews are only possible on places the tenant actually stayed in.',
      ],
    },
    {
      id: 'features',
      heading: 'Main features',
      bullets: [
        'Search with keyword, type, price range and city filters, paginated.',
        'Place detail with photo gallery and lightbox, amenities, availability check, reviews, ratings and stats.',
        'Tenant: book a place with a validated date range, cancel, favourites, write / edit / delete reviews, profile, notifications with unread badge.',
        'Owner: dashboard with earnings and occupancy stats; create, edit and delete places.',
        'Integrated photo upload — drag & drop files or image URLs in the same form; reorder photos (cover first) and delete.',
        'Availability calendar: block dates and manage calendar events.',
        'Reservation inbox: accept or refuse requests, update status.',
      ],
    },
    {
      id: 'architecture',
      heading: 'Architecture',
      paragraphs: [
        'The back end follows a layered structure with controllers, services, Spring Data repositories (including JPA Specifications for search), JPA entities, per-domain DTOs and a mapper. Security is a JWT filter plus SecurityConfig and a custom UserDetailsService. A GlobalExceptionHandler returns a consistent error shape — field-level ValidationErrorResponse for validation failures, ErrorResponse otherwise — which the front end maps through an ApiErrorPresenter.',
      ],
    },
    {
      id: 'technologies',
      heading: 'Technologies',
      bullets: [
        'Front end: Angular 18 (standalone components, signals), TypeScript, custom CSS design system, dev-server proxy for /api and /uploads.',
        'Back end: Java 17, Spring Boot 3.5, Spring Security + JWT, Spring Data JPA / Hibernate, Bean Validation with a custom @ValidDateRange validator, multipart uploads (10 MB per photo).',
        'Data: MySQL-compatible database in production, H2 in-memory for local development.',
        'Domain model: User, Lieu, Reservation, Avis, Favorite, Notification, CalendarEvent.',
      ],
    },
    {
      id: 'challenges',
      heading: 'Technical challenges',
      bullets: [
        'Photo management: supporting uploaded files and external URLs in the same list, with the first URL as cover, and keeping the list consistent because PUT /lieux/{id} replaces the whole photo list.',
        'Booking integrity: validating date ranges against existing reservations and owner calendar blocks on the server, not only in the UI.',
        'Role-based access: two roles with different screens and permissions on shared resources (places, reservations).',
      ],
    },
    {
      id: 'deployment',
      heading: 'Deployment',
      bullets: [
        'Front end: Vercel (sakane.vercel.app), production build pointing at the API base URL.',
        'Back end: Azure App Service, France Central region.',
      ],
    },
  ],
};
