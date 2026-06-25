import '@/lib/sentry';
import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ActionsProvider } from '@/context/ActionsContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorBusProvider } from '@/components/ErrorBus';
import { Layout } from '@/components/Layout';
import DashboardOverview from '@/pages/DashboardOverview';
import { WorkflowPlaceholders } from '@/components/WorkflowPlaceholders';
import AdminPage from '@/pages/AdminPage';
import SchuldnerverwaltungPage from '@/pages/SchuldnerverwaltungPage';
import SchuldnerverwaltungDetailPage from '@/pages/SchuldnerverwaltungDetailPage';
import ForderungserfassungPage from '@/pages/ForderungserfassungPage';
import ForderungserfassungDetailPage from '@/pages/ForderungserfassungDetailPage';
import UeberzahlungsbearbeitungPage from '@/pages/UeberzahlungsbearbeitungPage';
import UeberzahlungsbearbeitungDetailPage from '@/pages/UeberzahlungsbearbeitungDetailPage';
import PublicFormSchuldnerverwaltung from '@/pages/public/PublicForm_Schuldnerverwaltung';
import PublicFormForderungserfassung from '@/pages/public/PublicForm_Forderungserfassung';
import PublicFormUeberzahlungsbearbeitung from '@/pages/public/PublicForm_Ueberzahlungsbearbeitung';
// <public:imports>
// </public:imports>
// <custom:imports>
// </custom:imports>

export default function App() {
  return (
    <ErrorBoundary>
      <ErrorBusProvider>
        <HashRouter>
          <ActionsProvider>
            <Routes>
              <Route path="public/6a3ce9ac1cefa9ec46d6187c" element={<PublicFormSchuldnerverwaltung />} />
              <Route path="public/6a3ce9b3ef6a8494f3a048fe" element={<PublicFormForderungserfassung />} />
              <Route path="public/6a3ce9b4ba6cf5eebd9f2f1b" element={<PublicFormUeberzahlungsbearbeitung />} />
              {/* <public:routes> */}
              {/* </public:routes> */}
              <Route element={<Layout />}>
                <Route index element={<><div className="mb-8"><WorkflowPlaceholders /></div><DashboardOverview /></>} />
                <Route path="schuldnerverwaltung" element={<SchuldnerverwaltungPage />} />
                <Route path="schuldnerverwaltung/:id" element={<SchuldnerverwaltungDetailPage />} />
                <Route path="forderungserfassung" element={<ForderungserfassungPage />} />
                <Route path="forderungserfassung/:id" element={<ForderungserfassungDetailPage />} />
                <Route path="ueberzahlungsbearbeitung" element={<UeberzahlungsbearbeitungPage />} />
                <Route path="ueberzahlungsbearbeitung/:id" element={<UeberzahlungsbearbeitungDetailPage />} />
                <Route path="admin" element={<AdminPage />} />
                {/* <custom:routes> */}
                {/* </custom:routes> */}
              </Route>
            </Routes>
          </ActionsProvider>
        </HashRouter>
      </ErrorBusProvider>
    </ErrorBoundary>
  );
}
