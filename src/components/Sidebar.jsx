import React from 'react';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  ClipboardList, 
  FileText, 
  User, 
  LogOut, 
  HeartPulse 
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, onLogout, user }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'booking', label: 'Booking', icon: CalendarPlus },
    { id: 'history', label: 'Riwayat', icon: ClipboardList },
    { id: 'medical-records', label: 'Rekam Medis', icon: FileText },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon-wrapper">
          <HeartPulse size={24} />
        </div>
        <div>
          <span className="brand-name">MedikaConnect</span>
          <span className="brand-sub">Rekam Medis Digital</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-mini-card">
          <div className="user-avatar-circle">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="user-info-name">{user?.name || 'Pasien Demo'}</div>
            <div className="user-info-role">RM: {user?.mrNumber || 'RM-99201'}</div>
          </div>
        </div>

        <button onClick={onLogout} className="logout-btn">
          <LogOut size={16} />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
