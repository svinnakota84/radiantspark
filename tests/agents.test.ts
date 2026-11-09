import test from 'node:test';
import assert from 'node:assert/strict';
import {ToolRouterCreateSessionConfigSchema,SessionPreset} from '@composio/core';
import {createHandler} from '../netlify/functions/agents.mjs';
import {AGENTS} from '../shared/agents.mjs';
const env={COMPOSIO_API_KEY:'test-only',OPENAI_API_KEY:'test-only',OPENAI_MODEL:'test-model',COMPOSIO_USER_ID:'test-owner',AGENT_ACCESS_TOKEN:'a'.repeat(32),COMPOSIO_ROLE_TOOLKITS:JSON.stringify(Object.fromEntries(AGENTS.map(a=>[a.id,['github']])))};
const req=(body:unknown,token=env.AGENT_ACCESS_TOKEN,origin='https://example.test')=>new Request('https://example.test/api/agents',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`,origin},body:JSON.stringify(body)});
test('agent status never exposes secrets or claims a live connection',async()=>{
 const result=await createHandler({})(new Request('https://example.test/api/agents'));
 const data=await result.json();assert.equal(data.state,'not_connected');assert.equal(data.roles.length,10);assert.ok(data.roles.every((r:{enabled:boolean})=>!r.enabled));
 assert.equal((await createHandler(env)(new Request('https://example.test/api/agents'))).status,200);
});
test('unauthenticated callers and hostile origins cannot run owner tools',async()=>{
 let calls=0;const handler=createHandler(env,async()=>{calls++;return {answer:'',source:'test-only',usedTools:[],mode:'read-only'};});
 assert.equal((await handler(req({agentId:'maya',prompt:'Review tasks'},'bad'))).status,401);
 assert.equal((await handler(req({agentId:'maya',prompt:'Review tasks'},env.AGENT_ACCESS_TOKEN,'https://other.test'))).status,403);
 assert.equal(calls,0);
});
test('all ten roles route to their own approved toolkit policy',async()=>{
 const seen:string[]=[];const handler=createHandler(env,async input=>{seen.push(input.agent.id);return {answer:'Isolated test response',source:'test-only',usedTools:[],mode:'read-only'};});
 for(const agent of AGENTS)assert.equal((await handler(req({agentId:agent.id,prompt:'Review supplied records'}))).status,200);
 assert.equal(new Set(seen).size,10);
});
test('invalid roles, oversized prompts and unconfigured toolkits fail closed',async()=>{
 const handler=createHandler(env,async()=>{throw Error('Must not run');});
 assert.equal((await handler(req({agentId:'unknown',prompt:'Review records'}))).status,400);
 assert.equal((await handler(req({agentId:'maya',prompt:'x'.repeat(5000)}))).status,400);
 assert.equal((await createHandler({...env,COMPOSIO_ROLE_TOOLKITS:'{}'})(req({agentId:'maya',prompt:'Review records'}))).status,503);
 assert.equal((await createHandler({})(req({agentId:'maya',prompt:'Review records'}))).status,503);
});
test('Composio SDK accepts restricted direct-tool configuration',()=>{
 const result=ToolRouterCreateSessionConfigSchema.parse({toolkits:{enable:['github']},tags:{disable:['createHint','updateHint','destructiveHint']},sessionPreset:SessionPreset.DIRECT_TOOLS,sandbox:{enable:false},manageConnections:{enable:false},proxyExecute:false});
 assert.equal(result.sessionPreset,'direct_tools');assert.equal(result.sandbox?.enable,false);assert.equal(result.proxyExecute,false);
});
