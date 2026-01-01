'use client';

import {
    FaJava,
    FaPython,
    FaDatabase,
    FaDocker,
    FaGitAlt,
    FaLinux,
    FaTerminal,
    FaCode
} from 'react-icons/fa';
import {
    SiSpringboot,
    SiFlask,
    SiFastapi,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiTensorflow,
    SiPytorch,
    SiPandas,
    SiNumpy,
    SiScikitlearn,
    SiPostman,
    SiGithub
} from 'react-icons/si';
import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'Programming & Data Structures',
        skills: [
            { name: 'Java', color: '#007396', icon: <FaJava /> },
            { name: 'Python', color: '#3776AB', icon: <FaPython /> },
            { name: 'DSA', color: '#FFD700', icon: <FaTerminal /> },
        ]
    },
    {
        title: 'Backend Development',
        skills: [
            { name: 'Spring Boot', color: '#6DB33F', icon: <SiSpringboot /> },
            { name: 'Flask', color: '#000000', icon: <SiFlask /> },
            { name: 'FastAPI', color: '#009688', icon: <SiFastapi /> },
        ]
    },
    {
        title: 'ML Libraries',
        skills: [
            { name: 'Pandas', color: '#150458', icon: <SiPandas /> },
            { name: 'NumPy', color: '#013243', icon: <SiNumpy /> },
            { name: 'Scikit-Learn', color: '#F7931E', icon: <SiScikitlearn /> },
            { name: 'PyTorch', color: '#EE4C2C', icon: <SiPytorch /> },
            { name: 'TensorFlow', color: '#FF6F00', icon: <SiTensorflow /> },
        ]
    },
    {
        title: 'Databases',
        skills: [
            { name: 'PostgreSQL', color: '#4169E1', icon: <SiPostgresql /> },
            { name: 'MongoDB', color: '#47A248', icon: <SiMongodb /> },
            { name: 'Redis', color: '#DC382D', icon: <SiRedis /> },
        ]
    },
    {
        title: 'Tools & Technologies',
        skills: [
            { name: 'Git', color: '#F05032', icon: <FaGitAlt /> },
            { name: 'GitHub', color: '#181717', icon: <SiGithub /> },
            { name: 'Postman', color: '#FF6C37', icon: <SiPostman /> },
            { name: 'Docker', color: '#2496ED', icon: <FaDocker /> },
            { name: 'Linux', color: '#FCC624', icon: <FaLinux /> },
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
                                            {skill.icon}
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
