// 상단에 회사 이름 변수 추가
import { companyName, companyPossessive } from "./config"

export interface Skill {
  id: number
  name: string
  details: string
  markdownContent: string
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
    name: "Googliness",
    details: `${companyName}'s culture emphasizes collaboration, user-focused thinking, and values-driven work. My experiences demonstrate alignment with these principles.`,
    markdownContent: `
In collaborative projects like JobPT and Remember Me, I've demonstrated key aspects of Googliness:

- **User-Centric Design**: 
  * For JobPT, our team developed a RAG-based job matching system that specifically addressed user pain points in CV customization and job search
  * For Remember Me, implemented MCTS-based memory retrieval to create an intuitive classification system that adapted to user behavior

- **Collaborative Leadership**:
  * Led cross-functional teams of researchers and developers
  * Established shared technical standards while encouraging experimentation
  * Created documentation to ensure knowledge sharing across team members

- **Ethical Considerations**:
  * Prioritized privacy in document processing systems
  * Implemented transparent data handling practices
  * Designed systems with accessibility in mind

These projects exemplify how I approach work—starting with user needs, collaborating effectively across disciplines, and ensuring solutions align with core values of transparency and accessibility.


**Commitment to ${companyName}'s Mission:**

My experience with multi-language models and accessibility-focused applications directly connects to ${companyName}'s mission of organizing information and making it universally accessible and useful.
`,
    importance: 10,
    color: "#3498db",
    images: [
      "https://raw.githubusercontent.com/Pseudo-Lab/JobPT/e12e4e99bb52f5a67fa026a4ddcb0605b75a7c17/assets/demo1.png",
      "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8036.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/PaRFi6nmEjA",
    iconUrl: "https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png",
  },
  {
    id: 2,
    name: "Python",
    details:
      `As one of ${companyName}'s core languages, my 5+ years of experience with Python can be directly applied to developing and optimizing large-scale AI/ML systems.`,
    markdownContent: `
Python is not only one of ${companyName}'s primary development languages but also the foundation for many of the company's AI/ML systems. My Python experience provides direct value to the development of these systems:

- **Project Examples: JobPT & Scouter**
  * Built efficient Python backend for RAG-based job matching system in JobPT
  * Developed and optimized real-time object detection pipeline for Scouter project
  * Both projects emphasized scalable architecture and clean code principles

- **Technical Depth**:
  * Leveraged advanced Python optimization techniques - generators, async programming, multiprocessing
  * Deep understanding of essential libraries like NumPy, Pandas, PyTorch
  * Maintained reliable codebases through Test-Driven Development (TDD) methodologies

- **Scalability-Focused Approach**:
  * Built optimized pipelines for processing large datasets in the Meta Vision project
  * Improved throughput by 40% using parallel processing techniques
  * Focused on memory usage management and resource efficiency

**Relevance to ${companyName}:**

My Python experience aligns with ${companyName}'s large-scale services and scalability requirements. In particular, my experience with computing resource optimization, modular design, and AI system integration can be immediately applied to ${companyName}'s development culture and technical challenges.
`,
    importance: 9,
    color: "#2ecc71",
    images: ["https://img.freepik.com/free-vector/programmer-working-with-python_52683-23330.jpg"],
    videoUrl: "https://www.youtube.com/embed/Y8Tko2YC5hA",
    iconUrl: "https://img.icons8.com/color/96/python--v1.png",
  },
  {
    id: 3,
    name: "Machine Learning",
    details:
      `Advanced machine learning is at the core of ${companyName}'s AI innovations. My experience with supervised/unsupervised learning, reinforcement learning, and real-time predictive modeling can contribute to these innovations.`,
    markdownContent: `
${companyName}'s AI product suite is built on machine learning expertise, which is a core value I can bring:

- **Reinforcement Learning & Decision Systems**:
  * Implemented MCTS (Monte Carlo Tree Search) based memory retrieval in the Remember Me project
  * Combined DQN (Deep Q-Network) and Neural MCTS for chess AI development
  * These techniques are applicable to ${companyName}'s complex decision systems and recommendation algorithms

- **Computer Vision Expertise**:
  * Developed DINO-based X-ray system achieving 88% accuracy
  * Implemented zero-shot object detection by integrating MobileSAM and SRGAN
  * Directly relevant to enhancing ${companyName}'s image recognition and vision systems

- **LLM Optimization Experience**:
  * Built DPO (Direct Preference Optimization) based RAG system achieving 85% retrieval accuracy
  * Researched state-space models using Mamba and Jamba architectures
  * Applicable techniques for improving and evaluating large language models like Google's Gemini

**Key Achievements & Relevance to ${companyName}:**

In the Vision Inspection project, my DINO-based system improved manufacturing quality control accuracy to 88%. This experience can be directly applied to ${companyName}'s industry solutions and Cloud AI products.

My experience developing a multi-language Llama 3.2 Vision model with OCR integration in the Meta Vision project provides significant value for developing multi-lingual AI systems for ${companyName}'s global users.
`,
    importance: 8,
    color: "#9b59b6",
    images: [
      "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-1077.jpg",
      "https://img.freepik.com/free-vector/machine-learning-concept-illustration_114360-3829.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/na9OBvUZUPo",
    iconUrl:
      "https://img.icons8.com/external-flaticons-flat-flat-icons/96/external-machine-learning-robotics-flaticons-flat-flat-icons.png",
  },
  {
    id: 4,
    name: "Problem-Solving",
    details:
      `At ${companyName}, problem-solving isn't just about finding solutions—it's about creating innovations that scale. My experience demonstrates this approach through several key projects.`,
    markdownContent: `
As Lead Researcher on the Scouter project, I confronted the challenge of building a real-time object detection system that could identify previously unseen objects:

- **Problem Identification**: Standard object detection models required extensive labeled training data and struggled with novel objects
- **Analytical Approach**: Conducted comprehensive evaluation of foundation models and determined MobileSAM offered the best balance of accuracy and performance
- **Creative Solution**: Developed a novel inference pipeline that:
  * Implemented SRGAN for image preprocessing to enhance detail recognition
  * Created optimized prompt engineering techniques for zero-shot capabilities
  * Achieved 60% latency reduction while maintaining 75% accuracy

The outcome was a system that could detect and describe objects it had never been explicitly trained to recognize—delivering both technical and user experience improvements.

**Evidence of Impact:**

This solution-oriented approach translated directly to business impact in the Vision Inspection project, where our DINO-based X-ray system with Local Binary Pattern achieved 88% accuracy in defect detection, directly improving manufacturing quality control.
    `,
    importance: 7,
    color: "#f1c40f",
    images: ["https://private-user-images.githubusercontent.com/67540090/396789679-857226e5-17fc-446c-8d08-b207f578cff0.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDE5MjY5NjAsIm5iZiI6MTc0MTkyNjY2MCwicGF0aCI6Ii82NzU0MDA5MC8zOTY3ODk2NzktODU3MjI2ZTUtMTdmYy00NDZjLThkMDgtYjIwN2Y1NzhjZmYwLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzE0VDA0MzEwMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMyN2E3MmUwNDk4N2U1NzAwMTI3NWQ5YzNkODAxMTM0NzA2OWNjODUwZTYyMmM0MjQ2NzExYTM2MmViYTM3ZGYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Paawrxv2nNl07qLsVLYxeS_meC94Mz1vIhP6aUonREg"],
    videoUrl: "https://www.youtube.com/embed/Uxv_diDK-7s",
    iconUrl: "https://cdn0.iconfinder.com/data/icons/artificial-intelligence-butterscotch-vol-2/256/Problem_Solving-1024.png",
  },
  {
    id: 5,
    name: "Technical Expertise",
    details: `My journey at the intersection of AI research and engineering has equipped me with deep technical skills particularly relevant to ${companyName}'s infrastructure challenges.`,
    markdownContent: `
As AI Engineer on the Meta Vision project, I developed a multi-language Llama 3.2 Vision model with OCR integration that required solving complex technical challenges:

- **Architecture Optimization**: Implemented custom RLHF pipeline for vision-language alignment, balancing model performance with computational efficiency
- **System Integration**: Designed seamless integration between the vision model and OCR components, requiring deep understanding of transformer architectures
- **Performance Scaling**: Optimized inference pipelines to handle diverse input formats and languages while maintaining quality across deployment environments

This experience directly translates to ${companyName}'s ecosystem, where I can contribute to advancing multi-modal AI systems that serve global users across languages and contexts.

**Further Technical Depth:**
- Advanced knowledge of state-space models through research on Mamba and Jamba architectures
- Implementation experience with optimization techniques including paged-attention and quantization for production systems
- Proven track record in research (DPO-optimized RAG systems) and deployment (Azure-based classification systems)
    `,
    importance: 6,
    color: "#e74c3c",
    images: [
      "https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg",
      "https://img.freepik.com/free-vector/project-management-concept-illustration_114360-626.jpg",
    ],
    iconUrl: "https://cdn2.iconfinder.com/data/icons/business-dual-color-glyph-set-8/128/technical_expert-1024.png",
  },
  {
    id: 6,
    name: "Data Visualization",
    details: `Data visualization is a key skill for communicating complex analytical results in an understandable way. My experience can enhance ${companyName}'s data-driven decision making.`,
    markdownContent: `
As a company that collects and analyzes vast amounts of data, effective data visualization is essential for ${companyName}'s insight discovery and decision-making:

- **Development Experience**:
  * Developed interactive dashboards using Plotly, Tableau, and PowerBI
  * Visualized complex ML results for business stakeholders
  * Implemented custom visualization solutions based on D3.js

- **Project Applications**:
  * Created real-time visualizations of DPO optimization process results in the LLM Consultant project, improving team decision-making
  * Implemented intuitive heatmaps for anomaly detection results in the Vision Inspection system
  * Developed multidimensional visualization tools for Gemini 1.5 performance assessment in the ${companyName} LLM QA project

- **Business Value Creation**:
  * Effectively communicated technical complexity to non-technical stakeholders through data visualization
  * Facilitated cross-team collaboration through data storytelling
  * Accelerated problem-solving by quickly identifying patterns and outliers

**Relevance to ${companyName}:**

${companyName}'s diverse services and products rely on presenting complex data in an understandable format. My data visualization skills can contribute to ${companyName}'s internal analytics tools as well as products like ${companyName} Cloud Platform and ${companyName} Analytics. I can particularly apply my experience to performance evaluation of internal AI systems and user-centric dashboard development.
`,
    importance: 5,
    color: "#1abc9c",
    images: ["https://img.freepik.com/free-vector/data-inform-illustration-concept_114360-864.jpg"],
    videoUrl: "https://www.youtube.com/embed/yKW8kdDdNJo",
    iconUrl: "https://img.icons8.com/fluency/96/combo-chart.png",
  },
  {
    id: 7,
    name: "SQL",
    details: `Efficient data management is crucial for data-driven companies like ${companyName}. My SQL expertise can contribute to improving the performance and availability of large-scale data systems.`,
    markdownContent: `
SQL remains a core technology in ${companyName}'s vast data ecosystem. My experience can contribute to optimizing the performance of these data-driven infrastructures:

- **Database Design & Query Optimization**:
  * Experience writing complex analytical queries and designing large-scale database architectures
  * Implemented efficient schema for matching job information with user profiles in the JobPT project
  * Skills in indexing strategies, query optimization, and execution plan analysis for performance improvement

- **Application Cases**:
  * Implemented efficient storage and analysis of defect data in manufacturing quality control system (Vision Inspection)
  * Integrated vector DB with relational DB in the RAG system for the LLM Consultant project
  * Experience with BigQuery-style data warehouse operations, allowing immediate adaptation to ${companyName}'s environment

- **Scalability & Performance Optimization**:
  * Built data pipelines for production optimization in NX4, RG3 projects
  * Improved query performance by 70% on large datasets
  * Implemented data partitioning, sharding strategies, and caching mechanisms

**Relevance to ${companyName} Environment:**

${companyName} operates large-scale data systems like BigQuery, and my SQL expertise and database optimization experience can directly contribute to improving the performance of these systems. In particular, my experience with efficient query execution and database design for high-volume data will be a valuable asset for developing many of ${companyName}'s products and internal tools.
`,
    importance: 5,
    color: "#d35400",
    images: [
      "https://img.freepik.com/free-vector/big-data-center-server-room-rack-engineering-process-teamwork-computer-technology-cloud-storage_39422-1032.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA",
    iconUrl:
      "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/96/external-sql-computer-programming-flaticons-lineal-color-flat-icons.png",
  },
  {
    id: 8,
    name: "Lightweight",
    details: `In ${companyName}'s mobile-centric world, lightweight technologies enable resource efficiency and broader accessibility. My experience focuses on optimizing model size and resource usage while maintaining high performance.`,
    markdownContent: `
Running AI on mobile devices, deploying services at global scale, and edge computing - these are all challenges ${companyName} faces where lightweight technologies play a crucial role:

- **Lightweight Model Development & Optimization**:
  * Applied quantization and knowledge distillation techniques for image classifier optimization in Fast Inference & Lightweight research
  * Utilized MobileSAM in the Scouter project for efficient object detection even in mobile environments
  * Developed techniques to minimize accuracy loss while reducing model size

- **Inference Optimization Techniques**:
  * Implemented paged attention for efficient memory management
  * Developed CUDA-optimized search mechanisms to enhance Chain of Thought Agent performance
  * Applied parallel processing techniques to boost Dueling DQN performance

- **Tangible Results**:
  * Achieved 60% latency reduction while maintaining 75% accuracy (Scouter project)
  * Reduced model size by 90% while maintaining over 88% accuracy (Vision Inspection)
  * Improved inference speed by 3x with TensorRT optimization

**Relevance to ${companyName}:**

${companyName} faces the challenge of delivering AI services on diverse devices worldwide. My experience with lightweight technologies can contribute to ${companyName}'s goals in:

1. Optimizing on-device AI for Android devices
2. Improving TensorFlow Lite and ${companyName}'s lightweight AI tools
3. Providing consistent performance across diverse hardware environments
4. Enhancing accessibility for low-spec devices and emerging markets
`,
    importance: 4,
    color: "#34495e",
    images: [
      "https://img.freepik.com/free-vector/creative-problem-solving-concept-illustration_114360-1655.jpg",
      "https://img.freepik.com/free-vector/problem-solving-concept-illustration_114360-1782.jpg",
    ],
    iconUrl: "https://4f8d26d423.cbaul-cdnwnd.com/22633c6c4c99a082d26d013ec56ad5b5/200000003-e975bea6e0/570px-Quantized.signal.svg.png",
  },
  {
    id: 9,
    name: "Web Development",
    details: `${companyName}'s web-based services and applications are key channels for delivering services to users worldwide. My web development experience can contribute to the development and improvement of these services.`,
    markdownContent: `
Many of ${companyName}'s products are based on web technologies, an area where my web development experience can add value:

- **Backend Development Expertise**:
  * Robust API development experience using Flask and Django frameworks
  * Designed and implemented RESTful APIs in the JobPT project for seamless frontend-backend integration
  * Experience optimizing web services for scalability, performance, and security

- **Frontend Understanding**:
  * Implemented interactive dashboards using React (data visualization projects)
  * Experience in efficient collaboration during frontend-backend integration
  * Understanding of web accessibility and user experience design principles

- **Web-based AI Integration**:
  * Implemented AI model interaction through web interfaces in the LLM Consultant project
  * Developed web APIs handling multimodal inputs in the J.A.R.V.I.S project
  * Implemented real-time data processing and streaming technologies

**Relevance to ${companyName}:**

${companyName} offers various products and services that interact with users through the web. My web development experience can contribute to these core areas of ${companyName}:

1. Improving APIs and services for ${companyName} Cloud Platform
2. Developing internal tools and dashboards
3. Efficiently integrating AI/ML models with web services
4. Building scalable and robust backend systems

In particular, my experience integrating AI systems with web services will help make ${companyName}'s AI-centric products more accessible to users.
`,
    importance: 3,
    color: "#16a085",
    images: ["https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg"],
    videoUrl: "https://www.youtube.com/embed/zO3WB8dYJUE",
    iconUrl: "https://img.icons8.com/fluency/96/web.png",
  },
  {
    id: 10,
    name: "Cloud Services",
    details: `${companyName} Cloud Platform is one of ${companyName}'s core business areas. My experience with AWS and Azure can be directly applied to building and optimizing efficient systems in the GCP environment.`,
    markdownContent: `
Cloud computing is the backbone of modern technology infrastructure, and ${companyName} Cloud Platform is one of ${companyName}'s core services. My cloud experience provides the following value:

- **Multi-cloud Environment Experience**:
  * Practical experience with AWS and Azure, providing deep understanding of cloud architecture principles
  * Implemented Azure-based coupon/memo classification system in the Remember Me project
  * Developed fashion matching system using Azure in Closet-Mate

- **Serverless Architecture & Microservices**:
  * Experience designing scalable and cost-effective serverless architectures
  * Built microservice-based systems for improved flexibility and maintainability
  * Experience with containerization and orchestration technologies

- **Cloud-based AI/ML Pipelines**:
  * Implemented cloud-based RAG system in the LLM Consultant project
  * Deployed ML models to cloud environments in Scouter and Vision Inspection projects
  * Optimized cloud resources for distributed learning and large-scale data processing

**Relevance to ${companyName} Cloud Platform:**

My diverse cloud services experience can be directly applied to ${companyName} Cloud Platform:

1. Optimizing and developing GCP's AI/ML services
2. Designing cloud architectures with scalability and cost-efficiency in mind
3. Developing and optimizing GCP solutions for enterprise customers
4. Supporting multi-cloud strategies and migrations

In particular, my experience building and optimizing AI/ML pipelines in cloud environments can contribute to the advancement of services like ${companyName}'s VertexAI.
`,
    importance: 2,
    color: "#27ae60",
    images: [
      "https://img.freepik.com/free-vector/cloud-services-isometric-composition-with-big-cloud-computing-infrastructure-elements-connected-with-dashed-lines-vector-illustration_1284-30495.jpg",
      "https://img.freepik.com/free-vector/cloud-computing-concept-illustration_114360-345.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/M988_fsOSWo",
    iconUrl: "https://img.icons8.com/fluency/96/cloud.png",
  },
]

