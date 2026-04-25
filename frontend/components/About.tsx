'use client';

import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className={styles.content}>
                    <div className={styles.textBlock}>
                        <p className={styles.intro}>
                            I'm a <strong>Final Year M.Tech student</strong> at Vellore Institute of Technology, Amaravathi,
                            specializing in <strong>Backend Development</strong> and <strong>AI/ML technologies</strong>.
                        </p>

                        <p className={styles.body}>
                            With hands-on expertise in <strong>Java, Spring Boot, Python, FastAPI</strong> and modern data systems,
                            I build scalable solutions to real-world problems — from high-performance notification systems
                            processing <strong>1000+ daily alerts</strong> to AI-powered applications achieving
                            <strong> 85% accuracy</strong> at production scale.
                        </p>

                        <p className={styles.body}>
                            I'm passionate about solving complex problems through systems thinking, contributing to
                            impactful engineering projects, and continuously learning emerging technologies.
                        </p>

                        {/* Contact info row */}
                        <div className={styles.contactRow}>
                            <a href="mailto:gvenkatesh10082003@gmail.com" className={styles.contactChip}>
                                <span className={styles.chipIcon}>✉</span>
                                gvenkatesh10082003@gmail.com
                            </a>
                            <a href="tel:+919347367184" className={styles.contactChip}>
                                <span className={styles.chipIcon}>📞</span>
                                +91 9347 367 184
                            </a>
                            <div className={styles.contactChip}>
                                <span className={styles.chipIcon}>📍</span>
                                Visakhapatnam, AP
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className={styles.statsCol}>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>10+</span>
                            <span className={styles.statLabel}>Projects Completed</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>15+</span>
                            <span className={styles.statLabel}>Technologies Mastered</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>400+</span>
                            <span className={styles.statLabel}>DSA Problems Solved</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
