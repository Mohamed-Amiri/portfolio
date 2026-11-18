import { Profile } from './models';

/**
 * Personal content. Source: owner's CV and messages. Nothing here is invented.
 */
export const PROFILE: Profile = {
  name: 'Mohamed Amiri',
  role: 'Full Stack Developer',
  stackLine: 'Angular · Java · Spring Boot',
  location: 'Beni Mellal, Morocco',

  intro: [
    'I build and deploy complete web apps with Angular and Spring Boot: from the REST API and database to the UI. Sakane and Safari are live below.',
  ],

  about: [
    'I trained as a full-stack web developer (Java · Spring Boot · Angular) at École Numérique Ahmed AL HANSALI with Simplon, after a technical diploma in software development. I care about applications that are fast, coherent and pleasant to use, and I like owning a feature end to end: schema, API, security, UI.',
  ],

  photo: {
    src: 'images/mohamed-amiri.jpg',
    srcSmall: 'images/mohamed-amiri-400.jpg',
    alt: 'Portrait of Mohamed Amiri',
  },

  email: 'mohamedamiri281@gmail.com',

  links: [
    { label: 'GitHub', href: 'https://github.com/Mohamed-Amiri', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-amiri-317a20245/', external: true },
  ],

  cv: {
    label: 'Download CV (PDF)',
    href: '/cv.pdf',
    download: true,
    filename: 'cv.pdf',
  },

  // Only technologies actually used (CV + the two repositories).
  skills: [
    { name: 'Core stack', items: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'Spring Security · JWT', 'MySQL'] },
    { name: 'Frontend', items: ['RxJS', 'Signals', 'SCSS', 'Bootstrap'] },
    { name: 'Backend', items: ['JPA · Hibernate', 'MapStruct', 'Swagger'] },
    { name: 'Tools & deployment', items: ['Git', 'Maven', 'Postman', 'Docker', 'Vercel', 'Azure'] },
  ],

  experience: [
    {
      period: 'Aug 2024 – Oct 2024',
      title: 'End-of-training internship',
      organisation: 'Agence du Bassin Hydraulique',
      summary: 'Built a human-resources management system in Python to answer the agency’s internal needs.',
    },
    {
      period: 'Aug 2023 – Sep 2023',
      title: 'Observation internship',
      organisation: 'Maghreb Business Software',
      summary: 'First hands-on exposure to a software company and its day-to-day practice.',
    },
  ],

  education: [
    {
      period: '2024 – 2025',
      title: 'Full Stack Web Development (Java · Spring Boot · Angular)',
      organisation: 'Simplon',
    },
    {
      period: '2022 – 2024',
      title: 'Technicien Spécialisé en Développement Informatique',
      organisation: 'École Marocaine Supérieure d’Enseignement Technique et Professionnel',
    },
    {
      period: '2020 – 2021',
      title: 'Baccalauréat, Literature & Humanities',
      organisation: '',
    },
  ],

  languages: ['Arabic — native', 'French — fluent', 'English — intermediate'],
};
