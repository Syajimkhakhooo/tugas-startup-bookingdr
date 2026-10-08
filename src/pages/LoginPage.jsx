import React, { useState } from 'react';
import { HeartPulse, Mail, Lock, LogIn, AlertCircle, ShieldCheck } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFillDemo = () => {
    setEmail('user@gmail.com');
    setPassword('123456');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Harap masukkan email dan password.');
      return;
    }

    // Dummy validation
    if (email === 'user@gmail.com' && password === '123456') {
      setErrorMsg('');
      onLoginSuccess({
        name: 'Budi Pratama',
        email: 'user@gmail.com',
        mrNumber: 'RM-2026-99201',
        nik: '3201123456780009',
        phone: '0812-3456-7890',
        gender: 'Laki-laki',
        birthDate: '14 Juli 1995',
        bloodType: 'O+',
        address: 'Jl. Merdeka No. 45, Jakarta Pusat'
      });
    } else {
      setErrorMsg('Email atau password salah! Gunakan akun dummy di bawah.');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card-box animate-scale-up">
        <div className="login-header">
          <div className="login-logo">
            <HeartPulse size={30} />
          </div>
          <h2>MedikaConnect</h2>
          <p>Sistem Rekam Medis & Booking Jadwal Pasien</p>
        </div>

        {/* Demo Account Banner */}
        <div className="demo-account-hint">
          <div className="demo-account-hint-text">
            <strong>Akun Dummy Tersedia:</strong>
            <div>Email: <code>user@gmail.com</code></div>
            <div>Password: <code>123456</code></div>
          </div>
          <button 
            type="button" 
            onClick={handleFillDemo}
            className="btn-fill-demo"
          >
            Isi Demo
          </button>
        </div>

        {errorMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: 'var(--accent-red-light)',
            color: 'var(--accent-red)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            marginBottom: '18px',
            border: '1px solid #fecaca'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">Alamat Email</label>
            <div style={{ position: 'relative' }}>
              <input
                id="email-input"
                type="email"
                className="form-input"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
              />
              <Mail 
                size={18} 
                color="var(--text-subtle)" 
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" htmlFor="password-input">Kata Sandi (Password)</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password-input"
                type="password"
                className="form-input"
                placeholder="Masukkan 6 digit sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
              />
              <Lock 
                size={18} 
                color="var(--text-subtle)" 
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px' }}
          >
            <LogIn size={18} />
            <span>Masuk ke Dashboard</span>
          </button>
        </form>

        <div style={{ 
          marginTop: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '6px', 
          fontSize: '0.75rem', 
          color: 'var(--text-muted)' 
        }}>
          <ShieldCheck size={14} color="#0d9488" />
          <span>Keamanan Data Pasien Terverifikasi (Tugas Harian)</span>
        </div>
      </div>
    </div>
  );
}
