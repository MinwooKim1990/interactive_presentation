export interface Skill {
  id: number
  name: string
  details: string
  importance: number // 1-10 scale
  color: string
  images: string[] // Changed to array to support multiple images
  videoUrl?: string
  achievements?: string[]
  iconUrl?: string // For bubble icons
}

export const skillsData: Skill[] = [
  {
    id: 1,
    name: "Data Analysis",
    details:
      "Extensive experience in analyzing big data to discover business insights, utilizing advanced statistical analysis, and leveraging machine learning techniques.",
    importance: 10,
    color: "#3498db",
    images: [
      "https://img.freepik.com/free-vector/big-data-analytics-abstract-concept-illustration_335657-3738.jpg",
      "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8036.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
    achievements: [
      "Increased business efficiency by 30% through data-driven insights",
      "Developed predictive models with 85%+ accuracy",
      "Implemented automated reporting systems saving 20 hours per week",
    ],
    iconUrl: "https://img.icons8.com/fluency/96/analytics.png",
  },
  {
    id: 2,
    name: "Python",
    details:
      "Over 5 years of development experience, leading large-scale projects, and expertise in maintenance and optimization.",
    importance: 9,
    color: "#2ecc71",
    images: ["https://img.freepik.com/free-vector/programmer-working-with-python_52683-23330.jpg"],
    videoUrl: "https://www.youtube.com/embed/Y8Tko2YC5hA",
    achievements: [
      "Developed and maintained 10+ production applications",
      "Reduced processing time by 40% through code optimization",
      "Created reusable libraries used across multiple projects",
    ],
    iconUrl: "https://img.icons8.com/color/96/python--v1.png",
  },
  {
    id: 3,
    name: "Machine Learning",
    details:
      "Proficient in supervised and unsupervised learning algorithms, developing real-time prediction models with over 85% accuracy.",
    importance: 8,
    color: "#9b59b6",
    images: [
      "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-1077.jpg",
      "https://img.freepik.com/free-vector/machine-learning-concept-illustration_114360-3829.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/na9OBvUZUPo",
    achievements: [
      "Built recommendation systems increasing user engagement by 25%",
      "Implemented NLP solutions for automated customer service",
      "Developed computer vision systems for quality control",
    ],
    iconUrl:
      "https://img.icons8.com/external-flaticons-flat-flat-icons/96/external-machine-learning-robotics-flaticons-flat-flat-icons.png",
  },
  {
    id: 4,
    name: "Teamwork",
    details:
      "Experience leading teams of 5+ people, proficient with collaboration tools, and excellent communication skills.",
    importance: 7,
    color: "#f1c40f",
    images: ["https://img.freepik.com/free-vector/colleagues-working-together-project_74855-6308.jpg"],
    videoUrl: "https://www.youtube.com/embed/pEv66yUeC7A",
    achievements: [
      "Led cross-functional teams to deliver projects on time and under budget",
      "Implemented agile methodologies improving team productivity by 35%",
      "Mentored junior team members, accelerating their professional growth",
    ],
    iconUrl: "https://img.icons8.com/fluency/96/conference-call.png",
  },
  {
    id: 5,
    name: "Project Management",
    details: "Skilled in Agile methodologies, schedule and resource optimization, and risk management.",
    importance: 6,
    color: "#e74c3c",
    images: [
      "https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg",
      "https://img.freepik.com/free-vector/project-management-concept-illustration_114360-626.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/MhXnu8XC7Rc",
    achievements: [
      "Successfully delivered 15+ projects on time and within budget",
      "Reduced project delivery time by 20% through process improvements",
      "Managed budgets exceeding $500,000",
    ],
    iconUrl: "https://img.icons8.com/fluency/96/program.png",
  },
  {
    id: 6,
    name: "Data Visualization",
    details: "Proficient with Plotly, Tableau, and PowerBI, with experience developing interactive dashboards.",
    importance: 5,
    color: "#1abc9c",
    images: ["https://img.freepik.com/free-vector/data-inform-illustration-concept_114360-864.jpg"],
    videoUrl: "https://www.youtube.com/embed/yKW8kdDdNJo",
    achievements: [
      "Created executive dashboards used for strategic decision making",
      "Designed visualizations that improved data comprehension by 40%",
      "Developed real-time monitoring systems for critical business metrics",
    ],
    iconUrl: "https://img.icons8.com/fluency/96/combo-chart.png",
  },
  {
    id: 7,
    name: "SQL",
    details: "Experienced in writing complex queries, database design, and performance optimization.",
    importance: 5,
    color: "#d35400",
    images: [
      "https://img.freepik.com/free-vector/big-data-center-server-room-rack-engineering-process-teamwork-computer-technology-cloud-storage_39422-1032.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA",
    achievements: [
      "Optimized database queries reducing response time by 60%",
      "Designed database schemas for enterprise applications",
      "Implemented data warehousing solutions for analytics",
    ],
    iconUrl:
      "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/96/external-sql-computer-programming-flaticons-lineal-color-flat-icons.png",
  },
  {
    id: 8,
    name: "Problem Solving",
    details: "Skilled in analyzing and solving complex business problems with a creative mindset.",
    importance: 4,
    color: "#34495e",
    images: [
      "https://img.freepik.com/free-vector/creative-problem-solving-concept-illustration_114360-1655.jpg",
      "https://img.freepik.com/free-vector/problem-solving-concept-illustration_114360-1782.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/cGuJ-QGSbWw",
    achievements: [
      "Resolved critical production issues reducing downtime by 75%",
      "Developed innovative solutions to long-standing business challenges",
      "Created troubleshooting frameworks adopted company-wide",
    ],
    iconUrl: "https://img.icons8.com/fluency/96/solution.png",
  },
  {
    id: 9,
    name: "Web Development",
    details: "Experience with Flask and Django, RESTful API development, and basic frontend understanding.",
    importance: 3,
    color: "#16a085",
    images: ["https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg"],
    videoUrl: "https://www.youtube.com/embed/zO3WB8dYJUE",
    achievements: [
      "Built and deployed 5+ web applications with 99.9% uptime",
      "Developed RESTful APIs consumed by multiple client applications",
      "Implemented responsive designs improving mobile user experience",
    ],
    iconUrl: "https://img.icons8.com/fluency/96/web.png",
  },
  {
    id: 10,
    name: "Cloud Services",
    details: "Experience with AWS and Azure, with understanding of serverless architecture.",
    importance: 2,
    color: "#27ae60",
    images: [
      "https://img.freepik.com/free-vector/cloud-services-isometric-composition-with-big-cloud-computing-infrastructure-elements-connected-with-dashed-lines-vector-illustration_1284-30495.jpg",
      "https://img.freepik.com/free-vector/cloud-computing-concept-illustration_114360-345.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/M988_fsOSWo",
    achievements: [
      "Migrated on-premise applications to cloud reducing costs by 40%",
      "Implemented serverless architectures for scalable applications",
      "Set up CI/CD pipelines for automated deployments",
    ],
    iconUrl: "https://img.icons8.com/fluency/96/cloud.png",
  },
]

