export const portfolioData = {
  personal: {
    name: 'Faradjou Abdelfetah',
    title: 'Full Stack Software Engineer',
    subtitle: 'Building modern, scalable applications with precision and innovation',
    bio: 'I am a passionate software engineer with expertise in full-stack development. I specialize in creating robust, user-friendly applications using modern technologies and best practices.',
    email: 'faradjouabdou2@gmail.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  about: {
    title: 'About Me',
    content: `I am a dedicated software engineer with a passion for building innovative solutions. With over 5 years of experience in full-stack development, I specialize in creating scalable, maintainable applications that solve real-world problems.

My expertise spans across modern web technologies, cloud platforms, and software architecture. I believe in writing clean, efficient code and following industry best practices. I'm always eager to learn new technologies and improve my skills.`,
    highlights: [
      { label: '5+', value: 'Years Experience' },
      { label: '30+', value: 'Projects Completed' },
      { label: '15+', value: 'Happy Clients' },
      { label: '10+', value: 'Technologies' },
    ],
  },
  experience: [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      company: 'Tech Innovations Inc',
      duration: 'Jan 2022 - Present',
      location: 'San Francisco, CA',
      description: 'Leading development of enterprise-scale applications with modern tech stack.',
      responsibilities: [
        'Architected and deployed microservices-based platform serving 100K+ users',
        'Led team of 5 engineers in agile environment',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews',
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      duration: 'Jun 2019 - Dec 2021',
      location: 'New York, NY',
      description: 'Developed full-stack web applications and backend services for various clients.',
      responsibilities: [
        'Built responsive web applications using React and Node.js',
        'Designed and implemented RESTful APIs',
        'Managed PostgreSQL and MongoDB databases',
        'Collaborated with UI/UX designers for optimal user experience',
      ],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    },
    {
      id: 3,
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      duration: 'Jan 2019 - May 2019',
      location: 'Remote',
      description: 'Contributed to frontend and backend development of web applications.',
      responsibilities: [
        'Developed features using React and JavaScript',
        'Fixed bugs and optimized application performance',
        'Wrote unit tests and documentation',
        'Participated in daily standups and sprint planning',
      ],
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop',
    },
  ],
  journey: [
    {
      date: '2018',
      title: 'Started Learning Web Development',
      description: 'Began self-teaching web development through online courses and personal projects.',
      location: 'Self-taught',
      type: 'milestone',
    },
    {
      date: '2019',
      title: 'First Job as Junior Developer',
      description: 'Secured first professional role as a junior developer at StartUp Ventures.',
      location: 'Remote',
      type: 'work',
    },
    {
      date: '2019',
      title: 'Bachelor\'s in Computer Science',
      description: 'Completed degree in Computer Science with focus on software engineering.',
      location: 'University of Technology',
      type: 'education',
    },
    {
      date: '2020',
      title: 'Full Stack Developer Role',
      description: 'Promoted to Full Stack Developer position with increased responsibilities.',
      location: 'Digital Solutions LLC, New York',
      type: 'work',
    },
    {
      date: '2022',
      title: 'Senior Engineer Position',
      description: 'Advanced to Senior Full Stack Engineer role leading a development team.',
      location: 'Tech Innovations Inc, San Francisco',
      type: 'work',
    },
    {
      date: '2024',
      title: 'Cloud Architecture Certification',
      description: 'Completed AWS Solutions Architect certification.',
      location: 'AWS Training',
      type: 'education',
    },
  ],
  videos: [
    {
      id: 1,
      title: 'Building a React Application from Scratch',
      description: 'Complete tutorial on building a modern React application with best practices.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      published: true,
    },
    {
      id: 2,
      title: 'Full Stack Development with Node.js and PostgreSQL',
      description: 'Learn how to build scalable backend services and databases.',
      videoUrl: 'https://www.youtube.com/watch?v=jNgzyQQ5tWY',
      published: true,
    },
    {
      id: 3,
      title: 'DevOps and CI/CD Pipeline Setup',
      description: 'Setting up automated testing and deployment pipelines.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      published: true,
    },
  ],
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce platform with payment processing, inventory management, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=250&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: true,
      published: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
      technologies: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: true,
      published: true,
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard for monitoring application metrics and user behavior.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      technologies: ['Vue.js', 'Chart.js', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: false,
      published: true,
    },
    {
      id: 4,
      title: 'Social Network API',
      description: 'RESTful API for a social networking platform with user authentication and real-time notifications.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Redis'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      featured: false,
      published: true,
    },
  ],
  skills: [
    {
      category: 'Frontend',
      skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'JavaScript ES6+'],
      level: 'expert',
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
      level: 'expert',
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
      level: 'advanced',
    },
    {
      category: 'DevOps & Cloud',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux'],
      level: 'advanced',
    },
    {
      category: 'Tools & Others',
      skills: ['Git', 'VS Code', 'Postman', 'Figma', 'JIRA', 'Agile'],
      level: 'intermediate',
    },
  ],
  certificates: [
    {
      id: 1,
      title: 'AWS Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      date: 'January 2024',
      credentialUrl: 'https://www.credly.com',
      image: 'https://images.unsplash.com/photo-1606721314527-ccb3fee45371?w=200&h=200&fit=crop',
      published: true,
    },
    {
      id: 2,
      title: 'Full Stack Web Development Bootcamp',
      issuer: 'General Assembly',
      date: 'June 2019',
      credentialUrl: 'https://www.credly.com',
      image: 'https://images.unsplash.com/photo-1606721314527-ccb3fee45371?w=200&h=200&fit=crop',
      published: true,
    },
    {
      id: 3,
      title: 'Google Cloud Professional Data Engineer',
      issuer: 'Google Cloud',
      date: 'August 2023',
      credentialUrl: 'https://www.credly.com',
      image: 'https://images.unsplash.com/photo-1606721314527-ccb3fee45371?w=200&h=200&fit=crop',
      published: true,
    },
  ],
  goal: {
    title: 'Career Goal',
    mainGoal: 'Become a technical leader and architect innovative solutions that make a positive impact.',
    description: `My short-term goals include:
- Deepen expertise in cloud architecture and distributed systems
- Lead a high-performing engineering team
- Contribute to open-source projects
- Share knowledge through technical writing and speaking

Long-term, I aspire to:
- Build products that serve millions of users
- Mentor the next generation of developers
- Advance the state of software engineering practices
- Create sustainable and scalable technology solutions`,
  },
  contact: {
    title: 'Get In Touch',
    description: 'Have a project in mind or want to discuss opportunities? Feel free to reach out!',
    email: 'faradjouabdou2@gmail.com',
    phone: '+1 (555) 123-4567',
    social: [
      { platform: 'GitHub', url: 'https://github.com', icon: 'Github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
      { platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
      { platform: 'Email', url: 'mailto:faradjouabdou2@gmail.com', icon: 'Mail' },
    ],
  },
}
