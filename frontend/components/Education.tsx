'use client';

import styles from './Education.module.css';

const education = [
    {
        degree: 'M.Tech - Integrated',
        institution: 'VIT Amaravathi',
        period: '2021 - Present',
        cgpa: '8.93',
        description: 'Specializing in Software Engineering and Full-Stack Development'
    },
    {
        degree: 'Intermediate (XII)',
        institution: 'Sri Viswa Vijetha Jr College',
        period: '2019 - 2021',
        cgpa: '9.64',
        description: 'Mathematics, Physics, Chemistry'
    },
    {
        degree: 'Secondary School (X)',
        institution: 'Kendriya Vidyalaya School',
        period: '2018 - 2019',
        cgpa: '10.0',
        description: 'CBSE Board'
    }
];

const certifications = [
    'Deep Learning Fundamentals - IBM',
    'Database and SQL for Data Science - IBM',
    'Building Regression Models - Coursera',
    'MongoDB for Developers - GUVI'
];

export default function Education() {
    return (
        <section id="education" className="section">
            <div className="container">
                <h2 className="section-title">Education & Certifications</h2>

                <div className={styles.timeline}>
                    {education.map((edu, idx) => (
                        <div key={idx} className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <span className={styles.period}>{edu.period}</span>
                                <h3 className={styles.degree}>{edu.degree}</h3>
                                <p className={styles.institution}>{edu.institution}</p>
                                <p className={styles.description}>{edu.description}</p>
                                <div className={styles.cgpa}>CGPA: {edu.cgpa}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.certifications}>
                    <h3 className={styles.certTitle}>Certifications</h3>
                    <div className={styles.certGrid}>
                        {certifications.map((cert, idx) => (
                            <div key={idx} className={styles.certCard}>
                                <span className={styles.certIcon}>🎓</span>
                                <span>{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
