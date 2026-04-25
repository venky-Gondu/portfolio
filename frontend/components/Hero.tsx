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
                             * Venn Diagram: 3 overlapping circles
                             * Circle centers designed so they overlap ~35%
                             * Text is INSIDE each circle's private region
                             * Center intersection = "Engineering"
                             * No arrow
                             */}
                            <svg
                                className={styles.vennSvg}
                                viewBox="0 0 420 400"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* ── Circles ── */}
                                {/* Circle 1  — Creativity — top-left — orange tint */}
                                <circle
                                    cx="155" cy="150" r="130"
                                    fill="rgba(255,101,63,0.13)"
                                    stroke="#FF653F" strokeWidth="1.4"
                                />
                                {/* Circle 2  — Curiosity — top-right — gold tint */}
                                <circle
                                    cx="265" cy="150" r="130"
                                    fill="rgba(255,200,92,0.10)"
                                    stroke="#FFC85C" strokeWidth="1.4"
                                />
                                {/* Circle 3  — Experimentation — bottom-center — purple tint */}
                                <circle
                                    cx="210" cy="238" r="130"
                                    fill="rgba(69,46,90,0.55)"
                                    stroke="#9b7fc0" strokeWidth="1.4"
                                />

                                {/* ── Labels INSIDE each circle's private region ── */}

                                {/* Creativity — upper-left private area */}
                                <text
                                    x="100" y="92"
                                    textAnchor="middle"
                                    fill="#FF653F"
                                    fontSize="13"
                                    fontFamily="Space Grotesk, sans-serif"
                                    fontWeight="600"
                                    letterSpacing="0.5"
                                >
                                    Creativity
                                </text>

                                {/* Curiosity — upper-right private area */}
                                <text
                                    x="320" y="92"
                                    textAnchor="middle"
                                    fill="#FFC85C"
                                    fontSize="13"
                                    fontFamily="Space Grotesk, sans-serif"
                                    fontWeight="600"
                                    letterSpacing="0.5"
                                >
                                    Curiosity
                                </text>

                                {/* Experimentation — bottom private area (split into 2 lines) */}
                                <text
                                    x="210" y="352"
                                    textAnchor="middle"
                                    fill="rgba(200,180,255,0.85)"
                                    fontSize="11"
                                    fontFamily="Space Grotesk, sans-serif"
                                    fontWeight="600"
                                    letterSpacing="0.5"
                                >
                                    Experi-
                                </text>
                                <text
                                    x="210" y="368"
                                    textAnchor="middle"
                                    fill="rgba(200,180,255,0.85)"
                                    fontSize="11"
                                    fontFamily="Space Grotesk, sans-serif"
                                    fontWeight="600"
                                    letterSpacing="0.5"
                                >
                                    mentation
                                </text>

                                {/* ── Center intersection — Engineering ── */}
                                <text
                                    x="210" y="195"
                                    textAnchor="middle"
                                    fill="#ffffff"
                                    fontSize="15"
                                    fontFamily="Playfair Display, serif"
                                    fontWeight="600"
                                    letterSpacing="0.3"
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
