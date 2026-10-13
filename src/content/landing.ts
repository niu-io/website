// Public claims follow Niu's product focus and current supported interfaces.
export const links = {
 repo: 'https://github.com/niu-io/niu', quickstart: '/docs/getting-started/',
 deployment: '/docs/deployment/single-container/', api: '/docs/api/rest/',
 release: 'https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md',
};
export const capabilities = [
 {title:'Connect your model supply.',description:'Manage Suppliers, their credentials and model mappings. Give applications stable model aliases while keeping upstream secrets on your server.',label:'Models & routing',href:'/docs/configuration/models/'},
 {title:'Keep application spending in scope.',description:'Use workspace and API-key spending caps alongside shared company funds. Outstanding reservations count toward supported limits.',label:'Access & limits',href:'/docs/security/overview/'},
 {title:'Understand each request.',description:'Inspect status, timing, reported tokens and customer charges. Missing usage or an unresolved charge remains visible instead of becoming an invented zero.',label:'Request logs',href:'/docs/concepts/execution-observation/'},
 {title:'Manage text and video together.',description:'Keep saved Chat and Video sessions. Track supported Seedance video jobs, inspect their original execution context, and preview or download available results with your workspace key.',label:'Generations',href:'/docs/reference/generations/'},
 {title:'Keep pricing and supply separate.',description:'Manage customer tariffs independently of Supplier offers. Customer reports show customer charges, with request records for investigation.',label:'Usage & billing',href:'/docs/concepts/performance-and-cost/'},
 {title:'Build on public interfaces.',description:'Use compatible model APIs and a typed JavaScript client. REST and SDK references are generated from the contract and source.',label:'API & SDK',href:'/docs/guides/api-quickstart/'},
];
export const faqs = [
 {question:'What is Niu for?',answer:'Niu is a model API gateway for developers and teams. It connects model supply with application access, workspace spending controls, request usage and customer billing. Saved text and video generation workflows are part of the product.'},
 {question:'Can I use my existing model client?',answer:'For supported routes, point an OpenAI-compatible client at your Niu gateway, use a workspace API key and select a configured model alias. Protocol and model capabilities depend on the route; the guides describe their current boundaries.'},
 {question:'Is Niu always cheaper?',answer:'No universal saving is promised. Lower-cost access is the product direction, through qualified Supplier offers. Compare a specific model, workload, currency and effective customer price before choosing; configured personal upstream keys are separate from commercial offers.'},
 {question:'How does video management work?',answer:'Niu provides saved inputs and history, supported job submission and status tracking, and authorized preview/download of available results. Seedance uses a configured FastRouter/Volcengine-compatible route. Materials and verification depend on its permissions and availability. Result expiry is separate from task success; complete model and video workflows still require qualification.'},
 {question:'Can I self-host Niu?',answer:'Yes. Run the public gateway, dashboard, catalog and docs with PostgreSQL on infrastructure you control. The community core does not require a private service or enterprise license. Model calls still reach the upstream service configured for that route.'},
 {question:'What does Niu retain?',answer:'Niu stores request metadata and available usage/billing evidence. Inference content has bounded 24-hour retention by default with an explicit opt-out; result availability follows the documented retention policy. Credentials remain server-side. See the security and observability guides for scope and access details.'},
 {question:'Is the first release production-qualified?',answer:'Not yet. The development build is available for evaluation. The release matrix tracks remaining model/Provider conformance, video lifecycle, commercial qualification and deployment/recovery checks.'},
 {question:'What is the license?',answer:'Niu-owned public code is MIT licensed. Selected upstream modules keep their original licenses and attribution.'},
];
export const requestExample = `curl http://localhost:2555/v1/chat/completions \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "YOUR_MODEL_ALIAS",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 64
  }'`;
