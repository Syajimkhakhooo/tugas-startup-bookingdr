import React, { useState, useEffect } from 'react';
import { initialDoctors } from './data/doctors';
import { initialAppointments } from './data/appointments';
import { initialMedicalRecords } from './data/medicalRecords';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import BookingModalSuccess from './components/BookingModalSuccess';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BookingPage from './pages/BookingPage';
import HistoryPage from './pages/HistoryPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import ProfilePage from './pages/ProfilePage';

import './App.css';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('medika_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Current Active Page
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Mobile Drawer State
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Doctors
  const [doctors] = useState(initialDoctors);

  // Selected Doctor for Booking Page
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Appointments State with LocalStorage Persistence
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('medika_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  // Medical Records State
  const [medicalRecords] = useState(() => {
    const saved = localStorage.getItem('medika_medical_records');
    return saved ? JSON.parse(saved) : initialMedicalRecords;
  });

  // Booking Success Modal State
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Sync appointments to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('medika_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('medika_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('medika_user');
    }
  }, [currentUser]);

  // Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
    setSelectedDoctor(null);
  };

  const handleSelectDoctorForBooking = (doc) => {
    setSelectedDoctor(doc);
    setCurrentPage('booking');
  };

  const handleBookingSuccess = (newBooking) => {
    // Prepend or append new booking to list
    setAppointments((prev) => [newBooking, ...prev]);
    setBookingSuccessData(newBooking);
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'Dibatalkan' } : apt
      )
    );
  };

  // If user is not logged in, show LoginPage
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-layout">
      {/* Desktop Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        user={currentUser}
      />

      <div className="main-wrapper">
        {/* Top Navbar */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          mobileDrawerOpen={mobileDrawerOpen}
          setMobileDrawerOpen={setMobileDrawerOpen}
          onLogout={handleLogout}
          user={currentUser}
        />

        {/* Dynamic Pages */}
        <main style={{ flex: 1 }}>
          {currentPage === 'dashboard' && (
            <DashboardPage
              user={currentUser}
              appointments={appointments}
              medicalRecords={medicalRecords}
              doctors={doctors}
              onNavigateToBooking={() => {
                setSelectedDoctor(doctors[0]);
                setCurrentPage('booking');
              }}
              onNavigateToHistory={() => setCurrentPage('history')}
              onNavigateToRecords={() => setCurrentPage('medical-records')}
              onSelectDoctorForBooking={handleSelectDoctorForBooking}
            />
          )}

          {currentPage === 'booking' && (
            <BookingPage
              doctors={doctors}
              appointments={appointments}
              selectedDoctor={selectedDoctor || doctors[0]}
              setSelectedDoctor={setSelectedDoctor}
              onBookingSuccess={handleBookingSuccess}
            />
          )}

          {currentPage === 'history' && (
            <HistoryPage
              appointments={appointments}
              onCancelAppointment={handleCancelAppointment}
              onNavigateToBooking={() => {
                setSelectedDoctor(doctors[0]);
                setCurrentPage('booking');
              }}
            />
          )}

          {currentPage === 'medical-records' && (
            <MedicalRecordsPage
              records={medicalRecords}
              user={currentUser}
            />
          )}

          {currentPage === 'profile' && (
            <ProfilePage
              user={currentUser}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Booking Success Modal */}
      {bookingSuccessData && (
        <BookingModalSuccess
          bookingData={bookingSuccessData}
          onClose={() => {
            setBookingSuccessData(null);
            setCurrentPage('dashboard');
          }}
          onGoToHistory={() => {
            setBookingSuccessData(null);
            setCurrentPage('history');
          }}
        />
      )}
    </div>
  );
}
