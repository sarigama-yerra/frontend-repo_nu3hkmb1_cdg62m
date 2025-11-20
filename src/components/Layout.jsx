import { NavLink } from 'react-router-dom'
import { Sprout, Image as ImageIcon, FlaskConical, FileBarChart2, Plus } from 'lucide-react'
import { useState } from 'react'
import FieldModal from './FieldModal'

export default function Layout({ children, onAddField }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-50 text-slate-800">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Sprout className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm leading-tight text-slate-500">AI-Driven Agricultural Innovations</p>
              <h1 className="font-bold tracking-tight -mt-0.5">Crop Quality & Weed Management</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'bg-emerald-100 text-emerald-700':'text-slate-700 hover:bg-slate-100'}`}>Dashboard</NavLink>
            <NavLink to="/upload-image" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'bg-emerald-100 text-emerald-700':'text-slate-700 hover:bg-slate-100'}`}><div className="flex items-center gap-2"><ImageIcon size={16}/> Upload Image</div></NavLink>
            <NavLink to="/upload-soil" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'bg-emerald-100 text-emerald-700':'text-slate-700 hover:bg-slate-100'}`}><div className="flex items-center gap-2"><FlaskConical size={16}/> Soil Data</div></NavLink>
            <NavLink to="/report" className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive? 'bg-emerald-100 text-emerald-700':'text-slate-700 hover:bg-slate-100'}`}><div className="flex items-center gap-2"><FileBarChart2 size={16}/> Report</div></NavLink>
          </nav>

          <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-3 py-2 rounded-md shadow">
            <Plus size={16}/> Add New Field
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} AgriAI Platform</p>
          <p className="hidden sm:block">Built for farmers • Accessible • Mobile-first</p>
        </div>
      </footer>

      {open && (
        <FieldModal onClose={()=>setOpen(false)} onSave={(field)=>{onAddField?.(field); setOpen(false)}} />
      )}
    </div>
  )
}
