import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  CalendarPlus,
  XCircle,
  FileText
} from 'lucide-react';

export default function HistoryPage({ 
  appointments, 
  onCancelAppointment, 
  onNavigateToBooking 
}) {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = appointments.filter((item) => {
    const matchesFilter = filterStatus === 'Semua' || item.status === filterStatus;
    const matchesSearch = 
      item.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.complaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.specialty && item.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Menunggu':
        return <span className="status-badge menunggu">Menunggu</span>;
      case 'Dikonfirmasi':
        return <span className="status-badge dikonfirmasi">Dikonfirmasi</span>;
      case 'Selesai':
        return <span className="status-badge selesai">Selesai</span>;
      case 'Dibatalkan':
        return <span className="status-badge dibatalkan">Dibatalkan</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="content-body animate-fade-in">
      {/* Controls & Filters */}
      <div className="card-panel" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '14px' 
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: '220px', maxWidth: '380px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Cari dokter, nomor ID, atau keluhan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px', fontSize: '0.86rem' }}
            />
            <Search 
              size={16} 
              color="var(--text-subtle)" 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
            />
          </div>

          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Semua', 'Menunggu', 'Dikonfirmasi', 'Selesai'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? 'btn-primary' : 'btn-outline'}
                style={{ 
                  padding: '6px 14px', 
                  fontSize: '0.82rem', 
                  borderRadius: 'var(--radius-full)' 
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment List / Table */}
      {filteredAppointments.length === 0 ? (
        <div className="card-panel" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <AlertCircle size={40} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
            Tidak ada riwayat booking ditemukan
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            {searchQuery || filterStatus !== 'Semua' 
              ? 'Coba ganti filter status atau kata kunci pencarian Anda.' 
              : 'Anda belum memiliki jadwal janji temu yang terdaftar.'}
          </p>
          <button className="btn-primary" onClick={onNavigateToBooking}>
            <CalendarPlus size={16} />
            <span>Buat Janji Temu Sekarang</span>
          </button>
        </div>
      ) : (
        <div className="card-panel" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No. Booking</th>
                  <th>Dokter & Spesialisasi</th>
                  <th>Tanggal</th>
                  <th>Jam</th>
                  <th>Keluhan Pasien</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong style={{ color: '#0284c7', fontSize: '0.86rem' }}>{item.id}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.doctorName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.specialty}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem' }}>
                        <Calendar size={14} color="#0284c7" />
                        <span>{item.displayDate || item.date}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 600 }}>
                        <Clock size={14} color="#0284c7" />
                        <span>{item.time} WIB</span>
                      </div>
                    </td>
                    <td style={{ maxWidth: '240px' }}>
                      <span style={{ 
                        fontSize: '0.84rem', 
                        color: 'var(--text-muted)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.complaint}
                      </span>
                    </td>
                    <td>
                      {getStatusBadge(item.status)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {item.status === 'Menunggu' ? (
                        <button
                          className="btn-danger-outline"
                          title="Batalkan janji temu ini"
                          onClick={() => {
                            if (window.confirm(`Yakin ingin membatalkan booking ${item.id} dengan ${item.doctorName}?`)) {
                              onCancelAppointment(item.id);
                            }
                          }}
                        >
                          Batalkan
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
