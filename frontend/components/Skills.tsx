'use client';

import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'Programming Languages',
        skills: [
            { name: 'Java', color: '#007396' },
            { name: 'Python', color: '#3776AB' },
            { name: 'JavaScript', color: '#F7DF1E' },
            { name: 'TypeScript', color: '#3178C6' },
        ]
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Spring Boot', color: '#6DB33F' },
            { name: 'Flask', color: '#000000' },
            { name: 'FastAPI', color: '#009688' },
        ]
    },
    {
        title: 'Frontend',
        skills: [
            { name: 'React', color: '#61DAFB' },
            { name: 'Next.js', color: '#000000' },
            { name: 'Tailwind CSS', color: '#06B6D4' },
        ]
    },
    {
        title: 'Databases',
        skills: [
            { name: 'PostgreSQL', color: '#4169E1' },
            { name: 'MongoDB', color: '#47A248' },
            { name: 'Redis', color: '#DC382D' },
        ]
    },
    {
        title: 'Tools & Technologies',
        skills: [
            { name: 'Docker', color: '#2496ED' },
            { name: 'Git', color: '#F05032' },
            { name: 'TensorFlow', color: '#FF6F00' },
        ]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="section">
            <div className="container">
                <h2 className="section-title">Technical Skills</h2>

                <div className={styles.skillsGrid}>
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className={styles.category}>
                            <h3 className={styles.categoryTitle}>{category.title}</h3>
                            <div className={styles.skillsList}>
                                {category.skills.map((skill, skillIdx) => (
                                    <div key={skillIdx} className={styles.skillCard}>
                                        <div
                                            className={styles.skillIcon}
                                            style={{ backgroundColor: skill.color }}
                                        >
                                            {skill.name.charAt(0)}
                                        </div>
                                        <span className={styles.skillName}>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
