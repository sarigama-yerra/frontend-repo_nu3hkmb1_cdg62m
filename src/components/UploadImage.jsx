import { useEffect, useMemo, useState } from 'react'
import Layout from './Layout'
import { UploadCloud, Loader2 } from 'lucide-react'

export default function UploadImage(){
  const params = new URLSearchParams(window.location.search)
  const fieldId = params.get('field')
  const fields = useMemo(()=> JSON.parse(localStorage.getItem('agri_fields')||'[]'), [])
  const [selectedField, setSelectedField] = useState(fieldId || (fields[0]?.id || ''))
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(()=>{
    if(!file) return setPreview(null)
    const url = URL.createObjectURL(file)
    setPreview(url)
    return ()=> URL.revokeObjectURL(url)
  },[file])

  const analyze = async () => {
    if(!file) return
    setLoading(true)
    // Simulate AI call - replace with Django endpoint in integration
    setTimeout(()=>{
      const weeds = ['Amaranthus', 'Barnyardgrass', 'Pigweed', 'Crabgrass']
      const detected = Math.random()>0.4
      const weedType = detected ? weeds[Math.floor(Math.random()*weeds.length)] : 'None'
      const confidence = detected ? (70 + Math.floor(Math.random()*30)) : 0
      setResult({ detected, weedType, confidence })
      setLoading(false)
    }, 1400)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Upload Field Image</h2>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="border-2 border-dashed rounded-xl p-6 bg-white flex flex-col items-center justify-center text-center min-h-[220px]">
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-64 object-contain rounded"/>
              ) : (
                <>
                  <UploadCloud className="text-slate-400"/>
                  <p className="mt-2 text-slate-600">Drag and drop an image here, or click to browse</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="mt-4"/>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Field</label>
            <select value={selectedField} onChange={e=>setSelectedField(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2">
              {fields.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>

            <button onClick={analyze} disabled={!file||loading} className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-md px-4 py-2">
              {loading && <Loader2 className="animate-spin" size={16}/>} Analyze Image
            </button>

            {result && (
              <div className="mt-4 rounded-lg border p-3">
                <p className="text-sm">Weed detected: <span className={`font-semibold ${result.detected? 'text-red-600':'text-emerald-600'}`}>{result.detected? 'Yes':'No'}</span></p>
                <p className="text-sm">Weed type: <span className="font-semibold">{result.weedType}</span></p>
                <p className="text-sm">Confidence: <span className="font-semibold">{result.confidence}%</span></p>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  )
}
