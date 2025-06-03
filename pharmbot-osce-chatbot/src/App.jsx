
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CaseSelection from "./pages/CaseSelection";
import ChatInterface from "./pages/ChatInterface";
import CaseSummary from "./pages/CaseSummary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<CaseSelection />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/summary" element={<CaseSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
