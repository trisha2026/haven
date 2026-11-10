import { createBrowserRouter, Navigate } from 'react-router';
import { AdminLayout, CaregiverLayout, DoctorLayout } from './layouts/index.ts';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
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
      { path: 'residents', element: <PlaceholderPage role="admin" /> },
      { path: 'caregivers', element: <PlaceholderPage role="admin" /> },
      { path: 'doctors', element: <PlaceholderPage role="admin" /> },
      { path: 'rooms', element: <PlaceholderPage role="admin" /> },
      { path: 'medications', element: <PlaceholderPage role="admin" /> },
      { path: 'pharmacy', element: <PlaceholderPage role="admin" /> },
      { path: 'attendance', element: <PlaceholderPage role="admin" /> },
      { path: 'leave-requests', element: <PlaceholderPage role="admin" /> },
      { path: 'emergency-assignments', element: <PlaceholderPage role="admin" /> },
      { path: 'incidents', element: <PlaceholderPage role="admin" /> },
      { path: 'access-requests', element: <PlaceholderPage role="admin" /> },
      { path: 'notifications', element: <PlaceholderPage role="admin" /> },
      { path: 'reports', element: <PlaceholderPage role="admin" /> },
      { path: 'audit-trail', element: <PlaceholderPage role="admin" /> },
      { path: 'settings', element: <PlaceholderPage role="admin" /> },
      { path: 'profile', element: <PlaceholderPage role="admin" /> },
      { path: 'preferences', element: <PlaceholderPage role="admin" /> },
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
