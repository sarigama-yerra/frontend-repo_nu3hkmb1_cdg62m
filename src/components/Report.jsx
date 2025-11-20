import Layout from './Layout'
import { useMemo } from 'react'
import { Download } from 'lucide-react'

export default function Report(){
  const params = new URLSearchParams(window.location.search)
  const fieldId = params.get('field')
  const fields = useMemo(()=> JSON.parse(localStorage.getItem('agri_fields')||'[]'), [])
  const field = fields.find(f=>f.id===fieldId) || fields[0]

  const recs = [
    'Apply Potassium fertilizer at recommended rate',
    'Use pre-emergent herbicide for grassy weeds',
    'Schedule irrigation early morning to reduce disease',
  ]

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Field Report {field? `— ${field.name}`: ''}</h2>
          <button className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900"><Download size={16}/> Download PDF</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold mb-3">Image Analysis</h3>
            <div className="aspect-video rounded-lg bg-[url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM2MjQzMTR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center relative">
              <div className="absolute inset-0 border-2 border-red-500/70 rounded-lg m-6"></div>
              <div className="absolute top-4 left-4 bg-white/90 rounded px-2 py-1 text-xs">Weed: Crabgrass — 83%</div>
            </div>
          </section>

          <section className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold mb-3">Soil Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <Gauge label="pH" value={6.4} good={[6,7.2]} />
              <Gauge label="Nitrogen" value={32} good={[30,60]} />
              <Gauge label="Phosphorus" value={44} good={[35,70]} />
              <Gauge label="Potassium" value={28} good={[35,70]} />
            </div>
            <div className="mt-3 text-amber-700 text-sm">Warning: Low Potassium</div>
          </section>
        </div>

        <section className="mt-6 bg-white rounded-xl border p-4">
          <h3 className="font-semibold mb-3">Recommendations</h3>
          <ul className="list-disc pl-5 text-slate-700">
            {recs.map((r,i)=> <li key={i} className="mb-1">{r}</li>)}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

function Gauge({label, value, good}){
  const min = 0, max = 100
  const pct = Math.max(0, Math.min(100, (value-min)/(max-min)*100))
  const ok = value>=good[0] && value<=good[1]
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-sm">
        <span className="text-slate-700">{label}</span>
        <span className={`font-semibold ${ok? 'text-emerald-600':'text-amber-600'}`}>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full ${ok? 'bg-emerald-500':'bg-amber-500'}`} style={{width: pct+'%'}}></div>
      </div>
    </div>
  )
}
