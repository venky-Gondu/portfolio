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
        // Track visitor on page load
        visitorAPI.track({ page: '/', referrer: document.referrer }).catch(err => {
            console.log('Visitor tracking failed:', err);
        });
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Education />
                <Contact />
            </main>
            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'var(--bg-darker)',
                color: 'var(--text-muted)'
            }}>
                <p>© 2025 Venkatesh Gondu. All rights reserved.</p>
            </footer>
        </>
    );
}
