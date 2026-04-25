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
            {/* Ambient glow blobs */}
            <div className={styles.blob1}></div>
            <div className={styles.blob2}></div>

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
                            {/*
                             * Bigger Venn Diagram
                             * cx/cy adjusted to perfectly overlap
                             * Text is placed inside each non-overlapping section
                             */}
                            <svg
                                className={styles.vennSvg}
                                viewBox="0 0 600 600"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Circle 1  — Creativity — top-left */}
                                <circle
                                    cx="220" cy="240" r="180"
                                    fill="rgba(230, 240, 130, 0.1)"
                                    stroke="#E6F082" strokeWidth="2"
                                />
                                {/* Circle 2  — Curiosity — top-right */}
                                <circle
                                    cx="380" cy="240" r="180"
                                    fill="rgba(216, 211, 101, 0.1)"
                                    stroke="#D8D365" strokeWidth="2"
                                />
                                {/* Circle 3  — Experimentation — bottom */}
                                <circle
                                    cx="300" cy="380" r="180"
                                    fill="rgba(255, 255, 255, 0.05)"
                                    stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2"
                                />

                                {/* ── Independent Labels ── */}

                                <text
                                    x="160" y="180"
                                    textAnchor="middle"
                                    fill="#E6F082"
                                    fontSize="21"
                                    fontFamily="Space Grotesk, sans-serif"
                                    fontWeight="600"
                                    letterSpacing="0.5"
                                >
                                    Creativity
                                </text>

                                <text
                                    x="440" y="180"
                                    textAnchor="middle"
                                    fill="#D8D365"
                                    fontSize="21"
                                    fontFamily="Space Grotesk, sans-serif"
                                    fontWeight="600"
                                    letterSpacing="0.5"
                                >
                                    Curiosity
                                </text>

                                <text
                                    x="300" y="480"
                                    textAnchor="middle"
                                    fill="#ffffff"
                                    fontSize="20"
                                    fontFamily="Space Grotesk, sans-serif"
                                    fontWeight="600"
                                    letterSpacing="0.5"
                                >
                                    Experimentation
                                </text>

                                {/* ── Center intersection — Engineering ── */}
                                <text
                                    x="300" y="295"
                                    textAnchor="middle"
                                    fill="#ffffff"
                                    fontSize="24"
                                    fontFamily="Playfair Display, serif"
                                    fontWeight="700"
                                    letterSpacing="1"
                                >
                                    Engineering
                                </text>
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
