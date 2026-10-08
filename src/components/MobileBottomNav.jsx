import React from 'react';
import { LayoutDashboard, CalendarPlus, ClipboardList, FileText, User } from 'lucide-react';

export default function MobileBottomNav({ currentPage, setCurrentPage }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'booking', label: 'Booking', icon: CalendarPlus },
    { id: 'history', label: 'Riwayat', icon: ClipboardList },
    { id: 'medical-records', label: 'Rekam Medis', icon: FileText },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
