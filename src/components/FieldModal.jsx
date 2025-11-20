import { useState } from 'react'

export default function FieldModal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const handleSave = () => {
    if(!name.trim()) return
    onSave?.({ id: crypto.randomUUID(), name, location, lastUpdated: new Date().toISOString() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true"/>
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Field</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Field Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., North Plot"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input value={location} onChange={e=>setLocation(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="City, State"/>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 text-sm rounded-md border border-slate-300">Cancel</button>
          <button onClick={handleSave} className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Save</button>
        </div>
      </div>
    </div>
  )
}
