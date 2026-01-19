import React from 'react';
import { ShieldAlert, Info, CheckCircle2 } from 'lucide-react';

const Disclaimer = () => {
    return (
        <div className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
            <div className="glass-card animate-fade" style={{ padding: '40px', borderRadius: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <ShieldAlert size={48} color="#D32F2F" />
                    <h1 style={{ fontSize: '2.5rem' }}>Medical Disclaimer</h1>
                </div>

                <p style={{ fontSize: '1.2rem', marginBottom: '24px', lineHeight: '1.8' }}>
                    Swasthya AI is an educational and wellness-focused tool. The diet plans generated are based on general nutritional guidelines and Indian food culture.
                </p>

                <section style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <Info color="var(--primary)" />
                        <h3 style={{ fontSize: '1.25rem' }}>Not Medical Advice</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)' }}>
                        This platform does not provide medical diagnoses, prescriptions, or treatments. Always consult with a qualified healthcare professional or a registered dietitian before making significant changes to your diet, especially if you have pre-existing medical conditions like Diabetes, BP, or PCOS.
                    </p>
                </section>

                <section style={{ backgroundColor: 'rgba(46, 125, 50, 0.05)', padding: '24px', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={20} color="var(--primary)" />
                        Our Mission
                    </h3>
                    <p>
                        Our goal is to help you reconnect with traditional Indian foods in a balanced way, making healthy eating accessible and culturally relevant.
                    </p>
                </section>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Last Updated: January 2026</p>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
