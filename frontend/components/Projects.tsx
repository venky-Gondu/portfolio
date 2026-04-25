'use client';

import styles from './Projects.module.css';

const projects = [
    {
        title: 'Mazdoori – Hyperlocal Agricultural Labor Matching',
        category: 'Full-Stack',
        tech: ['React.js', 'FastAPI', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'PWA'],
        description: 'Hyperlocal platform connecting daily-wage agricultural workers with farm jobs within a strict 5km radius using a custom geospatial matchmaking algorithm.',
        achievements: [
            'Built RESTful backend with FastAPI & PostgreSQL; implemented Haversine-based geospatial matching within 5km radius',
            'Resolved severe N+1 query bottlenecks using batch-fetching, optimizing job-applicant aggregations',
            'Integrated TextBee SMS API for 100% passwordless auth with stateless JWT sessions and strict 24-hour token expiry',
            'Developed mobile-first PWA with dual-role dashboards (Farmer/Worker) and visual-first UI to overcome literacy barriers',
            'Implemented atomic transaction commits preventing 100% of duplicate job submissions and worker schedule overlaps'
        ]
    },
    {
        title: 'Notification & Alerting System',
        category: 'Backend',
        tech: ['Java', 'Spring Boot', 'WebSocket', 'Redis'],
        description: 'REST-based notification platform processing 1000+ daily alerts for 50+ users with 99.5% uptime.',
        achievements: [
            'Implemented intelligent scheduling with 2-hour reminders and auto-expiry features',
            'Improved engagement by 40% through contextual alert prioritization',
            'Applied SOLID principles achieving 85% test coverage'
        ]
    },
    {
        title: 'Random Video Chat Platform',
        category: 'Full-Stack',
        tech: ['WebRTC', 'JavaScript', 'Tailwind CSS', 'Spring Boot'],
        description: 'WebRTC platform supporting 100+ concurrent sessions with <200ms latency and 99.8% connection success rate.',
        achievements: [
            'Engineered Spring Boot WebSocket signaling server for real-time peer negotiation',
            'Implemented end-to-end encryption for all video streams',
            'Intelligent matchmaking algorithm handling 20+ concurrent daily requests'
        ]
    },
    {
        title: 'Multi-Threaded Image Compression',
        category: 'Backend',
        tech: ['Java', 'Microservices'],
        description: 'Microservice processing 1,000+ concurrent requests with 70% compression ratio and <500ms response time.',
        achievements: [
            'Handles 1M+ daily requests through async token-based architecture',
            'Designed pipeline for concurrent batch processing',
            'Sub-500ms API response time under full load'
        ]
    },
    {
        title: 'Q/A Chat with RAG Pipeline',
        category: 'AI/ML',
        tech: ['Python', 'LangChain', 'ChromaDB', 'LLMs'],
        description: 'Scalable RAG-based Q&A system with LangChain integrating LLMs and vector stores for context-aware answers.',
        achievements: [
            'Implemented document processing and chunking using ChromaDB',
            'Achieved 85% accuracy in content-aware answer generation',
            'Optimized retrieval parameters for domain-specific corpora'
        ]
    },
    {
        title: 'E-commerce AI Data Analysis Agent',
        category: 'AI/ML',
        tech: ['Python', 'LangChain', 'Gemini', 'SQLite'],
        description: 'AI agent using LangChain and Gemini LLM converting natural language queries to validated SQL with dynamic visualizations.',
        achievements: [
            'Pipeline: query validation → SQL generation → execution → LLM insights',
            'Dynamic visualizations generated from query results',
            'Integrated FastAPI backend with Streamlit frontend'
        ]
    },
    {
        title: 'Lifestyle Recommendation System',
        category: 'AI/ML',
        tech: ['Python', 'TensorFlow', 'VGG16', 'Deep Learning'],
        description: 'Deep learning model using modified VGG16 achieving 90% classification accuracy on lifestyle attributes.',
        achievements: [
            'Trained on UTKFace dataset with 20,000+ images',
            'MAE of 4.2 years for age estimation',
            'Built recommendation engine providing personalized lifestyle suggestions'
        ]
    }
];

export default function Projects() {
    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                {/* Featured row — Mazdoori spans full width */}
                <div className={styles.featuredRow}>
                    <div className={`${styles.projectCard} ${styles.featured}`}>
                        <div className={styles.projectMeta}>
                            <span className={styles.category}>{projects[0].category}</span>
                            <span className={styles.featuredBadge}>★ Highlighted</span>
                        </div>
                        <h3 className={styles.projectTitle}>{projects[0].title}</h3>
                        <p className={styles.description}>{projects[0].description}</p>
                        <ul className={styles.achievements}>
                            {projects[0].achievements.map((a, i) => (
                                <li key={i} className={styles.achievement}>
                                    <span className={styles.bullet}>—</span> {a}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.tech}>
                            {projects[0].tech.map((t, i) => (
                                <span key={i} className={styles.techTag}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Remaining projects in 3-column grid */}
                <div className={styles.projectsGrid}>
                    {projects.slice(1).map((project, idx) => (
                        <div key={idx} className={styles.projectCard}>
                            <div className={styles.projectMeta}>
                                <span className={styles.category}>{project.category}</span>
                            </div>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>
                            <ul className={styles.achievements}>
                                {project.achievements.map((a, i) => (
                                    <li key={i} className={styles.achievement}>
                                        <span className={styles.bullet}>—</span> {a}
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.tech}>
                                {project.tech.map((t, i) => (
                                    <span key={i} className={styles.techTag}>{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
