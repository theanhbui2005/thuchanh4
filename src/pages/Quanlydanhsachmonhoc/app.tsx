import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectManagement from "./SubjectManagement"; // Đường dẫn đã đúng?

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Trang chủ</h1>} />
                <Route path="/quanlydanhsachmonhoc" element={<SubjectManagement />} />
            </Routes>
        </Router>
    );
}

export default App;
