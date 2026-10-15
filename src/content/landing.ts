// Operator positioning; capability claims remain bounded by current supported interfaces.
export const links = {
 repo: 'https://github.com/niu-io/niu', quickstart: '/docs/getting-started/',
 deployment: '/docs/deployment/single-container/', api: '/docs/api/rest/',
 release: 'https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md',
};
export const capabilities = [
 {title:'Operate your model supply.',description:'Manage Providers, server-side credentials and model mappings. Configure route priorities and weights behind customer-facing model aliases.',label:'Models & routing',href:'/docs/configuration/models/'},
 {title:'Investigate service delivery.',description:'Follow request status, timing and recorded attempts. Keep uncertain execution visible when the upstream outcome is not confirmed.',label:'Request evidence',href:'/docs/concepts/execution-observation/'},
 {title:'Keep your accounts clear.',description:'Manage customer tariffs independently of Provider offers. Keep customer charges separate from procurement costs and Provider earnings, with explicit unresolved amounts.',label:'Usage & billing',href:'/docs/concepts/performance-and-cost/'},
 {title:'Bound customer spending.',description:'Use workspace and API-key caps alongside shared company funds. Outstanding reservations count toward supported limits before more work is admitted.',label:'Access & limits',href:'/docs/security/overview/'},
 {title:'Help customers get started.',description:'Offer a model catalog, compatible APIs and generated references. Customers use scoped workspace keys while upstream secrets stay on your server.',label:'API & SDK',href:'/docs/guides/api-quickstart/'},
 {title:'Give customers a place to work.',description:'Provide saved Chat and Video sessions, supported video job tracking, and authorized preview or download of available results.',label:'Generations',href:'/docs/reference/generations/'},
];
export const faqs = [
 {question:'Who is Niu for?',answer:'Niu is for people building a business on model aggregation and forwarding, from independent operators to platform teams. It brings model delivery, financial accounting and customer workflows together on an open-source foundation.'},
 {question:'Why build another aggregation platform?',answer:'Aggregation already has mature tools. Niu focuses on the operator’s complete business: delivering requests, keeping customer charges and supply accounts distinct, and giving customers a clear, convenient experience. Open-source control and commercial operating quality are the guiding commitments.'},
 {question:'Does Niu guarantee profit or lower prices?',answer:'No. Your economics depend on authorized supply, agreed rates, customer prices, service quality and operating costs. Niu separates pricing and accounting responsibilities; it does not guarantee margin, demand or a universal discount.'},
 {question:'Is Niu faster or more reliable than other gateways?',answer:'No universal ranking is claimed. The Rust gateway and explicit execution and accounting states support our engineering goals. Capacity, latency, protocol behavior and recovery need qualification against the actual deployment and workload; the first release remains under qualification.'},
 {question:'Can customers use their existing model clients?',answer:'For supported routes, customers can point an OpenAI-compatible client at your gateway, use a workspace API key and select a configured model alias. Protocol and model capabilities depend on the route; the guides describe their current boundaries.'},
 {question:'Can I self-host the public product?',answer:'Yes. Run the public gateway, dashboard, catalog and docs with PostgreSQL. Community operation does not require private source or an enterprise license. Model calls still reach configured upstream services. Niu-owned public code is MIT licensed; reused modules retain their licenses and attribution.'},
 {question:'Can customers see my procurement prices?',answer:'Customer workspace reports and responses expose customer charges, not Provider purchase prices or platform margins. Procurement belongs in platform administration. Provider access is scoped to that Provider’s agreed rates and settlements.'},
 {question:'What is ready to evaluate?',answer:'The development build includes model routing, workspace access and spending controls, request and customer-charge records, and saved Chat and Video interfaces. Complete release acceptance, commercial supply, merchant payments, Provider settlement, video lifecycle and broader performance and recovery qualification remain in progress. Check the release matrix for current scope.'},
 {question:'What customer content does Niu retain?',answer:'Niu stores request metadata and available usage/billing evidence. Inference content has bounded 24-hour retention by default with an explicit opt-out. Saved generation data and result availability follow their documented policies. Credentials remain server-side; see the security and observability guides for scope and access details.'},
];
export const requestExample = `curl http://localhost:2555/v1/chat/completions \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "YOUR_MODEL_ALIAS",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 64
  }'`;
