// Public claims are grounded in niu-io/niu's release matrix and API documentation.
// Keep planned capabilities separate until their release evidence is published.
export const links = {
  repo: "https://github.com/niu-io/niu",
  quickstart:
    "https://github.com/niu-io/niu/blob/main/apps/docs/src/content/docs/getting-started.mdx",
  deployment:
    "https://github.com/niu-io/niu/blob/main/apps/docs/src/content/docs/deployment/single-container.mdx",
  api: "https://github.com/niu-io/niu/blob/main/apps/docs/src/content/docs/reference/api.mdx",
  release:
    "https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md",
};

export const capabilities = [
  {
    number: "01",
    title: "Follow the work, not just the request.",
    description:
      "Follow a task through its iterations, then inspect the steps and tokens within each attempt. The analysis goal: explain accumulated time and spend, including revisions, retries and parallel work. Missing evidence stays visible.",
    label: "Task investigation",
    href: `${links.api}#standalone-execution-imports`,
  },
  {
    number: "02",
    title: "Give every cost its context.",
    description:
      "Inspect settled gateway charges and resolve referenced attempts in imported tasks. Cash cost and API-equivalent cost stay separate. Unresolved work stays visible as unknown cost.",
    label: "Usage & cost",
    href: links.api,
  },
  {
    number: "03",
    title: "See the evidence behind capacity.",
    description:
      "Inspect registered supplier accounts and submitted quota observations, with their source, units and reset times. Stale or missing evidence is labeled explicitly.",
    label: "Supplier accounts",
    href: links.api,
  },
];

export const faqs = [
  {
    question: "Can I keep my coding agent and its subscription?",
    answer:
      "That is a core integration goal: add visibility and model choices without replacing your coding agent or disrupting its existing coding-plan subscription. Compatibility must be verified per agent and plan. We do not yet claim support for every popular agent, and paid API fallback must be explicitly enabled; it is not included in your existing subscription.",
  },
  {
    question: "Where will ready-to-use models come from?",
    answer:
      "We plan to combine direct provider connections with OpenRouter as an optional fallback for broader model choice. Available models will depend on provider access and verified agent compatibility. This is planned coverage, not a promise that every model or subscription is supported today.",
  },
  {
    question: "What does model fusion mean?",
    answer:
      "Different parts of a complex task may suit different models: research, planning, writing, implementation or review. Our planned methodology uses execution evidence and controlled benchmarks to choose a model mix, then validates the complete task. Switching, repeated context, failed attempts and validation all count toward cost. A mix is useful only when it meets the same quality and latency requirements for less total spend.",
  },
  {
    question: "How can benchmarking reduce coding-agent costs?",
    answer:
      "Compare models using the same repository snapshot, agent setup and acceptance tests. Count every run, including failures, repairs and validation. A lower-cost model is useful only if it meets your quality and latency requirements. Benchmarking is a planned workflow; the interactive example above illustrates the decision, not measured savings.",
  },
  {
    question: "Do I need to route model calls through Niu?",
    answer:
      "No. Importing execution metadata and investigating tasks are independent of inference forwarding. The integrated gateway is a separate entry point for applications that need model access.",
  },
  {
    question: "Can I use it just as an AI gateway?",
    answer:
      "Yes. Configure a provider and model alias, issue a scoped client key, and call the OpenAI-compatible chat API. Task imports, benchmarks and subscriptions are optional. Provider configuration currently lives on the server.",
  },
  {
    question: "Does Niu collect prompts and source code?",
    answer:
      "The execution import contract is metadata-only by default. It excludes raw prompts, source, tool output and credentials. You choose what authorized metadata to import into your self-hosted installation.",
  },
  {
    question: "Is the first release production-ready?",
    answer:
      "Not yet. The public implementation is available for evaluation, and the first-release acceptance matrix tracks the remaining work. Native collectors, benchmark workflows, broader provider support and production qualification are still in progress.",
  },
  {
    question: "What is open source?",
    answer:
      "Niu-owned code is MIT licensed. Selected upstream modules retain their original licenses and attribution. The public core runs without a private service or enterprise license.",
  },
];

export const requestExample = `curl http://localhost:2555/v1/chat/completions \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "fast",
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'`;
