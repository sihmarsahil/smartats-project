export const sampleResumes = [
  {
    id: 1,
    name: 'Software Engineer',
    data: {
      personalInfo: { fullName: 'Alex Johnson', email: 'alex.j@example.com', phone: '123-456-7890', title: 'Senior Software Engineer', linkedin: 'linkedin.com/in/alexj', github: 'github.com/alexj' },
      photoUrl: '',
      summary: 'Results-driven Senior Software Engineer with over 5 years of experience in designing, developing, and deploying scalable web applications using React, Node.js, and AWS. Proven track record of improving application performance by 40% and leading cross-functional teams to deliver projects ahead of schedule.',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'MongoDB'],
      experience: [
        { title: 'Senior Software Engineer', company: 'TechNova Solutions', startDate: '2020', endDate: 'Present', description: '• Spearheaded the migration of a legacy monolithic application to a microservices architecture using Node.js and Docker, reducing deployment time by 50%.\n• Mentored a team of 4 junior developers and established CI/CD best practices.' },
        { title: 'Full Stack Developer', company: 'CreativeWeb Agency', startDate: '2018', endDate: '2020', description: '• Developed and maintained 15+ responsive websites for clients using React and Express.\n• Implemented robust RESTful APIs and integrated third-party payment gateways like Stripe.' }
      ],
      education: [
        { degree: 'B.S. in Computer Science', school: 'University of Washington', startDate: '2014', endDate: '2018' }
      ],
      projects: [
        { title: 'E-Commerce Dashboard', link: 'github.com/alex/dashboard', description: 'Built a real-time analytics dashboard for e-commerce stores using React, Redux, and WebSockets.' },
        { title: 'AI Task Manager', link: '', description: 'Created an intelligent to-do list application integrating OpenAI API to automatically categorize and prioritize user tasks.' }
      ],
      certificates: [
        { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2022' },
        { name: 'Meta React Professional Certificate', issuer: 'Coursera', date: '2021' }
      ],
      achievements: [
        'Hackathon Winner - Built an accessibility tool in 48 hours to win first place.',
        'Employee of the Year 2021 at TechNova Solutions for outstanding technical delivery.'
      ]
    }
  },
  {
    id: 2,
    name: 'Marketing Manager',
    data: {
      personalInfo: { fullName: 'Sarah Parker', email: 'sparker@example.com', phone: '987-654-3210', title: 'Digital Marketing Manager', linkedin: 'linkedin.com/in/sparkermarketing', github: '' },
      photoUrl: '',
      summary: 'Dynamic Digital Marketing Manager with 6+ years of expertise in SEO, content strategy, and paid advertising. Specialized in data-driven B2B campaigns that increase inbound lead generation by an average of 35% year-over-year. Adept at managing large advertising budgets and optimizing ROI.',
      skills: ['SEO/SEM', 'Google Ads', 'Content Strategy', 'HubSpot', 'Salesforce', 'Copywriting', 'A/B Testing', 'Data Analytics'],
      experience: [
        { title: 'Digital Marketing Manager', company: 'GrowthPulse Marketing', startDate: '2021', endDate: 'Present', description: '• Managed a $500k annual ad budget, achieving a 120% ROI across Google and LinkedIn Ads.\n• Launched a new SEO strategy that increased organic landing page traffic by 45%.' },
        { title: 'Marketing Coordinator', company: 'BrightBrand Inc', startDate: '2017', endDate: '2021', description: '• Coordinated social media campaigns on Twitter, LinkedIn, and Facebook with an engagement rate of 5%.\n• Organized 3 major virtual webinars with 2,000+ total attendees.' }
      ],
      education: [
        { degree: 'B.A. in Marketing and Communications', school: 'New York University', startDate: '2013', endDate: '2017' }
      ],
      projects: [],
      certificates: [
        { name: 'Google Analytics Individual Qualification', issuer: 'Google', date: '2022' },
        { name: 'HubSpot Content Marketing', issuer: 'HubSpot Academy', date: '2020' }
      ],
      achievements: []
    }
  },
  {
    id: 3,
    name: 'Graphic Designer',
    data: {
      personalInfo: { fullName: 'Leo Martinez', email: 'leo.design@example.com', phone: '555-123-4567', title: 'Senior Graphic Designer', linkedin: 'linkedin.com/in/leomartinez', github: '' },
      photoUrl: '',
      summary: 'Creative and detail-oriented Graphic Designer with over 7 years of experience in brand identity, print media, and UX/UI design. Passionate about translating brand values into compelling visual narratives. Awarded "Best Branding 2023" at the Global Design Awards.',
      skills: ['Adobe Creative Suite', 'Figma', 'Typography', 'Illustration', 'Brand Strategy', 'UX/UI', 'After Effects', 'Prototyping'],
      experience: [
        { title: 'Senior Graphic Designer', company: 'Artisan Studio', startDate: '2020', endDate: 'Present', description: '• Led brand identity refresh for 5 major tech startups, resulting in a 25% increase in their average brand recognition.\n• Managed a team of 3 junior designers and accelerated the design turnaround time by 30%.' },
        { title: 'UI/UX Visual Designer', company: 'PixelPerfect Inc.', startDate: '2017', endDate: '2020', description: '• Designed high-fidelity wireframes and interactive prototypes for iOS applications.\n• Collaborated with engineering teams to ensure pixel-perfect integration of all visual assets.' }
      ],
      education: [
        { degree: 'B.F.A. in Graphic Design', school: 'Rhode Island School of Design', startDate: '2013', endDate: '2017' }
      ],
      projects: [
        { title: 'EcoLife Branding Package', link: 'behance.net/leom/ecolife', description: 'Complete zero-to-one branding strategy including logo, color system, and print assets for an eco-friendly startup.' }
      ],
      certificates: [
        { name: 'Google UX Design Certificate', issuer: 'Coursera', date: '2021' }
      ],
      achievements: [
        'Winner of "Best Branding 2023" at Global Design Awards.'
      ]
    }
  },
  {
    id: 4,
    name: 'Healthcare Admin',
    data: {
      personalInfo: { fullName: 'Emily Davis', email: 'emily.davis@example.com', phone: '800-555-0199', title: 'Healthcare Administrator', linkedin: 'linkedin.com/in/emilydavisadmin', github: '' },
      photoUrl: '',
      summary: 'Highly organized Healthcare Administrator with 8+ years of experience optimizing clinical operations, managing budgets, and ensuring strict regulatory compliance. Dedicated to improving patient care delivery while reducing administrative overhead.',
      skills: ['Healthcare Compliance', 'Operations Management', 'Budget Planning', 'EMR/EHR Systems', 'Risk Management', 'Staff Scheduling', 'HIPAA'],
      experience: [
        { title: 'Operations Director', company: 'Mercy Medical Center', startDate: '2019', endDate: 'Present', description: '• Oversaw daily operations for a 200-bed facility, managing a $5M annual budget and reducing operational costs by 15%.\n• Implemented a new EHR system that improved patient data retrieval times by 50%.' },
        { title: 'Clinical Administrator', company: 'Westside Clinic', startDate: '2015', endDate: '2019', description: '• Managed scheduling and payroll for 50+ medical staff.\n• Ensured 100% compliance with local healthcare regulations and HIPAA guidelines.' }
      ],
      education: [
        { degree: 'Master of Health Administration (MHA)', school: 'Johns Hopkins University', startDate: '2013', endDate: '2015' },
        { degree: 'B.S. in Public Health', school: 'University of Michigan', startDate: '2009', endDate: '2013' }
      ],
      projects: [],
      certificates: [
        { name: 'Certified Medical Manager (CMM)', issuer: 'PAHCOM', date: '2018' },
        { name: 'Lean Six Sigma Green Belt in Healthcare', issuer: 'ASQ', date: '2020' }
      ],
      achievements: []
    }
  }
];
