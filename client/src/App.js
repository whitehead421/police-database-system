import "alertifyjs/build/css/alertify.css";
import "./styles/dark.scss";
import Announcement from "./pages/announcement/Announcement";
import OfficerList from "./pages/officerList/OfficerList";
import LicenseList from "./pages/license/LicenseList";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Internal from "./pages/internal/Internal";
import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fts from "./pages/fts/Fts";
import Report from "./pages/report/Report";
import Event from "./pages/event/Event";
import Wanted from "./pages/wanted/Wanted";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      alert("Bu sayfayı görüntülemek için giriş yapmalısınız.");
      return <Navigate to="/login" />;
    }

    return children;
  };

  const UserSpecificRoute = ({ children }) => {
    const { id } = useParams();
    if (!user) {
      alert("Bu sayfayı görüntülemek için giriş yapmalısınız.");
      return <Navigate to="/login" />;
    } else {
      if (user.rankNo >= 8 || user._id === id) {
        return children;
      } else {
        alert("Bu sayfayı görüntülemek için yetkiniz yok.");
        return <Navigate to="/" />;
      }
    }
  };

  const FtsRoute = ({ children }) => {
    if (!user) {
      alert("Bu sayfayı görüntülemek için giriş yapmalısınız.");
      return <Navigate to="/login" />;
    } else {
      if (user.rankNo >= 8 || user.isFTO) {
        return children;
      } else {
        alert("Bu sayfayı görüntülemek için yetkiniz yok.");
        return <Navigate to="/" />;
      }
    }
  };

  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="officers">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <OfficerList />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <UserSpecificRoute>
                      <Single />
                    </UserSpecificRoute>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="licenses">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <LicenseList />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="announcements"
              element={
                <ProtectedRoute>
                  <Announcement />
                </ProtectedRoute>
              }
            />
            <Route
              path="internal"
              element={
                <ProtectedRoute>
                  <Internal />
                </ProtectedRoute>
              }
            />
            <Route
              path="event"
              element={
                <ProtectedRoute>
                  <Event />
                </ProtectedRoute>
              }
            />
            <Route
              path="fts"
              element={
                <FtsRoute>
                  <Fts />
                </FtsRoute>
              }
            />
            <Route
              path="wanted"
              element={
                <ProtectedRoute>
                  <Wanted />
                </ProtectedRoute>
              }
            />
            <Route
              path="reports"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
