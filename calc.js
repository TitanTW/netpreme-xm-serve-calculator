// XM-Serve switch calculator: pure functions (team prototype, illustrative inputs)
function compute(i){
  const gpuHr=i.gpus*i.rate;
  const altHr=gpuHr;                                   // best alternative: same GPUs, no XM-Serve
  const runAHr=gpuHr+i.support+i.switching;            // XM-Serve, existing host memory
  const runBHr=runAHr+i.memory;                        // XM-Serve plus added memory tier
  const run=i.useRun==="A"?{hr:runAHr,t:i.tasksA,q:i.qualA,p:i.p95A}:{hr:runBHr,t:i.tasksB,q:i.qualB,p:i.p95B};
  const alt=altHr/i.tasksAlt, xm=run.hr/run.t;
  const saving=Math.max(alt-xm,0), fee=i.share*saving, pay=xm+fee, keep=alt-pay, keepPct=keep/alt;
  const T=i.tokens, P=i.price;
  const per1M=(hr,t)=>hr/(t*T)*1e6, cap=t=>t*T/i.gpus/3600, margin=c=>(P-c)/P;
  const k=1-i.hurdle/(1-i.share);                      // keep% >= hurdle  <=>  xm <= alt*k
  const maxHr=run.t*alt*k, maxAddOn=maxHr-gpuHr;
  const minTasks=run.hr/(alt*k), minUplift=minTasks/i.tasksAlt-1;
  const gates={quality:run.q>=i.qualAlt, wait:run.p<=i.p95Alt, cost:keepPct>=i.hurdle-1e-9};
  const memA=runAHr/i.tasksA, memB=runBHr/i.tasksB;
  return {gpuHr,altHr,runHr:run.hr,runTasks:run.t,alt,xm,saving,fee,pay,keep,keepPct,
    alt1M:per1M(altHr,i.tasksAlt),xm1M:per1M(run.hr,run.t),pay1M:pay/T*1e6,
    capAlt:cap(i.tasksAlt),capXm:cap(run.t),
    mAlt:margin(per1M(altHr,i.tasksAlt)/1e6*1e6),mXm:margin(per1M(run.hr,run.t)),mPay:margin(pay/T*1e6),
    maxAddOn,minTasks,minUplift,gates,switch:gates.quality&&gates.wait&&gates.cost,
    memA,memB,memValue:memA-memB,uplift:run.t/i.tasksAlt-1};
}
function statement(i,c){
  const tasks=c.runTasks*i.hours, altCost=c.alt*tasks, actual=i.measured*tasks;
  const sav=Math.max(altCost-actual,0), fee=i.share*sav, final=actual+fee;
  return {tasks,altCost,actual,sav,fee,final,custSave:altCost-final,custPct:(altCost-final)/altCost,
    predErr:(c.xm-i.measured)/i.measured};
}
const DEFAULTS={gpus:10,rate:3.00,tasksAlt:30,tokens:1.2e6,price:1.50,share:0.25,hurdle:0.10,
  memory:1.20,support:0.50,switching:0.30,
  qualAlt:0.92,p95Alt:8.0,tasksA:35,qualA:0.92,p95A:6.5,tasksB:40,qualB:0.93,p95B:4.2,useRun:"B",
  hours:720,measured:0.82,signed:true,retained:0.85};
if(typeof module!=="undefined")module.exports={compute,statement,DEFAULTS};
