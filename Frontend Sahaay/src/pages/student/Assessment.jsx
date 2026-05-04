import { useEffect, useMemo, useState } from 'react'

const phqQuestions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself or that you are a failure',
  'Trouble concentrating on things',
  'Moving or speaking slowly or being restless',
  'Thoughts of self harm or feeling better off not alive'
]

const gadQuestions = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Restlessness',
  'Irritability',
  'Feeling afraid something bad may happen'
]

export function Assessment() {

  const [mode, setMode] = useState('both')

  useEffect(()=>{
    const options = ['phq','gad','both']
    setMode(options[Math.floor(Math.random()*options.length)])
  }, [])

  const [phq, setPhq] = useState(Array(phqQuestions.length).fill(0))
  const [gad, setGad] = useState(Array(gadQuestions.length).fill(0))
  const [submitted, setSubmitted] = useState(false)
  const [cursor, setCursor] = useState(0)

  const queue = useMemo(()=>{
    const phqQ = phqQuestions.map((q,i)=>({ type:'phq', text:q, idx:i }))
    const gadQ = gadQuestions.map((q,i)=>({ type:'gad', text:q, idx:i }))

    if (mode==='phq') return phqQ
    if (mode==='gad') return gadQ

    const merged = [...phqQ, ...gadQ]

    for (let i=merged.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1))
      ;[merged[i], merged[j]] = [merged[j], merged[i]]
    }

    return merged
  }, [mode])

  const current = queue[cursor] || {}

  const scorePhq = phq.reduce((a,b)=>a+b,0)
  const scoreGad = gad.reduce((a,b)=>a+b,0)

  const overall = scorePhq + scoreGad
  const riskHigh = overall >= 20

  function setAnswer(value){
    if (!current) return

    if (current.type==='phq') {
      setPhq(prev=>{
        const copy=[...prev]
        copy[current.idx]=value
        return copy
      })
    } else {
      setGad(prev=>{
        const copy=[...prev]
        copy[current.idx]=value
        return copy
      })
    }
  }

  function next(){
    if (cursor < queue.length-1) setCursor(c=>c+1)
  }

  function prev(){
    if (cursor > 0) setCursor(c=>c-1)
  }

  const selectedValue =
    current?.type==='phq'
      ? phq[current.idx]
      : gad[current.idx]

  return (
    <div className="grid" style={{gap:24}}>

      <section className="card">
        <h2>Assessment</h2>
        <p>Rate from 0 to 3</p>
      </section>

      <section className="card">
        <h3>{current.type === 'phq' ? 'PHQ-9' : 'GAD-7'}</h3>

        <p>{current.text}</p>

        <input
          type="range"
          min={0}
          max={3}
          value={selectedValue}
          onChange={(e)=>setAnswer(Number(e.target.value))}
          style={{width:'100%'}}
        />

        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>0</span>
          <span>3</span>
        </div>

        <div>Selected: {selectedValue}</div>

        <div style={{marginTop:10}}>
          <button onClick={prev} disabled={cursor===0}>Back</button>
          <button onClick={next} disabled={cursor===queue.length-1}>Next</button>
        </div>
      </section>

      <section className="card">
        <h3>Results</h3>
        <p>PHQ Score: {scorePhq}</p>
        <p>GAD Score: {scoreGad}</p>
      </section>

      <section className="card">
        {!submitted ? (
          <button onClick={()=>setSubmitted(true)}>Submit</button>
        ) : (
          <div>
            <p>
              Risk:
              {riskHigh ? ' High' : ' Low'}
            </p>
          </div>
        )}
      </section>

    </div>
  )
}