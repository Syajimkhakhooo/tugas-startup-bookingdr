import React from 'react';
import { Menu, Calendar, CalendarPlus, HeartPulse, X, LogOut, LayoutDashboard, ClipboardList, FileText, User } from 'lucide-react';

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  mobileDrawerOpen, 
  setMobileDrawerOpen,
  onLogout,
  user
}) {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return { title: 'Dashboard Pasien', sub: 'Ringkasan kesehatan dan jadwal konsultasi Anda' };
      case 'booking':
        return { title: 'Booking Jadwal Dokter', sub: 'Pilih dokter spesialis dan tentukan waktu temu' };
      case 'history':
        return { title: 'Riwayat Janji Temu', sub: 'Daftar semua jadwal konsultasi yang pernah dibuat' };
      case 'medical-records':
        return { title: 'Rekam Medis Digital', sub: 'Riwayat diagnosa, keluhan, dan tindakan medis' };
      case 'profile':
        return { title: 'Profil Pasien', sub: 'Informasi data diri dan identitas rekam medis' };
      default:
        return { title: 'MedikaConnect', sub: 'Sistem Rekam Medis Digital' };
    }
  };

  const { title, sub } = getPageTitle();

  return (
    <>
      <header className="top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="mobile-toggle-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '6px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              background: '#ffffff'
            }}
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Buka menu"
          >
            <Menu size={20} color="#0f172a" />
          </button>
          
          <div className="page-title-group">
            <h1>{title}</h1>
            <p>{sub}</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="date-badge">
            <Calendar size={14} color="#0284c7" />
            <span>Kamis, 08 Okt 2026</span>
          </div>

          {currentPage !== 'booking' && (
            <button 
              className="btn-primary-action"
              onClick={() => setCurrentPage('booking')}
            >
              <CalendarPlus size={16} />
              <span>Buat Janji Temu</span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileDrawerOpen && (
        <div className="mobile-menu-drawer" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
                  <HeartPulse size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>MedikaConnect</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rekam Medis Digital</div>
                </div>
              </div>
              <button 
                onClick={() => setMobileDrawerOpen(false)}
                style={{ padding: '6px', borderRadius: '6px', background: '#f1f5f9' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'booking', label: 'Booking', icon: CalendarPlus },
                { id: 'history', label: 'Riwayat', icon: ClipboardList },
                { id: 'medical-records', label: 'Rekam Medis', icon: FileText },
                { id: 'profile', label: 'Profil', icon: User },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileDrawerOpen(false);
                    }}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    style={{ padding: '12px 14px' }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div className="user-mini-card" style={{ marginBottom: '12px' }}>
                <div className="user-avatar-circle">
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
                <div>
                  <div className="user-info-name">{user?.name}</div>
                  <div className="user-info-role">RM: {user?.mrNumber}</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onLogout();
                }} 
                className="logout-btn"
              >
                <LogOut size={16} />
                <span>Keluar (Logout)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
