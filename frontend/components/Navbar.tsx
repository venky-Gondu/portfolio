'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navContent}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>Venkatesh</span>
                        <span className={styles.logoDot}>.</span>
                    </div>

                    {/* Desktop Menu */}
                    <ul className={styles.navLinks}>
                        <li><a onClick={() => scrollToSection('home')}>Home</a></li>
                        <li><a onClick={() => scrollToSection('about')}>About</a></li>
                        <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
                        <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
                        <li><a onClick={() => scrollToSection('education')}>Education</a></li>
                        <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
                    </ul>

                    <Link href="/admin/login" className={styles.adminLink}>
                        Admin
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <a onClick={() => scrollToSection('home')}>Home</a>
                        <a onClick={() => scrollToSection('about')}>About</a>
                        <a onClick={() => scrollToSection('skills')}>Skills</a>
                        <a onClick={() => scrollToSection('projects')}>Projects</a>
                        <a onClick={() => scrollToSection('education')}>Education</a>
                        <a onClick={() => scrollToSection('contact')}>Contact</a>
                        <Link href="/admin/login">Admin</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
