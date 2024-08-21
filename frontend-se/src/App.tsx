import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Index from "./views";
import Album from "./views/album";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/album/:id' element={<Album />} />
      </Routes>
    </Router>
  );
}
