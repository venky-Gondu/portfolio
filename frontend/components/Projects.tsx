'use client';

import { useState } from 'react';
import styles from './Projects.module.css';

/*
 * PROJECT DATA — to add a new project, just append an object here.
 * category values: 'Full-Stack' | 'Backend' | 'AI/ML'
 * The first project (index 0) always renders as the featured hero card.
 */
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
            'Intelligent scheduling with 2-hour reminders and auto-expiry features',
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
        description: 'Microservice handling 1M+ daily requests with 70% compression ratio and <500ms response time.',
        achievements: [
            'Async token-based architecture for 1,000+ concurrent requests',
            'Designed concurrent batch processing pipeline',
            'Sub-500ms API response time under full load'
        ]
    },
    {
        title: 'Q/A Chat with RAG Pipeline',
        category: 'AI/ML',
        tech: ['Python', 'LangChain', 'ChromaDB', 'LLMs'],
        description: 'Scalable RAG-based Q&A system integrating LLMs and vector stores for context-aware answers.',
        achievements: [
            'Document processing and chunking pipeline using ChromaDB',
            'Achieved 85% accuracy in content-aware answer generation',
            'Optimized retrieval parameters for domain-specific corpora'
        ]
    },
    {
        title: 'E-commerce AI Data Analysis Agent',
        category: 'AI/ML',
        tech: ['Python', 'LangChain', 'Gemini', 'SQLite'],
        description: 'AI agent converting natural language queries to validated SQL with dynamic LLM-powered visualizations.',
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
            'Built recommendation engine for personalized lifestyle suggestions'
        ]
    }
];

/* Category → color mapping — easy to extend */
const categoryColor: Record<string, string> = {
    'Full-Stack': '#FF653F',
    'Backend':    '#FFC85C',
    'AI/ML':      '#c084fc',
};

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('All');
    const categories = ['All', 'Full-Stack', 'Backend', 'AI/ML'];

    const featured = projects[0];
    const rest = projects.slice(1);
    const filtered = activeFilter === 'All'
        ? rest
        : rest.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="section">
            <div className="container">

                {/* Header row with title + filter pills */}
                <div className={styles.sectionHeader}>
                    <h2 className="section-title" style={{ textAlign: 'left', width: 'auto', marginBottom: 0 }}>
                        Featured Projects
                    </h2>
                    <div className={styles.filters}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilter : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.titleUnderline}></div>

                {/* ── Featured Card (always Mazdoori / index 0) ── */}
                <div className={styles.featuredCard}>
                    <div className={styles.featuredLeft}>
                        <div className={styles.featuredIndex}>01</div>
                        <span
                            className={styles.categoryBadge}
                            style={{ '--cat-color': categoryColor[featured.category] } as React.CSSProperties}
                        >
                            {featured.category}
                        </span>
                        <div className={styles.featuredTech}>
                            {featured.tech.map((t, i) => (
                                <span key={i} className={styles.techTag}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.featuredRight}>
                        <h3 className={styles.featuredTitle}>{featured.title}</h3>
                        <p className={styles.description}>{featured.description}</p>
                        <ul className={styles.achievements}>
                            {featured.achievements.map((a, i) => (
                                <li key={i} className={styles.achievement}>
                                    <span className={styles.bullet} style={{ color: categoryColor[featured.category] }}>▸</span>
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Project Grid — scales to N projects ── */}
                <div className={styles.projectsGrid}>
                    {filtered.map((project, idx) => {
                        const globalIdx = projects.indexOf(project) + 1; // 1-based number
                        const color = categoryColor[project.category] || '#ffffff';
                        return (
                            <div
                                key={idx}
                                className={styles.projectCard}
                                style={{ '--cat-color': color } as React.CSSProperties}
                            >
                                {/* Top accent line */}
                                <div className={styles.cardAccent}></div>

                                <div className={styles.cardHeader}>
                                    <span className={styles.cardIndex}>
                                        {String(globalIdx + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className={styles.categoryBadge}
                                        style={{ '--cat-color': color } as React.CSSProperties}
                                    >
                                        {project.category}
                                    </span>
                                </div>

                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>

                                <ul className={styles.achievements}>
                                    {project.achievements.map((a, i) => (
                                        <li key={i} className={styles.achievement}>
                                            <span className={styles.bullet} style={{ color }}>▸</span>
                                            {a}
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.tech}>
                                    {project.tech.map((t, i) => (
                                        <span key={i} className={styles.techTag}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <p className={styles.emptyState}>No projects in this category yet.</p>
                )}
            </div>
        </section>
    );
}
