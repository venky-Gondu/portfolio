'use client';

import { useState } from 'react';
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
        category: 'Full-Stack',
        tech: ['Java', 'Spring Boot', 'WebSocket', 'Redis'],
        description: 'Engineered REST-based notification platform processing 1000+ daily alerts for 50+ users with 99.5% uptime.',
        achievements: [
            'Implemented intelligent scheduling with 2-hour reminders',
            'Auto-expiry features for improving engagement by 40%',
            'Applied SOLID principles achieving 85% test coverage'
        ]
    },
    {
        title: 'Random Video Chat Platform',
        category: 'Full-Stack',
        tech: ['WebRTC', 'JavaScript', 'Tailwind CSS', 'Spring Boot'],
        description: 'Built WebRTC platform supporting 100+ concurrent sessions with <200ms latency and 99.8% connection success rate.',
        achievements: [
            'Engineered Spring Boot WebSocket signaling server',
            'Implemented end-to-end encryption',
            'Intelligent matchmaking algorithm handling 20+ daily requests'
        ]
    },
    {
        title: 'Multi-Threaded Image Compression',
        category: 'Backend',
        tech: ['Java', 'Microservices'],
        description: 'Architected microservice processing 1,000+ concurrent requests with 70% compression ratio.',
        achievements: [
            'Handling 1M+ daily requests',
            'Designed asynchronous token-based architecture',
            'Reducing API response time to <500ms'
        ]
    },
    {
        title: 'Q/A Chat with RAG Pipeline',
        category: 'AI/ML',
        tech: ['Python', 'LangChain', 'ChromaDB', 'LLMs'],
        description: 'Engineered scalable RAG-based Q&A system with LangChain integrating LLMs and vector stores.',
        achievements: [
            'Implemented document processing using ChromaDB',
            'Achieved 85% accuracy in content-aware answer generation',
            'Optimized retrieval parameters'
        ]
    },
    {
        title: 'E-commerce AI Data Analysis Agent',
        category: 'AI/ML',
        tech: ['Python', 'LangChain', 'Gemini', 'SQLite'],
        description: 'Built AI agent using LangChain and Gemini LLM converting natural language to validated SQL.',
        achievements: [
            'Designed pipeline: query validation → SQL generation → execution',
            'LLM insights with dynamic visualizations',
            'Integrated FastAPI backend with Streamlit frontend'
        ]
    },
    {
        title: 'Lifestyle Recommendation System',
        category: 'AI/ML',
        tech: ['Python', 'TensorFlow', 'VGG16', 'Deep Learning'],
        description: 'Developed deep learning model using modified VGG16 achieving 90% classification accuracy.',
        achievements: [
            'Trained on UTKFace dataset with 20,000+ images',
            'Built recommendation engine providing personalized suggestions',
            'MAE of 4.2 years for age estimation'
        ]
    }
];

export default function Projects() {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Full-Stack', 'Backend', 'AI/ML'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div className={styles.filters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.projectsGrid}>
                    {filteredProjects.map((project, idx) => (
                        <div key={idx} className={styles.projectCard}>
                            <div className={styles.projectHeader}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <span className={styles.category}>{project.category}</span>
                            </div>

                            <p className={styles.description}>{project.description}</p>

                            <div className={styles.achievements}>
                                {project.achievements.map((achievement, i) => (
                                    <div key={i} className={styles.achievement}>
                                        <span className={styles.bullet}>▸</span>
                                        {achievement}
                                    </div>
                                ))}
                            </div>

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
