import React from 'react';
import { UserCheck, MessageSquare, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserCheck,
      number: '01',
      title: 'Compare & Choose',
      description: 'Browse local profiles, reviews, and custom hourly rates. Pick the helper that perfectly matches your budget and requirements.'
    },
    {
      icon: MessageSquare,
      number: '02',
      title: 'Schedule & Chat',
      description: 'Book a date and time that fits your life. Chat live with your selected Tasker to share photos, directions, or specific details.'
    },
    {
      icon: CreditCard,
      number: '03',
      title: 'Secure Payment & Review',
      description: 'Pay safely through our integrated platform. Funds are released only after you mark the task complete. Rate your experience!'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How <span className="text-gradient">TaskMate</span> Works</h2>
          <p className="section-subtitle">
            Three simple steps to connect with trusted local helpers and check off your to-do list.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="step-card animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="step-number-bg">{step.number}</div>
                <div className="step-icon-box">
                  <Icon size={28} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Informative Stats Section */}
        <div className="stats-box">
          <div className="stat-item">
            <div className="stat-value">98.4%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">12,500+</div>
            <div className="stat-label">Verified Local Taskers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">&lt; 30m</div>
            <div className="stat-label">Average Booking Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
