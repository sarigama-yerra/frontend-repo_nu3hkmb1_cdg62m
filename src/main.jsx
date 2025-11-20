import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import UploadImage from './components/UploadImage'
import UploadSoil from './components/UploadSoil'
import Report from './components/Report'
import Test from './Test'
import './index.css'

function NotFound(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="bg-white p-8 rounded-xl shadow border">
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <a href="/" className="text-emerald-700 underline">Go back to Dashboard</a>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/upload-soil" element={<UploadSoil />} />
        <Route path="/report" element={<Report />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
