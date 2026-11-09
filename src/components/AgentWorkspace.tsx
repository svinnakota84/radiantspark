import React, {useEffect,useState} from 'react';
import {ArrowUpRight, LockKeyhole, Send, LoaderCircle, PlugZap} from 'lucide-react';
import {AGENTS} from '../../shared/agents.mjs';

const API = import.meta.env.VITE_AGENT_API_URL || '/api/agents';
export const AgentWorkspace = () => {
 const [selected,setSelected]=useState(AGENTS[0]);
 const [filter,setFilter]=useState('All roles');
 const [token,setToken]=useState('');
 const [prompt,setPrompt]=useState('');
 const [busy,setBusy]=useState(false);
 const [status,setStatus]=useState<any>(null);
 const [answer,setAnswer]=useState<any>(null);
 const [error,setError]=useState('');
 useEffect(()=>{const controller=new AbortController();fetch(API,{signal:controller.signal,cache:'no-store'}).then(r=>r.ok&&r.headers.get('content-type')?.includes('application/json')?r.json():null).then(setStatus).catch(()=>{});return ()=>controller.abort();},[]);
 const enabled=status?.roles?.find((a:any)=>a.id===selected.id)?.enabled === true;
 const choose=(agent:typeof selected)=>{setSelected(agent);setAnswer(null);setError('');};
 const submit=async(e:React.FormEvent)=>{
  e.preventDefault();setBusy(true);setAnswer(null);setError('');
  try {
   const response=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({agentId:selected.id,prompt}),signal:AbortSignal.timeout(90_000)});
   if(!response.headers.get('content-type')?.includes('application/json')) throw new Error('The secure agent backend is not connected yet. No task has run.');
   const data=await response.json();if(!response.ok) throw new Error(data.error||'The service could not complete this request.');
   if(typeof data.answer!=='string'||data.source!=='composio')throw new Error('No verified agent response was returned.');
   setAnswer(data);
  }catch(e){setError(e instanceof Error?e.message:'The agent is unavailable.');}finally{setBusy(false);}
 };
 return <section className="agent-workspace wrap" id="agent-workspace">
  <div className="section-heading"><div><p className="eyebrow">SPARKSYNC / TEAM WORKSPACE</p><h1>Ten roles.<br/><em>One clear direction.</em></h1></div><p>Specialist assistants for the work behind your business. Explore each role, then run a task through your connected apps.</p></div>
  <div className="connection-note"><PlugZap size={19}/><span>{status?.state==='configured_not_verified'?'Backend configured. A successful task verifies the connection.':'Composio is not connected on this deployment. No agents are running.'}</span></div>
  <div className="role-filter" aria-label="Filter agent roles">{['All roles','Operations','Customer experience','Finance','Technology','Governance','Growth'].map(f=><button key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f}>{f}</button>)}</div>
  <div className="workspace-grid"><div className="agent-list">{AGENTS.filter(a=>filter==='All roles'||a.area===filter).map(a=><button key={a.id} className={`agent-option ${selected.id===a.id?'selected':''}`} onClick={()=>choose(a)} aria-pressed={selected.id===a.id}><span className="agent-avatar" style={{background:a.color}}>{a.mark}</span><span><strong>{a.name}</strong><small>{a.role}</small></span><ArrowUpRight size={16}/></button>)}</div>
   <div className="agent-console"><div className="console-heading"><span className="agent-avatar large" style={{background:selected.color}}>{selected.mark}</span><div><p className="eyebrow">{selected.area}</p><h2>{selected.name}</h2><p>{selected.role}</p></div><span className="state-pill">{enabled?'Configured':'Not connected'}</span></div>
    <p>{selected.brief}</p><div className="console-scope"><LockKeyhole size={17}/><span>Owner workspace · read-only research and drafts. No payments, sending, purchases, filings or production changes.</span></div>
    <form onSubmit={submit}><label htmlFor="agent-token">Owner access token</label><input id="agent-token" type="password" autoComplete="off" value={token} onChange={e=>setToken(e.target.value)} placeholder="Enter your server-issued access token" disabled={!enabled}/><p className="field-note">Kept in this tab’s memory. Never stored in browser storage. Submitted tasks and relevant records are processed by your model provider and Composio.</p><label htmlFor="agent-task">What would you like to work on?</label><textarea id="agent-task" value={prompt} onChange={e=>setPrompt(e.target.value)} minLength={3} maxLength={4000} required placeholder={`Ask ${selected.name} to ${selected.brief.toLowerCase()}`} disabled={!enabled}/><button className="button primary" disabled={!enabled||busy||!token||prompt.trim().length<3}>{busy?<LoaderCircle className="spin" size={17}/>:<Send size={17}/>} {busy?'Working with connected sources…':'Run connected task'}</button>{!enabled&&<p className="field-note">This role needs a deployed backend, server credentials and approved app connections before it can run.</p>}</form>
    {error&&<p className="error-note" role="alert">{error}</p>}{answer&&<article className="agent-answer" aria-live="polite"><p className="eyebrow">COMPOSIO RESPONSE · {new Date(answer.completedAt).toLocaleString()}</p><p className="answer-text">{answer.answer}</p><small>Source: Composio · {answer.usedTools.length} tool types used · Request {answer.requestId}</small></article>}
   </div>
  </div>
 </section>;
};
