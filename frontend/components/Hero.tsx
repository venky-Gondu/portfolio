'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from './Hero.module.css';

export default function Hero() {
    const [text, setText] = useState('');
    const fullText = 'Backend Developer & AI/ML Engineer';
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + fullText[index]);
                setIndex(index + 1);
            }, 80);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.grain}></div>
            </div>

            <div className="container">
                <div className={styles.content}>
                    {/* Left — Text */}
                    <div className={styles.textContent}>
                        <p className={styles.greeting}>Hello, I'm</p>
                        <h1 className={styles.name}>Venkatesh<br />Gondu</h1>

                        <div className={styles.typewriter}>
                            <span className={styles.typedText}>{text}</span>
                            <span className={styles.cursor}>|</span>
                        </div>

                        <p className={styles.quote}>
                            Transforming complex problems into elegant backend systems,
                            driven by curiosity and precision engineering.
                        </p>

                        <div className={styles.cta}>
                            <button onClick={() => scrollTo('projects')} className="btn btn-primary">
                                View Projects
                            </button>
                            <button onClick={() => scrollTo('contact')} className="btn btn-outline">
                                Get In Touch
                            </button>
                        </div>

                        <div className={styles.social}>
                            <a href="https://github.com/venky-gondu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/venkatesh-gondu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:gvenkatesh10082003@gmail.com" aria-label="Email">
                                <FaEnvelope />
                            </a>
                            <a href="tel:+919347367184" aria-label="Phone">
                                <FaPhone />
                            </a>
                        </div>
                    </div>

                    {/* Right — Venn Diagram */}
                    <div className={styles.imageContainer}>
                        <div className={styles.vennWrapper}>
                            {/* Three overlapping circles */}
                            <svg
                                className={styles.vennSvg}
                                viewBox="0 0 340 320"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Circle 1 — Creativity (top-left) */}
                                <circle cx="130" cy="110" r="100" fill="rgba(192,133,82,0.12)" stroke="#C08552" strokeWidth="1.2" />
                                {/* Circle 2 — Curiosity (top-right) */}
                                <circle cx="210" cy="110" r="100" fill="rgba(75,46,43,0.35)" stroke="#C08552" strokeWidth="1.2" />
                                {/* Circle 3 — Experimentation (bottom-center) */}
                                <circle cx="170" cy="190" r="100" fill="rgba(192,133,82,0.08)" stroke="#C08552" strokeWidth="1.2" />

                                {/* Labels outside intersection */}
                                <text x="80" y="80" textAnchor="middle" fill="#FFF8F0" fontSize="11" fontFamily="Space Grotesk" fontWeight="500">Creativity</text>
                                <text x="260" y="80" textAnchor="middle" fill="#FFF8F0" fontSize="11" fontFamily="Space Grotesk" fontWeight="500">Curiosity</text>
                                <text x="170" y="275" textAnchor="middle" fill="#FFF8F0" fontSize="11" fontFamily="Space Grotesk" fontWeight="500">Experimentation</text>

                                {/* Center intersection label */}
                                <text x="170" y="152" textAnchor="middle" fill="#C08552" fontSize="13" fontFamily="Playfair Display" fontWeight="600">Engineering</text>

                                {/* Arrow pointing right */}
                                <line x1="288" y1="152" x2="328" y2="152" stroke="#C08552" strokeWidth="1.5" strokeLinecap="round" />
                                <polyline points="320,144 330,152 320,160" fill="none" stroke="#C08552" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <p className={styles.vennCaption}>Where ideas meet execution</p>
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
