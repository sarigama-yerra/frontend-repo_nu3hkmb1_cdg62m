import { useMemo, useState } from 'react'
import Layout from './Layout'

const tips = {
  ph: 'Ideal pH: 6.0 - 7.0 for most crops',
  n: 'Nitrogen supports leafy growth',
  p: 'Phosphorus supports roots and flowering',
  k: 'Potassium supports disease resistance',
}

export default function UploadSoil(){
  const params = new URLSearchParams(window.location.search)
  const fieldId = params.get('field')
  const fields = useMemo(()=> JSON.parse(localStorage.getItem('agri_fields')||'[]'), [])
  const [selectedField, setSelectedField] = useState(fieldId || (fields[0]?.id || ''))
  const [form, setForm] = useState({ ph: 6.5, n: 50, p: 40, k: 40, om: 2.0, micro: '' })
  const [analysis, setAnalysis] = useState(null)

  const analyze = () => {
    const result = { status: 'good', warnings: [] }
    if(form.ph < 6.0) { result.status='warn'; result.warnings.push('Low pH - add lime') }
    if(form.ph > 7.5) { result.status='warn'; result.warnings.push('High pH - consider sulfur') }
    if(form.k < 35) { result.status='warn'; result.warnings.push('Low Potassium') }
    if(form.n < 30) { result.status='warn'; result.warnings.push('Low Nitrogen') }
    setAnalysis(result)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Upload Soil Data</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-xl border p-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="pH" tip={tips.ph}>
                <input type="number" step="0.1" value={form.ph} onChange={e=>setForm({...form, ph: parseFloat(e.target.value)})} className="w-full rounded-md border px-3 py-2"/>
              </Field>
              <Field label="Nitrogen (N)" tip={tips.n}>
                <input type="number" value={form.n} onChange={e=>setForm({...form, n: parseFloat(e.target.value)})} className="w-full rounded-md border px-3 py-2"/>
              </Field>
              <Field label="Phosphorus (P)" tip={tips.p}>
                <input type="number" value={form.p} onChange={e=>setForm({...form, p: parseFloat(e.target.value)})} className="w-full rounded-md border px-3 py-2"/>
              </Field>
              <Field label="Potassium (K)" tip={tips.k}>
                <input type="number" value={form.k} onChange={e=>setForm({...form, k: parseFloat(e.target.value)})} className="w-full rounded-md border px-3 py-2"/>
              </Field>
              <Field label="Organic Matter (%)">
                <input type="number" step="0.1" value={form.om} onChange={e=>setForm({...form, om: parseFloat(e.target.value)})} className="w-full rounded-md border px-3 py-2"/>
              </Field>
              <Field label="Micronutrients">
                <select value={form.micro} onChange={e=>setForm({...form, micro: e.target.value})} className="w-full rounded-md border px-3 py-2">
                  <option value="">Select...</option>
                  <option value="Zn">Zinc (Zn)</option>
                  <option value="Fe">Iron (Fe)</option>
                  <option value="B">Boron (B)</option>
                </select>
              </Field>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl border p-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Field</label>
              <select value={selectedField} onChange={e=>setSelectedField(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 mb-3">
                {fields.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>

              <button onClick={analyze} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md px-4 py-2">Save and Analyze</button>

              {analysis && (
                <div className="mt-4 rounded-lg border p-3">
                  <p className={`text-sm font-semibold ${analysis.status==='good'?'text-emerald-600':'text-amber-600'}`}>Soil Quality: {analysis.status==='good'? 'Good':'Needs Attention'}</p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                    {analysis.warnings.length ? analysis.warnings.map((w,i)=> <li key={i}>{w}</li>) : <li>No issues detected</li>}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function Field({label, tip, children}){
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        {tip && <span className="text-xs text-slate-500" title={tip}>i</span>}
      </div>
      {children}
    </div>
  )
}
