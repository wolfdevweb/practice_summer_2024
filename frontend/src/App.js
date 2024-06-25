import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader";
import TaskPage from "./pages/TasksPage";
import AppsPage from "./pages/AppsPage";
import ChatPage from "./pages/ChatPage";
import ContactsPage from "./pages/ContactsPage";
import SettingsPage from "./pages/SettingsPage";
import AppSideBar from "./components/AppSideBar";
import NotesPage from "./pages/NotesPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Outlet } from "react-router-dom"; // Import Outlet

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <AppHeader />
                <AppSideBar />
                <Outlet />
              </>
            </ProtectedRoute>
          }
        >
          <Route path="" element={<TaskPage />} />
          <Route path="apps" element={<AppsPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
