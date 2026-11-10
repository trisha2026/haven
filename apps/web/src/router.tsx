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
import { CaregiverResidentsPage } from './pages/caregiver/CaregiverResidentsPage.tsx';
import { CaregiverResidentProfilePage } from './pages/caregiver/CaregiverResidentProfilePage.tsx';
import { CaregiverMedicationPage } from './pages/caregiver/CaregiverMedicationPage.tsx';
import { CaregiverTasksPage } from './pages/caregiver/CaregiverTasksPage.tsx';
import { CaregiverSchedulePage } from './pages/caregiver/CaregiverSchedulePage.tsx';
import { CaregiverAttendancePage } from './pages/caregiver/CaregiverAttendancePage.tsx';
import { CaregiverLeavePage } from './pages/caregiver/CaregiverLeavePage.tsx';
import { CaregiverInventoryPage } from './pages/caregiver/CaregiverInventoryPage.tsx';
import { CaregiverAssignmentsPage } from './pages/caregiver/CaregiverAssignmentsPage.tsx';
import { CaregiverNotificationsPage } from './pages/caregiver/CaregiverNotificationsPage.tsx';
import { CaregiverProfilePage } from './pages/caregiver/CaregiverProfilePage.tsx';
import { CaregiverPreferencesPage } from './pages/caregiver/CaregiverPreferencesPage.tsx';
import { CaregiverHandoverPage } from './pages/caregiver/CaregiverHandoverPage.tsx';
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboardPage.tsx';
import { DoctorResidentsPage } from './pages/doctor/DoctorResidentsPage.tsx';
import { DoctorResidentProfilePage } from './pages/doctor/DoctorResidentProfilePage.tsx';
import { DoctorMedicalRecordsPage } from './pages/doctor/DoctorMedicalRecordsPage.tsx';
import { DoctorPrescriptionsPage } from './pages/doctor/DoctorPrescriptionsPage.tsx';
import { DoctorClinicalNotesPage } from './pages/doctor/DoctorClinicalNotesPage.tsx';
import { DoctorIncidentsPage } from './pages/doctor/DoctorIncidentsPage.tsx';
import { DoctorAccessRequestsPage } from './pages/doctor/DoctorAccessRequestsPage.tsx';
import { DoctorTasksPage } from './pages/doctor/DoctorTasksPage.tsx';
import { DoctorNotificationsPage } from './pages/doctor/DoctorNotificationsPage.tsx';
import { DoctorProfilePage } from './pages/doctor/DoctorProfilePage.tsx';
import { DoctorPreferencesPage } from './pages/doctor/DoctorPreferencesPage.tsx';
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
      { path: 'residents', element: <CaregiverResidentsPage /> },
      { path: 'residents/:id', element: <CaregiverResidentProfilePage /> },
      { path: 'medications', element: <CaregiverMedicationPage /> },
      { path: 'tasks', element: <CaregiverTasksPage /> },
      { path: 'schedule', element: <CaregiverSchedulePage /> },
      { path: 'attendance', element: <CaregiverAttendancePage /> },
      { path: 'leave', element: <CaregiverLeavePage /> },
      { path: 'inventory', element: <CaregiverInventoryPage /> },
      { path: 'assignments', element: <CaregiverAssignmentsPage /> },
      { path: 'notifications', element: <CaregiverNotificationsPage /> },
      { path: 'profile', element: <CaregiverProfilePage /> },
      { path: 'preferences', element: <CaregiverPreferencesPage /> },
      { path: 'handover', element: <CaregiverHandoverPage /> },
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
      { path: 'residents', element: <DoctorResidentsPage /> },
      { path: 'residents/:id', element: <DoctorResidentProfilePage /> },
      { path: 'records', element: <DoctorMedicalRecordsPage /> },
      { path: 'medical-records', element: <Navigate to="/doctor/records" replace /> },
      { path: 'prescriptions', element: <DoctorPrescriptionsPage /> },
      { path: 'notes', element: <DoctorClinicalNotesPage /> },
      { path: 'clinical-notes', element: <Navigate to="/doctor/notes" replace /> },
      { path: 'incidents', element: <DoctorIncidentsPage /> },
      { path: 'access-requests', element: <DoctorAccessRequestsPage /> },
      { path: 'tasks', element: <DoctorTasksPage /> },
      { path: 'notifications', element: <DoctorNotificationsPage /> },
      { path: 'profile', element: <DoctorProfilePage /> },
      { path: 'preferences', element: <DoctorPreferencesPage /> },
      { path: '*', element: <PlaceholderPage role="doctor" /> },
    ],
  },

  // Global 404 Catch-All
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
