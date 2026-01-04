import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";

const Dashboard = React.lazy(() => import("dashboard/Dashboard"));
const FormDesigner = React.lazy(() => import("formDesigner/Form"));

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading Dashboard...</div>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/form"
            element={
              <Suspense fallback={<div>Loading Form...</div>}>
                <FormDesigner />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
