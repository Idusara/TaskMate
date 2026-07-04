import React, { useState, useEffect } from 'react';
import { Users, Briefcase, CalendarCheck, Activity, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTaskers: 0,
    totalBookings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        const response = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats({
          totalUsers: data.stats.totalUsers,
          totalTaskers: data.stats.totalTaskers,
          totalBookings: data.stats.totalBookings
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <div style={{ background: 'var(--primary-color)', padding: '1rem', borderRadius: '12px', color: 'white' }}>
          <ShieldAlert size={32} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--text-main)' }}>Admin Dashboard</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Overview and System Statistics</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {/* Stat Card 1 */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '50%' }}>
            <Users size={28} />
          </div>
          <div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Users</p>
            <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: 'var(--text-main)' }}>{stats.totalUsers}</h2>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%' }}>
            <Briefcase size={28} />
          </div>
          <div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Registered Taskers</p>
            <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: 'var(--text-main)' }}>{stats.totalTaskers}</h2>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '50%' }}>
            <CalendarCheck size={28} />
          </div>
          <div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Bookings</p>
            <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: 'var(--text-main)' }}>{stats.totalBookings}</h2>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Activity size={24} color="var(--primary-color)" />
          <h2 style={{ margin: 0, color: 'var(--text-main)' }}>System Activity</h2>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Backend connection and real-time updates are functioning. The system is operating normally.
        </p>
        <div style={{ marginTop: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
          <p style={{ margin: 0, textAlign: 'center', color: 'var(--text-muted)' }}>More detailed tables and lists can be populated here directly from the /api/admin/stats endpoint.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
