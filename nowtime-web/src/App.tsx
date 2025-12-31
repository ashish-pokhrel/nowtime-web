import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CommunitiesPage from "./pages/CommunitiesPage";
import FeedPage from "../src/components/feed/FeedPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommunitiesPage />} />
        <Route path="/feed/:groupId" element={<FeedPage />} />
        <Route path="/feed" element={<Navigate to="/feed/all" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
