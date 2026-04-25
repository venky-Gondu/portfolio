'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import { visitorAPI } from '@/utils/api';
import './globals.css';

export default function Home() {
    useEffect(() => {
        visitorAPI.track({ page: '/', referrer: document.referrer }).catch(() => {});
    }, []);

    return (
        <>
            <Navbar />
            <main>
                {/* Alternating background sections for visual rhythm */}
                <Hero />
                <div style={{ background: 'var(--bg-dark)' }}>
                    <About />
                </div>
                <div style={{ background: 'var(--bg-darker)' }}>
                    <Skills />
                </div>
                <div style={{ background: 'var(--bg-dark)' }}>
                    <Projects />
                </div>
                <div style={{ background: 'var(--bg-darker)' }}>
                    <Education />
                </div>
                <div style={{ background: 'var(--bg-dark)' }}>
                    <Contact />
                </div>
            </main>
            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'var(--bg-darker)',
                borderTop: '1px solid rgba(192,133,82,0.1)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em'
            }}>
                © 2025 Venkatesh Gondu — gvenkatesh10082003@gmail.com
            </footer>
        </>
    );
}
