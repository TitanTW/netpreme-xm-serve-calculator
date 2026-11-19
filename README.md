# XM-Serve switch calculator (team prototype)

Prototype for the Netpreme × HBSA PM Case Competition 2026. It helps a cloud operator's inference lead decide whether to move one AI workload to XM-Serve: same quality, same speed, lower all-in cost per successful task. Netpreme charges an agreed share of measured savings.

**Live:** https://titantw.github.io/netpreme-xm-serve-calculator/

## Screens
1. **Workload**: GPUs, cost per GPU-hour, tokens per task, operator price, XM-Serve added costs, savings share, buyer hurdle.
2. **Replay results**: quality, 95th-percentile wait and successful tasks per hour for the best alternative, Run A (XM-Serve) and Run B (XM-Serve plus added memory). The gap between A and B isolates the value of extra memory.
3. **Cost and verdict**: switch or keep, the three tests, money flow per task, cost per 1M tokens, capacity per GPU, operator margin, break-evens and sliders.
4. **Savings statement**: monthly bill on measured savings and a six-measure scorecard.

## Check
`node test.js` confirms the calculator reproduces the figures in our deck and memo ($1.00 → $0.80 before fee, $0.05 fee, $0.85 paid; $0.833 → $0.667 per 1M tokens; 1,000 → 1,333 tokens/s per GPU; 44.4% → 52.8% margin; walk-away at $4.67/hr added cost or under +23% tasks).

All defaults are illustrative team assumptions, not customer results. Not a Netpreme product.
