import { createBrowserRouter, Navigate } from 'react-router';
import { AdminLayout, CaregiverLayout, DoctorLayout } from './layouts/index.ts';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
import { AdminResidentsPage } from './pages/admin/AdminResidentsPage.tsx';
import { AdminResidentProfilePage } from './pages/admin/AdminResidentProfilePage.tsx';
import { AdminRoomsBedsPage } from './pages/admin/AdminRoomsBedsPage.tsx';
import { AdminCaregiversPage } from './pages/admin/AdminCaregiversPage.tsx';
import { AdminDoctorsPage } from './pages/admin/AdminDoctorsPage.tsx';
import { AdminMedicationOversightPage } from './pages/admin/AdminMedicationOversightPage.tsx';
import { AdminPharmacyInventoryPage } from './pages/admin/AdminPharmacyInventoryPage.tsx';
import { AdminAttendanceShiftsPage } from './pages/admin/AdminAttendanceShiftsPage.tsx';
import { AdminLeaveManagementPage } from './pages/admin/AdminLeaveManagementPage.tsx';
import { AdminEmergencyAssignmentsPage } from './pages/admin/AdminEmergencyAssignmentsPage.tsx';
import { AdminIncidentManagementPage } from './pages/admin/AdminIncidentManagementPage.tsx';
import { AdminDoctorAccessRequestsPage } from './pages/admin/AdminDoctorAccessRequestsPage.tsx';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage.tsx';
import { AdminReportsAnalyticsPage } from './pages/admin/AdminReportsAnalyticsPage.tsx';
import { AdminAuditTrailPage } from './pages/admin/AdminAuditTrailPage.tsx';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.tsx';
import { AdminProfilePage } from './pages/admin/AdminProfilePage.tsx';
import { AdminPreferencesPage } from './pages/admin/AdminPreferencesPage.tsx';
import { CaregiverDashboardPage } from './pages/caregiver/CaregiverDashboardPage.tsx';
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboardPage.tsx';
import { PlaceholderPage } from './pages/PlaceholderPage.tsx';
import { DesignSystemPage } from './pages/DesignSystemPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

export const router = createBrowserRouter([
  // Root Redirect
  {
    path: '/',
    element: <Navigate to="/admin/dashboard" replace />,
  },

  // Design System Showcase
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },

  // 1. Administrator Workspace
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'residents', element: <AdminResidentsPage /> },
      { path: 'residents/:id', element: <AdminResidentProfilePage /> },
      { path: 'caregivers', element: <AdminCaregiversPage /> },
      { path: 'doctors', element: <AdminDoctorsPage /> },
      { path: 'rooms', element: <AdminRoomsBedsPage /> },
      { path: 'medications', element: <AdminMedicationOversightPage /> },
      { path: 'pharmacy', element: <AdminPharmacyInventoryPage /> },
      { path: 'attendance', element: <AdminAttendanceShiftsPage /> },
      { path: 'leave-requests', element: <AdminLeaveManagementPage /> },
      { path: 'leave', element: <Navigate to="/admin/leave-requests" replace /> },
      { path: 'emergency-assignments', element: <AdminEmergencyAssignmentsPage /> },
      { path: 'incidents', element: <AdminIncidentManagementPage /> },
      { path: 'access-requests', element: <AdminDoctorAccessRequestsPage /> },
      { path: 'doctor-access', element: <Navigate to="/admin/access-requests" replace /> },
      { path: 'notifications', element: <AdminNotificationsPage /> },
      { path: 'reports', element: <AdminReportsAnalyticsPage /> },
      { path: 'audit-trail', element: <AdminAuditTrailPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
      { path: 'profile', element: <AdminProfilePage /> },
      { path: 'preferences', element: <AdminPreferencesPage /> },
      { path: '*', element: <PlaceholderPage role="admin" /> },
    ],
  },

  // 2. Caregiver Workspace
  {
    path: '/caregiver',
    element: <CaregiverLayout />,
    children: [
      { index: true, element: <Navigate to="/caregiver/dashboard" replace /> },
      { path: 'dashboard', element: <CaregiverDashboardPage /> },
      { path: 'residents', element: <PlaceholderPage role="caregiver" /> },
      { path: 'medications', element: <PlaceholderPage role="caregiver" /> },
      { path: 'tasks', element: <PlaceholderPage role="caregiver" /> },
      { path: 'schedule', element: <PlaceholderPage role="caregiver" /> },
      { path: 'attendance', element: <PlaceholderPage role="caregiver" /> },
      { path: 'leave', element: <PlaceholderPage role="caregiver" /> },
      { path: 'inventory', element: <PlaceholderPage role="caregiver" /> },
      { path: 'assignments', element: <PlaceholderPage role="caregiver" /> },
      { path: 'notifications', element: <PlaceholderPage role="caregiver" /> },
      { path: 'profile', element: <PlaceholderPage role="caregiver" /> },
      { path: 'preferences', element: <PlaceholderPage role="caregiver" /> },
      { path: 'handover', element: <PlaceholderPage role="caregiver" /> },
      { path: '*', element: <PlaceholderPage role="caregiver" /> },
    ],
  },

  // 3. Doctor Workspace
  {
    path: '/doctor',
    element: <DoctorLayout />,
    children: [
      { index: true, element: <Navigate to="/doctor/dashboard" replace /> },
      { path: 'dashboard', element: <DoctorDashboardPage /> },
      { path: 'residents', element: <PlaceholderPage role="doctor" /> },
      { path: 'records', element: <PlaceholderPage role="doctor" /> },
      { path: 'prescriptions', element: <PlaceholderPage role="doctor" /> },
      { path: 'notes', element: <PlaceholderPage role="doctor" /> },
      { path: 'incidents', element: <PlaceholderPage role="doctor" /> },
      { path: 'access-requests', element: <PlaceholderPage role="doctor" /> },
      { path: 'tasks', element: <PlaceholderPage role="doctor" /> },
      { path: 'notifications', element: <PlaceholderPage role="doctor" /> },
      { path: 'profile', element: <PlaceholderPage role="doctor" /> },
      { path: 'preferences', element: <PlaceholderPage role="doctor" /> },
      { path: '*', element: <PlaceholderPage role="doctor" /> },
    ],
  },

  // Global 404 Catch-All
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
