const {compute,statement,DEFAULTS}=require('./calc.js');
const c=compute(DEFAULTS); let fails=0;
const eq=(n,a,b,tol=0.0006)=>{const ok=Math.abs(a-b)<=tol;if(!ok)fails++;console.log((ok?"PASS ":"FAIL ")+n,a.toFixed(4),"expected",b)};
eq("alt cost/task",c.alt,1.00); eq("xm cost/task",c.xm,0.80); eq("fee",c.fee,0.05); eq("pays",c.pay,0.85); eq("keeps",c.keep,0.15);
eq("alt $/1M",c.alt1M,0.8333); eq("xm $/1M",c.xm1M,0.6667); eq("after-fee $/1M",c.pay1M,0.7083);
eq("cap alt",c.capAlt,1000,0.5); eq("cap xm",c.capXm,1333.33,0.5);
eq("margin alt",c.mAlt,0.4444); eq("margin xm",c.mXm,0.5556); eq("margin after fee",c.mPay,0.5278);
eq("max add-on",c.maxAddOn,4.6667,0.001); eq("min uplift",c.minUplift,0.2308);
eq("max pre-fee cost (hurdle)",c.alt*(1-0.10/0.75),0.8667);
const w=compute(Object.assign({},DEFAULTS,{xmOverride:1,memory:8.2})); // add-on 9.0 -> 39/40=0.975
eq("walk-away xm",w.xm,0.975); console.log("walk-away verdict switch =",w.switch);
if(w.switch) fails++;
const s=statement(DEFAULTS,c); console.log("statement",JSON.stringify(s));
console.log(fails?`${fails} FAILED`:"ALL PASS"); process.exit(fails?1:0);
