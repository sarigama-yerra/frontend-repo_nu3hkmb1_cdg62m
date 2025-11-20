import { useEffect, useState } from 'react'
import Layout from './Layout'
import { MapPin, Images, FlaskConical, FileBarChart2 } from 'lucide-react'

export default function Dashboard(){
  const [fields, setFields] = useState(()=>{
    const saved = localStorage.getItem('agri_fields')
    return saved ? JSON.parse(saved) : [
      { id: 'f1', name: 'North Plot', location: 'Fresno, CA', lastUpdated: '2025-01-10T10:00:00Z' },
      { id: 'f2', name: 'East Orchard', location: 'Tulare, CA', lastUpdated: '2025-02-08T09:15:00Z' }
    ]
  })

  useEffect(()=>{
    localStorage.setItem('agri_fields', JSON.stringify(fields))
  },[fields])

  return (
    <Layout onAddField={(f)=>setFields(prev=>[f, ...prev])}>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Total Fields" value={fields.length} />
        <Stat label="Recent Activity" value={Math.max(0, Math.min(12, fields.length*2))} />
        <Stat label="Images Analyzed" value={24} />
        <Stat label="Soil Samples" value={9} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map(field=> (
          <div key={field.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-28 bg-[url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM2MjQzMTR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center" aria-hidden="true"/>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800">{field.name}</h3>
              <p className="text-sm text-slate-600 flex items-center gap-1 mt-1"><MapPin size={14}/> {field.location || '—'}</p>
              <p className="text-xs text-slate-500 mt-2">Last updated {new Date(field.lastUpdated).toLocaleDateString()}</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <a href={`/upload-image?field=${field.id}`} className="inline-flex items-center justify-center gap-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-3 py-2"><Images size={16}/> Upload Image</a>
                <a href={`/upload-soil?field=${field.id}`} className="inline-flex items-center justify-center gap-2 text-sm bg-sky-600 hover:bg-sky-700 text-white rounded-md px-3 py-2"><FlaskConical size={16}/> Soil</a>
                <a href={`/report?field=${field.id}`} className="inline-flex items-center justify-center gap-2 text-sm bg-slate-800 hover:bg-slate-900 text-white rounded-md px-3 py-2"><FileBarChart2 size={16}/> Report</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

function Stat({label, value}){
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}
