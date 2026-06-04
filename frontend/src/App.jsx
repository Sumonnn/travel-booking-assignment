import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PackageList from "./pages/PackageList";
import PackageDetails from "./pages/PackageDetails";
import AdminAddPackage from "./pages/AdminAddPackage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/admin/packages/add" element={<AdminAddPackage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;