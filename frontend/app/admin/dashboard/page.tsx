'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/utils/api';
import { FaTrash, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaSignOutAlt } from 'react-icons/fa';
import styles from './dashboard.module.css';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    ip_address?: string;
    user_agent?: string;
    timestamp: string;
    read: boolean;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [adminInfo, setAdminInfo] = useState<any>(null);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('admin_token');
        const info = localStorage.getItem('admin_info');

        if (!token) {
            router.push('/admin/login');
            return;
        }

        if (info) {
            setAdminInfo(JSON.parse(info));
        }

        fetchContacts();
    }, [router]);

    const fetchContacts = async () => {
        try {
            const response = await adminAPI.getContacts();
            if (response.success) {
                setContacts(response.contacts);
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            const response = await adminAPI.deleteContact(id);
            if (response.success) {
                setContacts(contacts.filter(c => c._id !== id));
            }
        } catch (error) {
            alert('Failed to delete contact');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_info');
        router.push('/admin/login');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <div>
                            <h1 className={styles.title}>Admin Dashboard</h1>
                            <p className={styles.subtitle}>Welcome back, {adminInfo?.name || 'Admin'}!</p>
                        </div>
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className="container">
                    <div className={styles.stats}>
                        <div className={styles.statCard}>
                            <h3>{contacts.length}</h3>
                            <p>Total Contacts</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>{contacts.filter(c => !c.read).length}</h3>
                            <p>Unread</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>{contacts.filter(c => c.read).length}</h3>
                            <p>Read</p>
                        </div>
                    </div>

                    <div className={styles.contactsList}>
                        <h2 className={styles.sectionTitle}>Contact Submissions</h2>

                        {contacts.length === 0 ? (
                            <div className={styles.empty}>
                                <p>No contact submissions yet.</p>
                            </div>
                        ) : (
                            <div className={styles.contactsGrid}>
                                {contacts.map(contact => (
                                    <div key={contact._id} className={styles.contactCard}>
                                        <div className={styles.contactHeader}>
                                            <h3 className={styles.contactName}>{contact.name}</h3>
                                            <button
                                                onClick={() => handleDelete(contact._id)}
                                                className={styles.deleteBtn}
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>

                                        <div className={styles.contactInfo}>
                                            <div className={styles.infoItem}>
                                                <FaEnvelope className={styles.infoIcon} />
                                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                            </div>

                                            {contact.phone && (
                                                <div className={styles.infoItem}>
                                                    <FaPhone className={styles.infoIcon} />
                                                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                                </div>
                                            )}

                                            <div className={styles.infoItem}>
                                                <FaClock className={styles.infoIcon} />
                                                <span>{formatDate(contact.timestamp)}</span>
                                            </div>

                                            {contact.ip_address && (
                                                <div className={styles.infoItem}>
                                                    <FaMapMarkerAlt className={styles.infoIcon} />
                                                    <span>{contact.ip_address}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.message}>
                                            <strong>Message:</strong>
                                            <p>{contact.message}</p>
                                        </div>

                                        {contact.user_agent && (
                                            <div className={styles.userAgent}>
                                                <small>{contact.user_agent}</small>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
