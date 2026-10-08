import React, { useState, useId } from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Check, 
  Send, 
  AlertCircle, 
  User, 
  Building2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const TIME_SLOTS = ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'];

export default function BookingPage({ 
  doctors, 
  appointments, 
  selectedDoctor, 
  setSelectedDoctor, 
  onBookingSuccess 
}) {
  const dateInputId = useId();
  const complaintInputId = useId();

  // Get tomorrow's date string as standard YYYY-MM-DD
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [selectedTime, setSelectedTime] = useState('');
  const [complaint, setComplaint] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Check if a time slot is already booked for the selected doctor and date
  const isTimeBooked = (time) => {
    if (!selectedDoctor || !date) return false;
    return appointments.some(
      (apt) =>
        apt.doctorName === selectedDoctor.name &&
        apt.date === date &&
        apt.time === time &&
        apt.status !== 'Dibatalkan'
    );
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      setErrorMsg('Silakan pilih salah satu dokter terlebih dahulu.');
      return;
    }
    if (!date) {
      setErrorMsg('Silakan tentukan tanggal janji temu.');
      return;
    }
    if (!selectedTime) {
      setErrorMsg('Silakan pilih jam konsultasi yang masih tersedia.');
      return;
    }
    if (!complaint.trim()) {
      setErrorMsg('Harap tuliskan keluhan Anda sebelum melanjutkan.');
      return;
    }

    setErrorMsg('');

    // Generate auto-increment ID
    const nextNumber = appointments.length + 1;
    const bookingId = `APT-${String(nextNumber).padStart(3, '0')}`;

    const newAppointment = {
      id: bookingId,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      room: selectedDoctor.room,
      date: date,
      displayDate: formatDisplayDate(date),
      time: selectedTime,
      complaint: complaint.trim(),
      status: 'Menunggu', // "Menunggu Konfirmasi"
      createdAt: new Date().toISOString()
    };

    onBookingSuccess(newAppointment);
  };

  return (
    <div className="content-body animate-fade-in">
      {errorMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          backgroundColor: 'var(--accent-red-light)',
          color: 'var(--accent-red)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.86rem',
          marginBottom: '20px',
          border: '1px solid #fecaca'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleBookingSubmit} className="booking-container">
        {/* Left Column: Form Steps */}
        <div className="booking-steps-column">
          
          {/* STEP 1: PILIH DOKTER */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">1</div>
              <div>
                <h3>Pilih Dokter</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Pilih dokter spesialis sesuai dengan kebutuhan pemeriksaan Anda
                </p>
              </div>
            </div>

            <div className="doctor-select-grid">
              {doctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    className={`doctor-select-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      // Clear selected time if booked on new doctor
                      if (selectedTime && appointments.some(apt => apt.doctorName === doc.name && apt.date === date && apt.time === selectedTime)) {
                        setSelectedTime('');
                      }
                    }}
                  >
                    {isSelected && (
                      <div className="check-indicator">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 700 }}>
                        {doc.specialty}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {doc.schedule}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: PILIH TANGGAL */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">2</div>
              <div>
                <h3>Pilih Tanggal</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Tentukan tanggal kunjungan yang Anda rencanakan
                </p>
              </div>
            </div>

            <div className="form-group" style={{ maxWidth: '320px', marginBottom: 0 }}>
              <label htmlFor={dateInputId} className="form-label">
                Tanggal Kunjungan
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id={dateInputId}
                  type="date"
                  className="form-input"
                  min={today.toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSelectedTime('');
                  }}
                  required
                />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
                * Terpilih: {formatDisplayDate(date) || 'Belum dipilih'}
              </p>
            </div>
          </div>

          {/* STEP 3: PILIH JAM */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">3</div>
              <div>
                <h3>Pilih Jam</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Jam yang sudah digunakan dibuat otomatis disabled
                </p>
              </div>
            </div>

            <div className="time-slots-grid">
              {TIME_SLOTS.map((slot) => {
                const booked = isTimeBooked(slot);
                const isSelected = selectedTime === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={booked}
                    onClick={() => setSelectedTime(slot)}
                    className={`time-slot-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <span>{slot}</span>
                    <span className="time-slot-status">
                      {booked ? 'Penuh' : isSelected ? 'Dipilih' : 'Tersedia'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: KELUHAN */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">4</div>
              <div>
                <h3>Keluhan</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Jelaskan gejala sakit atau alasan Anda berkonsultasi
                </p>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor={complaintInputId} className="form-label">
                Keluhan Pasien
              </label>
              <textarea
                id={complaintInputId}
                className="form-textarea"
                placeholder="Tuliskan keluhan Anda..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>

        </div>

        {/* Right Column: Ringkasan & Konfirmasi */}
        <div className="booking-summary-column">
          <div className="summary-card">
            <h3 className="summary-title">Ringkasan Booking</h3>

            <div className="summary-row">
              <span className="label">Dokter</span>
              <span className="val">{selectedDoctor?.name || 'Belum dipilih'}</span>
            </div>

            <div className="summary-row">
              <span className="label">Spesialisasi</span>
              <span className="val">{selectedDoctor?.specialty || '-'}</span>
            </div>

            <div className="summary-row">
              <span className="label">Lokasi Poli</span>
              <span className="val">{selectedDoctor?.room || '-'}</span>
            </div>

            <div className="summary-row">
              <span className="label">Tanggal</span>
              <span className="val">{formatDisplayDate(date) || '-'}</span>
            </div>

            <div className="summary-row">
              <span className="label">Jam</span>
              <span className="val">{selectedTime ? `${selectedTime} WIB` : 'Belum dipilih'}</span>
            </div>

            <div className="summary-row">
              <span className="label">Keluhan</span>
              <span className="val" style={{ 
                fontStyle: complaint ? 'normal' : 'italic', 
                color: complaint ? 'var(--text-main)' : 'var(--text-subtle)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {complaint || 'Belum diisi'}
              </span>
            </div>

            <div className="summary-box">
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px', color: '#0369a1', fontWeight: 700 }}>
                <ShieldCheck size={14} />
                <span>Informasi Pendaftaran</span>
              </div>
              Pendaftaran akan diteruskan langsung ke antrean poli rekam medis. Harap hadir 15 menit sebelum jam konsultasi.
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
              disabled={!selectedDoctor || !date || !selectedTime || !complaint.trim()}
            >
              <Send size={16} />
              <span>Booking Sekarang</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
