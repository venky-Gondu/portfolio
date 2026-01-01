'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from './Hero.module.css';

export default function Hero() {
    const [text, setText] = useState('');
    const fullText = 'Backend Developer & AI/ML Enthusiast';
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + fullText[index]);
                setIndex(index + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.gradient1}></div>
                <div className={styles.gradient2}></div>
                <div className={styles.gradient3}></div>
            </div>

            <div className="container">
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <p className={styles.greeting}>Hello, I'm</p>
                        <h1 className={styles.name}>Venkatesh Gondu</h1>
                        <div className={styles.typewriter}>
                            <h2 className={styles.title}>{text}<span className={styles.cursor}>|</span></h2>
                        </div>

                        <p className={styles.quote}>
                            "Transforming complex problems into elegant solutions through code,
                            driven by innovation and a passion for continuous learning."
                        </p>

                        <div className={styles.cta}>
                            <button onClick={scrollToProjects} className="btn btn-primary">
                                View Projects
                            </button>
                            <button onClick={scrollToContact} className="btn btn-outline">
                                Contact Me
                            </button>
                        </div>

                        <div className={styles.social}>
                            <a href="https://github.com/venky-gondu" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/venkatesh-gondu" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:venkatalagondu@gmail.com">
                                <FaEnvelope />
                            </a>
                            <a href="tel:+919147367184">
                                <FaPhone />
                            </a>
                        </div>
                    </div>

                    <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.imagePlaceholder}>
                                <div className={styles.avatarText}>VG</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
            </div>
        </section>
    );
}
