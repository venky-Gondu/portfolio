'use client';

import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <p className={styles.intro}>
                            I'm a <strong>Final Year Postgraduate student</strong> at Vellore Institute of Technology, Amaravathi,
                            specializing in <strong>Full-Stack Development</strong> and <strong>AI/ML technologies</strong>.
                        </p>

                        <p className={styles.description}>
                            With expertise in <strong>Java, Spring Boot, Python, and modern web technologies</strong>,
                            I focus on building scalable solutions that solve real-world problems. My experience spans
                            from developing high-performance notification systems processing <strong>1000+ daily alerts</strong>
                            to creating AI-powered applications with <strong>85% test coverage</strong>.
                        </p>

                        <p className={styles.description}>
                            I'm passionate about solving complex problems through innovative solutions,
                            contributing to impactful software development projects, and continuously learning
                            emerging technologies to stay at the forefront of the industry.
                        </p>

                        <div className={styles.stats}>
                            <div className={styles.statCard}>
                                <h3>10+</h3>
                                <p>Projects Completed</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>15+</h3>
                                <p>Technologies Mastered</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>400+</h3>
                                <p>DSA Problems Solved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
