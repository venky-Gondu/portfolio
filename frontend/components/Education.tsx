'use client';

import styles from './Education.module.css';

const education = [
    {
        degree: 'M.Tech – Integrated',
        institution: 'VIT Amaravathi',
        period: '2021 – Present',
        cgpa: '8.93',
        description: 'Specializing in Software Engineering and Full-Stack Development',
        board: 'VIT University'
    },
    {
        degree: 'Intermediate (XII)',
        institution: 'Sri Viswa Vijetha Jr College',
        period: '2019 – 2021',
        cgpa: '9.64',
        description: 'Mathematics, Physics, Chemistry',
        board: 'Andhra Pradesh State Board'
    },
    {
        degree: 'Secondary School (X)',
        institution: 'Keshava Reddy School',
        period: '2018 – 2019',
        cgpa: '10.0',
        description: 'Core Sciences & Mathematics',
        board: 'State Board'
    }
];

const certifications = [
    'Deep Learning Fundamentals – IBM',
    'Database and SQL for Data Science – IBM',
    'Building Regression Models – Coursera',
    'MongoDB for Developers – GUVI'
];

export default function Education() {
    return (
        <section id="education" className="section">
            <div className="container">
                <h2 className="section-title">Education & Certifications</h2>

                <div className={styles.layout}>
                    {/* Timeline */}
                    <div className={styles.timeline}>
                        {education.map((edu, idx) => (
                            <div key={idx} className={styles.timelineItem}>
                                <div className={styles.timelineLeft}>
                                    <span className={styles.period}>{edu.period}</span>
                                    <div className={styles.cgpaBadge}>
                                        <span className={styles.cgpaLabel}>CGPA</span>
                                        <span className={styles.cgpaValue}>{edu.cgpa}</span>
                                    </div>
                                </div>
                                <div className={styles.timelineBar}>
                                    <div className={styles.dot}></div>
                                    {idx < education.length - 1 && <div className={styles.line}></div>}
                                </div>
                                <div className={styles.timelineContent}>
                                    <h3 className={styles.degree}>{edu.degree}</h3>
                                    <p className={styles.institution}>{edu.institution}</p>
                                    <p className={styles.description}>{edu.description}</p>
                                    <span className={styles.board}>{edu.board}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div className={styles.certSection}>
                        <h3 className={styles.certTitle}>Certifications</h3>
                        <div className={styles.certList}>
                            {certifications.map((cert, idx) => (
                                <div key={idx} className={styles.certCard}>
                                    <span className={styles.certDot}></span>
                                    <span className={styles.certText}>{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
