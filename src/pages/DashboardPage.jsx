import React from 'react';
import { 
  CalendarPlus, 
  Clock, 
  Calendar, 
  FileText, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Stethoscope, 
  Building2,
  Star
} from 'lucide-react';

export default function DashboardPage({ 
  user, 
  appointments, 
  medicalRecords, 
  doctors, 
  onNavigateToBooking,
  onNavigateToHistory,
  onNavigateToRecords,
  onSelectDoctorForBooking
}) {
  // Find upcoming appointment (e.g., status is "Menunggu" or "Dikonfirmasi")
  const upcomingAppointment = appointments.find(
    (item) => item.status === 'Menunggu' || item.status === 'Dikonfirmasi'
  );

  const completedVisitsCount = appointments.filter((item) => item.status === 'Selesai').length;

  return (
    <div className="content-body animate-fade-in">
      {/* Welcome Banner */}
      <div className="welcome-hero">
        <div className="welcome-text">
          <h2>Halo, {user?.name || 'Pasien'} 👋</h2>
          <p>
            Selamat datang di Portal Rekam Medis & Booking Dokter. Jadwalkan konsultasi kesehatan Anda dengan mudah, cepat, dan teratur.
          </p>
        </div>
        <button 
          className="btn-primary" 
          style={{ 
            backgroundColor: '#ffffff', 
            color: '#0284c7', 
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            fontWeight: 700
          }}
          onClick={onNavigateToBooking}
        >
          <CalendarPlus size={18} />
          <span>Buat Janji Temu Sekarang</span>
        </button>
      </div>

      {/* Quick Statistics */}
      <div className="quick-stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{appointments.length}</div>
            <div className="stat-label">Total Booking Jadwal</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{completedVisitsCount}</div>
            <div className="stat-label">Jumlah Riwayat Kunjungan</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f3e8ff', color: '#9333ea' }}>
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{medicalRecords.length}</div>
            <div className="stat-label">Data Rekam Medis Tersimpan</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-value">Aktif</div>
            <div className="stat-label">Status Pasien & BPJS</div>
          </div>
        </div>
      </div>

      {/* Janji Temu Berikutnya */}
      <div className="upcoming-box">
        <div className="upcoming-header">
          <h3>
            <Clock size={20} color="#0284c7" />
            <span>Janji Temu Berikutnya</span>
          </h3>
          {upcomingAppointment && (
            <button 
              onClick={onNavigateToHistory} 
              style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Lihat Semua <ChevronRight size={14} />
            </button>
          )}
        </div>

        {upcomingAppointment ? (
          <div className="upcoming-card-content">
            <div className="upcoming-doctor-info">
              <div className="brand-icon-wrapper" style={{ width: '48px', height: '48px' }}>
                <Stethoscope size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  {upcomingAppointment.doctorName}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {upcomingAppointment.specialty} • {upcomingAppointment.room || 'Poli Terkait'}
                </div>
              </div>
            </div>

            <div className="upcoming-details-grid">
              <div className="upcoming-detail-item">
                <Calendar size={16} />
                <span>{upcomingAppointment.displayDate || upcomingAppointment.date}</span>
              </div>
              <div className="upcoming-detail-item">
                <Clock size={16} />
                <span>Pukul {upcomingAppointment.time} WIB</span>
              </div>
            </div>

            <div>
              <span className={`status-badge ${upcomingAppointment.status.toLowerCase()}`}>
                {upcomingAppointment.status}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ 
            padding: '24px', 
            textAlign: 'center', 
            background: 'var(--bg-muted)', 
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)' 
          }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Belum ada jadwal janji temu aktif yang akan datang.</p>
            <button 
              className="btn-primary" 
              style={{ padding: '8px 16px', fontSize: '0.84rem' }}
              onClick={onNavigateToBooking}
            >
              Jadwalkan Konsultasi Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Daftar Dokter yang Tersedia */}
      <div>
        <div className="section-head">
          <div>
            <h3>Daftar Dokter yang Tersedia</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Pilih dokter spesialis untuk konsultasi langsung di poli
            </p>
          </div>
          <button 
            className="btn-outline" 
            style={{ fontSize: '0.82rem', padding: '6px 14px' }}
            onClick={onNavigateToBooking}
          >
            Booking Dokter
          </button>
        </div>

        <div className="doctor-grid">
          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-card-top">
                <img 
                  src={doc.avatar} 
                  alt={doc.name} 
                  className="doctor-avatar-lg"
                />
                <div style={{ minWidth: 0 }}>
                  <span className="doctor-badge-specialty">{doc.specialty}</span>
                  <h4 className="doctor-name-title">{doc.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#d97706', marginTop: '3px' }}>
                    <Star size={13} fill="#d97706" />
                    <strong>{doc.rating}</strong>
                    <span style={{ color: 'var(--text-subtle)' }}>({doc.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="doctor-meta-list">
                <div className="doctor-meta-item">
                  <Clock size={14} color="#0284c7" />
                  <span>{doc.schedule}</span>
                </div>
                <div className="doctor-meta-item">
                  <Building2 size={14} color="#0d9488" />
                  <span>{doc.room}</span>
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', fontSize: '0.84rem', padding: '8px 12px' }}
                onClick={() => onSelectDoctorForBooking(doc)}
              >
                <CalendarPlus size={15} />
                <span>Pilih & Booking</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
