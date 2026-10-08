import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  LogOut, 
  Droplets,
  CreditCard
} from 'lucide-react';

export default function ProfilePage({ user, onLogout }) {
  return (
    <div className="content-body animate-fade-in" style={{ maxWidth: '800px' }}>
      {/* Profile Header Card */}
      <div className="card-panel" style={{ marginBottom: '24px', textAlign: 'center', position: 'relative' }}>
        <div style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary) 0%, #0369a1 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 800,
          margin: '0 auto 16px',
          boxShadow: '0 8px 16px rgba(2, 132, 199, 0.25)'
        }}>
          {user?.name ? user.name.charAt(0) : 'U'}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
          {user?.name}
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: '#0284c7', 
            background: '#e0f2fe', 
            padding: '4px 12px', 
            borderRadius: 'var(--radius-full)' 
          }}>
            No. RM: {user?.mrNumber}
          </span>

          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: '#059669', 
            background: '#ecfdf5', 
            padding: '4px 12px', 
            borderRadius: 'var(--radius-full)' 
          }}>
            BPJS Aktif
          </span>
        </div>
      </div>

      {/* Profile Details Panel */}
      <div className="card-panel" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '18px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
          Informasi Data Diri Pasien
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Mail size={18} color="#0284c7" style={{ marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Email Terdaftar</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>{user?.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <CreditCard size={18} color="#0284c7" style={{ marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Nomor Induk Kependudukan (NIK)</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>{user?.nik}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Phone size={18} color="#0284c7" style={{ marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Nomor Handphone / WhatsApp</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>{user?.phone}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Calendar size={18} color="#0284c7" style={{ marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tanggal Lahir & Jenis Kelamin</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {user?.birthDate} ({user?.gender})
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Droplets size={18} color="#ef4444" style={{ marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Golongan Darah</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>{user?.bloodType}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <MapPin size={18} color="#0d9488" style={{ marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Alamat Domisili</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>{user?.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Action Card */}
      <div className="card-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-main)' }}>Sesi Pengguna</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keluar dari akun aplikasi rekam medis ini</div>
        </div>
        <button 
          onClick={onLogout}
          className="btn-danger-outline"
          style={{ padding: '9px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LogOut size={16} />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </div>
  );
}
