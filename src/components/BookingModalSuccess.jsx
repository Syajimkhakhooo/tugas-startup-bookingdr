import React from 'react';
import { CheckCircle2, Calendar, Clock, User, ArrowRight, Home } from 'lucide-react';

export default function BookingModalSuccess({ bookingData, onClose, onGoToHistory }) {
  if (!bookingData) return null;

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-card animate-scale-up">
        <div className="modal-icon-success">
          <CheckCircle2 size={40} />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
          Booking Berhasil!
        </h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          Jadwal konsultasi Anda telah berhasil didaftarkan ke sistem rekam medis.
        </p>

        <div className="booking-ticket">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
              Nomor Booking
            </span>
            <span className="status-badge menunggu" style={{ fontSize: '0.72rem' }}>
              {bookingData.status || 'Menunggu Konfirmasi'}
            </span>
          </div>
          
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284c7', margin: '6px 0 14px' }}>
            {bookingData.id}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <User size={15} color="#0284c7" />
              <strong style={{ fontWeight: 600 }}>{bookingData.doctorName}</strong>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Calendar size={15} color="#0284c7" />
              <span>{bookingData.displayDate || bookingData.date}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Clock size={15} color="#0284c7" />
              <span>Pukul {bookingData.time} WIB</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px' }}
            onClick={onClose}
          >
            <Home size={18} />
            <span>Kembali ke Dashboard</span>
          </button>

          <button 
            className="btn-outline" 
            style={{ width: '100%', padding: '10px' }}
            onClick={onGoToHistory}
          >
            <span>Lihat Riwayat Booking</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
