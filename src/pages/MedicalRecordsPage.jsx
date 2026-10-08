import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  User, 
  Activity, 
  Stethoscope, 
  Pill, 
  Search, 
  ShieldCheck, 
  ClipboardCheck,
  Building2 
} from 'lucide-react';

export default function MedicalRecordsPage({ records, user }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.doctorName.toLowerCase().includes(term) ||
      r.diagnosis.toLowerCase().includes(term) ||
      r.complaint.toLowerCase().includes(term) ||
      r.action.toLowerCase().includes(term) ||
      r.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="content-body animate-fade-in">
      {/* Patient Medical ID Header Banner */}
      <div className="card-panel" style={{ 
        marginBottom: '20px', 
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        borderColor: '#a7f3d0' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: 'var(--radius-md)', 
              background: '#10b981', 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <ClipboardCheck size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065f46' }}>
                Buku Rekam Medis Elektronik (RME)
              </h2>
              <div style={{ fontSize: '0.82rem', color: '#047857' }}>
                Nomor Pasien: <strong>{user?.mrNumber || 'RM-2026-99201'}</strong> • Nama: <strong>{user?.name || 'Budi Pratama'}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#047857', background: '#ffffff', padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1px solid #6ee7b7' }}>
            <ShieldCheck size={14} color="#059669" />
            <span>Kerahasiaan Medis Terenkripsi</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card-panel" style={{ marginBottom: '20px', padding: '14px 20px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Cari berdasarkan dokter, diagnosa, keluhan, atau tindakan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
          <Search 
            size={16} 
            color="var(--text-subtle)" 
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
          />
        </div>
      </div>

      {/* Record List */}
      {filteredRecords.length === 0 ? (
        <div className="card-panel" style={{ textAlign: 'center', padding: '40px' }}>
          <FileText size={40} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontWeight: 700, color: 'var(--text-main)' }}>Data Rekam Medis Tidak Ditemukan</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Silakan ubah kata kunci pencarian Anda.
          </p>
        </div>
      ) : (
        <div>
          {filteredRecords.map((item) => (
            <div key={item.id} className="record-card">
              <div className="record-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ 
                    fontSize: '0.82rem', 
                    fontWeight: 800, 
                    color: '#0284c7', 
                    background: '#e0f2fe', 
                    padding: '3px 10px', 
                    borderRadius: 'var(--radius-sm)' 
                  }}>
                    {item.id}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <Calendar size={14} color="#0284c7" />
                    <span>{item.displayDate}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Building2 size={14} color="#0d9488" />
                    <span>{item.facility || item.specialty}</span>
                  </div>
                </div>

                <span className="status-badge selesai">
                  {item.status || 'Selesai'}
                </span>
              </div>

              {/* Doctor */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: 'var(--primary-light)', 
                  color: 'var(--primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Stethoscope size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.doctorName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.specialty}
                  </div>
                </div>
              </div>

              {/* Grid Details: Keluhan, Diagnosa, Tindakan */}
              <div className="record-details-grid">
                <div className="detail-block">
                  <label>Keluhan Pasien</label>
                  <span>{item.complaint}</span>
                </div>

                <div className="detail-block">
                  <label>Diagnosa Dokter</label>
                  <span style={{ color: '#0369a1', fontWeight: 700 }}>
                    {item.diagnosis}
                  </span>
                </div>

                <div className="detail-block" style={{ gridColumn: 'span 2' }}>
                  <label>Tindakan Medis</label>
                  <span>{item.action}</span>
                </div>

                {item.prescriptions && (
                  <div className="detail-block" style={{ gridColumn: 'span 2', borderTop: '1px dashed #cbd5e1', paddingTop: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669' }}>
                      <Pill size={12} />
                      <span>Terapi & Resep Obat</span>
                    </label>
                    <span style={{ color: '#0f172a' }}>{item.prescriptions}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
