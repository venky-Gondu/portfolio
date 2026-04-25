'use client';

import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { contactAPI } from '@/utils/api';
import styles from './Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        try {
            const response = await contactAPI.submit(formData);
            if (response.success) {
                setStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus({ type: 'error', message: response.error || 'Something went wrong. Please try again.' });
            }
        } catch (error: any) {
            setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <div className={styles.contactContainer}>
                    {/* Info Panel */}
                    <div className={styles.contactInfo}>
                        <h3 className={styles.infoTitle}>Let's Work Together</h3>
                        <p className={styles.infoText}>
                            I'm actively seeking opportunities in Backend Development and AI/ML.
                            Reach out to discuss collaborations, job opportunities, or just to say hi.
                        </p>

                        <div className={styles.contactItems}>
                            <a href="mailto:gvenkatesh10082003@gmail.com" className={styles.contactItem}>
                                <span className={styles.iconWrap}><FaEnvelope /></span>
                                <div>
                                    <div className={styles.itemLabel}>Email</div>
                                    <div className={styles.itemValue}>gvenkatesh10082003@gmail.com</div>
                                </div>
                            </a>

                            <a href="tel:+919347367184" className={styles.contactItem}>
                                <span className={styles.iconWrap}><FaPhone /></span>
                                <div>
                                    <div className={styles.itemLabel}>Phone</div>
                                    <div className={styles.itemValue}>+91 9347 367 184</div>
                                </div>
                            </a>

                            <div className={styles.contactItem}>
                                <span className={styles.iconWrap}><FaMapMarkerAlt /></span>
                                <div>
                                    <div className={styles.itemLabel}>Location</div>
                                    <div className={styles.itemValue}>Visakhapatnam, Andhra Pradesh</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.socialLinks}>
                            <a href="https://github.com/venky-gondu" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/venkatesh-gondu" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Full Name *</label>
                            <input type="text" id="name" name="name" className="input"
                                value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address *</label>
                            <input type="email" id="email" name="email" className="input"
                                value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" className="input"
                                value={formData.phone} onChange={handleChange} placeholder="+91 9XXXXXXXXX" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" name="message" className="input"
                                value={formData.message} onChange={handleChange} required rows={5}
                                placeholder="Tell me about your project or opportunity..." />
                        </div>

                        {status.type && (
                            <div className={`${styles.statusMessage} ${styles[status.type]}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                            {loading ? (<><span className="spinner"></span>Sending...</>) : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
