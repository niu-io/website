export const reviewed = "October 13, 2026";
export const comparisons = [
  {
    "slug": "new-api",
    "name": "New API",
    "intro": "New API is a straightforward way to try a model gateway. Choose Niu when model access becomes part of your business: manage Suppliers, application budgets, usage and customer billing in one place, with video jobs and saved generation history alongside text APIs. Niu is built for ongoing operation, beyond a first API call.",
    "rows": [
      {
        "category": "Access & billing",
        "feature": "From experimentation to ongoing operation",
        "niu": "Supplier management, company/workspace/key budgets, request accounting and text/video generation management",
        "alternative": "Straightforward channel configuration, API keys and a playground for getting started"
      },
      {
        "category": "Access & billing",
        "feature": "Application keys",
        "niu": "Workspace keys with model grants, expiry, revocation and rotation",
        "alternative": "API keys with restrictions; users/groups"
      },
      {
        "category": "Access & billing",
        "feature": "Spending controls",
        "niu": "Company funds plus independent workspace/key caps; outstanding reservations count",
        "alternative": "Quotas and subscriptions"
      },
      {
        "category": "Access & billing",
        "feature": "Pricing",
        "niu": "Customer tariffs are separate from Supplier offers; unresolved charges stay unknown",
        "alternative": "Expression pricing and cache accounting"
      },
      {
        "category": "Observability",
        "feature": "Request history",
        "niu": "PostgreSQL records: model, key, status, reported tokens, timing and customer charge",
        "alternative": "Usage logs and audit logs"
      },
      {
        "category": "Model access",
        "feature": "Chat endpoint",
        "niu": "POST /v1/chat/completions",
        "alternative": "POST /v1/chat/completions"
      },
      {
        "category": "Model access",
        "feature": "Model names",
        "niu": "Aliases mapped to configured upstream models",
        "alternative": "Configured models and channel mappings"
      },
      {
        "category": "Model access",
        "feature": "Upstream credentials",
        "niu": "Supplier businesses with separate credentials and model mappings",
        "alternative": "Channels; multiple upstream keys"
      },
      {
        "category": "Model access",
        "feature": "Routing",
        "niu": "Configured pools with priorities and weights",
        "alternative": "Channel priorities, weights and affinity"
      },
      {
        "category": "Model access",
        "feature": "Retries and fallbacks",
        "niu": "Bounded Chat failover after a qualified OpenRouter 401; no generic replay of uncertain requests",
        "alternative": "Configured retries and channel affinity"
      },
      {
        "category": "Model access",
        "feature": "Native text protocols",
        "niu": "Chat and Responses; Messages/Gemini require explicitly opted-in mappings and have bounded supported subsets",
        "alternative": "Chat, Responses, Messages and Gemini conversion"
      },
      {
        "category": "Model access",
        "feature": "Realtime / WebSocket",
        "niu": "No public Realtime endpoint in the current contract",
        "alternative": "Realtime and Responses WebSocket endpoints"
      },
      {
        "category": "Model access",
        "feature": "Dedicated audio APIs",
        "niu": "No public speech/transcription endpoints in the current contract",
        "alternative": "Speech, transcription and translation endpoints"
      },
      {
        "category": "Model access",
        "feature": "Reranking API",
        "niu": "No public rerank endpoint in the current contract",
        "alternative": "POST /v1/rerank"
      },
      {
        "category": "Model access",
        "feature": "Video generation management",
        "niu": "Create and track supported video jobs, restore saved inputs and history, and preview/download available results with workspace-key authorization",
        "alternative": "Video/image task APIs through JavaScript plugins; available workflows depend on the plugin"
      },
      {
        "category": "Model access",
        "feature": "Function tools",
        "niu": "Opt-in route support; the caller executes requested tools",
        "alternative": "Tools where model/channel conversion supports them"
      },
      {
        "category": "Setup",
        "feature": "Where it runs",
        "niu": "Your own gateway deployment",
        "alternative": "Your own gateway deployment"
      },
      {
        "category": "Setup",
        "feature": "Database",
        "niu": "PostgreSQL is required",
        "alternative": "SQLite, MySQL or PostgreSQL"
      },
      {
        "category": "Setup",
        "feature": "Source code",
        "niu": "Public core under MIT",
        "alternative": "AGPL-3.0"
      },
      {
        "category": "Setup",
        "feature": "Performance benchmark archive",
        "niu": "v0.2.4 historical synthetic run; see the performance section below",
        "alternative": "45fbb14 historical synthetic run; current-release performance unverified"
      }
    ],
    "decisions": [
      {
        "need": "Move an application beyond API experimentation",
        "niu": "Manage access, budgets, request records and customer charges as an ongoing workflow",
        "alternative": "Start quickly with channel and API-key configuration",
        "choice": "Choose Niu for ongoing application operations"
      },
      {
        "need": "Manage video generation alongside text access",
        "niu": "Saved inputs/history, job status and authorized result preview/download for supported routes",
        "alternative": "Plugin-based video/image tasks",
        "choice": "Choose Niu for integrated video management"
      },
      {
        "need": "Manage a shared company budget across applications",
        "niu": "Shared company funds with independent workspace and key spending caps; pending reservations count",
        "alternative": "User/group quotas and subscriptions",
        "choice": "Choose Niu for company \u2192 workspace \u2192 key spending control"
      },
      {
        "need": "Separate model supply from customer pricing",
        "niu": "Supplier identity, credentials and model mappings; customer tariffs independent of Supplier offers",
        "alternative": "Channels, model mappings and expression pricing",
        "choice": "Choose Niu for a Supplier-to-customer pricing workflow"
      },
      {
        "need": "Explain an application\u2019s model bill",
        "niu": "Trace model, workspace/key usage, timing and customer charges to persisted requests",
        "alternative": "Usage and audit logs",
        "choice": "Choose Niu when request evidence and customer-charge attribution are central"
      },
      {
        "need": "Customize and redistribute your gateway",
        "niu": "Niu-owned public core under MIT; reused modules retain their own licenses",
        "alternative": "AGPL-3.0 obligations apply",
        "choice": "Choose Niu when MIT fits your distribution requirements"
      },
      {
        "need": "Need dedicated Realtime, audio or reranking endpoints today",
        "niu": "These dedicated endpoints are outside the current public contract",
        "alternative": "Broader documented protocol and endpoint surface",
        "choice": "New API fits this requirement today"
      }
    ],
    "sources": [
      {
        "label": "Niu vs New API vs LiteLLM Proxy performance benchmark",
        "url": "/docs/guides/gateway-benchmarks/"
      },
      {
        "label": "New API capabilities, protocols and deployment",
        "url": "https://github.com/QuantumNous/new-api#capabilities"
      },
      {
        "label": "Niu routes and Suppliers",
        "url": "/docs/configuration/models/"
      },
      {
        "label": "Niu key limits and routing boundaries",
        "url": "https://github.com/niu-io/niu/blob/main/docs/product/backend-capability-checklist.md"
      },
      {
        "label": "Niu complete API contract",
        "url": "/docs/api/rest/"
      },
      {
        "label": "Niu product focus and pricing-claim requirements",
        "url": "https://github.com/niu-io/niu/blob/main/docs/product/product-focus.md"
      },
      {
        "label": "Niu video management implementation and qualification scope",
        "url": "https://github.com/niu-io/niu/blob/main/docs/releases/video-result-dashboard-verification.md"
      }
    ]
  },
  {
    "slug": "openrouter",
    "name": "OpenRouter",
    "intro": "OpenRouter gets you started with a hosted model catalog. Choose Niu when you need to manage model access as an ongoing business workflow: Suppliers, application budgets, customer billing, request records and video generation management. OpenRouter can remain an upstream service behind Niu.",
    "rows": [
      {
        "category": "Access & billing",
        "feature": "Application keys",
        "niu": "Workspace keys with model grants, expiry, revocation and rotation",
        "alternative": "API keys with expiry and management APIs"
      },
      {
        "category": "Access & billing",
        "feature": "Spending controls",
        "niu": "Company funds plus independent workspace/key caps; outstanding reservations count",
        "alternative": "USD key limit; optional daily/weekly/monthly reset"
      },
      {
        "category": "Access & billing",
        "feature": "Pricing",
        "niu": "Customer tariffs are separate from Supplier offers; unresolved charges stay unknown",
        "alternative": "Catalog charges paid with credits; BYOK is also supported"
      },
      {
        "category": "Observability",
        "feature": "Request history",
        "niu": "PostgreSQL records: model, key, status, reported tokens, timing and customer charge",
        "alternative": "Generation logs: model, Provider, key, usage, cost and timing"
      },
      {
        "category": "Observability",
        "feature": "Inspecting retries",
        "niu": "Each recorded attempt remains distinguishable from the request",
        "alternative": "Upstream Requests tab and Provider response waterfall"
      },
      {
        "category": "Observability",
        "feature": "Prompt/response capture",
        "niu": "24-hour payload retention by default; request-level opt-out; metadata remains",
        "alternative": "Metadata by default; prompt/completion storage is opt-in"
      },
      {
        "category": "Observability",
        "feature": "Where records are stored",
        "niu": "Your PostgreSQL deployment",
        "alternative": "OpenRouter-hosted logs; broadcast/export integrations are available"
      },
      {
        "category": "Model access",
        "feature": "Chat endpoint",
        "niu": "POST /v1/chat/completions",
        "alternative": "POST /api/v1/chat/completions"
      },
      {
        "category": "Model access",
        "feature": "Model names",
        "niu": "Aliases mapped to configured upstream models",
        "alternative": "Catalog model slugs"
      },
      {
        "category": "Model access",
        "feature": "Upstream credentials",
        "niu": "Supplier businesses with separate credentials and model mappings",
        "alternative": "OpenRouter credits or your Provider keys (BYOK)"
      },
      {
        "category": "Model access",
        "feature": "Routing",
        "niu": "Configured pools with priorities and weights",
        "alternative": "Provider order; price, latency or throughput sorting"
      },
      {
        "category": "Model access",
        "feature": "Retries and fallbacks",
        "niu": "Bounded Chat failover after a qualified OpenRouter 401; no generic replay of uncertain requests",
        "alternative": "Provider fallbacks; allow_fallbacks can disable them"
      },
      {
        "category": "Model access",
        "feature": "Function tools",
        "niu": "Opt-in route support; the caller executes requested tools",
        "alternative": "Routes to tool-capable Providers; caller handles execution"
      },
      {
        "category": "Setup",
        "feature": "Where it runs",
        "niu": "Your own gateway deployment",
        "alternative": "OpenRouter-hosted service"
      },
      {
        "category": "Setup",
        "feature": "Database",
        "niu": "PostgreSQL is required",
        "alternative": "No gateway database to operate"
      },
      {
        "category": "Setup",
        "feature": "Source code",
        "niu": "Public core under MIT",
        "alternative": "Hosted service; client SDKs are public"
      }
    ],
    "decisions": [
      {
        "need": "Keep gateway policy and request records under your control",
        "niu": "Operate your gateway and PostgreSQL records",
        "alternative": "Hosted gateway and logs",
        "choice": "Choose Niu"
      },
      {
        "need": "Manage company, workspace and application spending together",
        "niu": "Shared company funds plus independent workspace/key caps and pending reservations",
        "alternative": "API-key spending limits and resets",
        "choice": "Choose Niu for this financial hierarchy"
      },
      {
        "need": "Use OpenRouter alongside other model supply",
        "niu": "Keep application aliases, workspace keys and customer-price policy at your own gateway",
        "alternative": "Connect OpenRouter as an upstream service",
        "choice": "Use Niu with OpenRouter"
      },
      {
        "need": "Use a hosted catalog without running infrastructure",
        "niu": "Requires a gateway deployment and PostgreSQL",
        "alternative": "Hosted endpoint with Provider routing",
        "choice": "OpenRouter fits this requirement"
      }
    ],
    "sources": [
      {
        "label": "OpenRouter API quickstart",
        "url": "https://openrouter.ai/docs/quickstart"
      },
      {
        "label": "OpenRouter Provider routing",
        "url": "https://openrouter.ai/docs/guides/routing/provider-selection"
      },
      {
        "label": "OpenRouter key spending limits",
        "url": "https://openrouter.ai/docs/api/api-reference/api-keys/create-keys"
      },
      {
        "label": "OpenRouter logs",
        "url": "https://openrouter.ai/docs/guides/features/logs"
      },
      {
        "label": "OpenRouter BYOK",
        "url": "https://openrouter.ai/docs/guides/overview/auth/byok"
      },
      {
        "label": "Niu key limits and routing boundaries",
        "url": "https://github.com/niu-io/niu/blob/main/docs/product/backend-capability-checklist.md"
      },
      {
        "label": "Niu request logs",
        "url": "/docs/concepts/execution-observation/"
      },
      {
        "label": "Niu product focus and pricing-claim requirements",
        "url": "https://github.com/niu-io/niu/blob/main/docs/product/product-focus.md"
      }
    ]
  }
] as const;
export const overviewRows = [
  {
    "category": "Access & billing",
    "feature": "From experimentation to ongoing operation",
    "niu": "Supplier management, company/workspace/key budgets, request accounting and text/video generation management",
    "newApi": "Straightforward channel configuration, API keys and a playground for getting started",
    "openRouter": "Hosted model catalog, Provider routing and API-key limits"
  },
  {
    "category": "Model access",
    "feature": "Video generation management",
    "niu": "Create and track supported video jobs, restore saved inputs and history, and preview/download available results with workspace-key authorization",
    "newApi": "Video/image task APIs through JavaScript plugins; available workflows depend on the plugin",
    "openRouter": "Hosted video APIs and video logs; model availability depends on its catalog"
  },
  {
    "category": "Access & billing",
    "feature": "Application keys",
    "niu": "Workspace keys with model grants, expiry, revocation and rotation",
    "newApi": "API keys with restrictions; users/groups",
    "openRouter": "API keys with expiry and management APIs"
  },
  {
    "category": "Access & billing",
    "feature": "Spending controls",
    "niu": "Company funds plus independent workspace/key caps; outstanding reservations count",
    "newApi": "Quotas and subscriptions",
    "openRouter": "USD key limit; optional daily/weekly/monthly reset"
  },
  {
    "category": "Access & billing",
    "feature": "Pricing",
    "niu": "Customer tariffs are separate from Supplier offers; unresolved charges stay unknown",
    "newApi": "Expression pricing and cache accounting",
    "openRouter": "Catalog charges paid with credits; BYOK is also supported"
  },
  {
    "category": "Observability",
    "feature": "Request history",
    "niu": "PostgreSQL records: model, key, status, reported tokens, timing and customer charge",
    "newApi": "Usage logs and audit logs",
    "openRouter": "Generation logs: model, Provider, key, usage, cost and timing"
  },
  {
    "category": "Observability",
    "feature": "Inspecting retries",
    "niu": "Each recorded attempt remains distinguishable from the request",
    "newApi": "Channel retry configuration",
    "openRouter": "Upstream Requests tab and Provider response waterfall"
  },
  {
    "category": "Model access",
    "feature": "Chat endpoint",
    "niu": "POST /v1/chat/completions",
    "newApi": "POST /v1/chat/completions",
    "openRouter": "POST /api/v1/chat/completions"
  },
  {
    "category": "Model access",
    "feature": "Model names",
    "niu": "Aliases mapped to configured upstream models",
    "newApi": "Configured models and channel mappings",
    "openRouter": "Catalog model slugs"
  },
  {
    "category": "Model access",
    "feature": "Upstream credentials",
    "niu": "Supplier businesses with separate credentials and model mappings",
    "newApi": "Channels; multiple upstream keys",
    "openRouter": "OpenRouter credits or your Provider keys (BYOK)"
  },
  {
    "category": "Model access",
    "feature": "Routing",
    "niu": "Configured pools with priorities and weights",
    "newApi": "Channel priorities, weights and affinity",
    "openRouter": "Provider order; price, latency or throughput sorting"
  },
  {
    "category": "Model access",
    "feature": "Retries and fallbacks",
    "niu": "Bounded Chat failover after a qualified OpenRouter 401; no generic replay of uncertain requests",
    "newApi": "Configured retries and channel affinity",
    "openRouter": "Provider fallbacks; allow_fallbacks can disable them"
  },
  {
    "category": "Model access",
    "feature": "Function tools",
    "niu": "Opt-in route support; the caller executes requested tools",
    "newApi": "Tools where model/channel conversion supports them",
    "openRouter": "Routes to tool-capable Providers; caller handles execution"
  },
  {
    "category": "Setup",
    "feature": "Where it runs",
    "niu": "Your own gateway deployment",
    "newApi": "Your own gateway deployment",
    "openRouter": "OpenRouter-hosted service"
  },
  {
    "category": "Setup",
    "feature": "Database",
    "niu": "PostgreSQL is required",
    "newApi": "SQLite, MySQL or PostgreSQL",
    "openRouter": "No gateway database to operate"
  },
  {
    "category": "Setup",
    "feature": "Source code",
    "niu": "Public core under MIT",
    "newApi": "AGPL-3.0",
    "openRouter": "Hosted service; client SDKs are public"
  }
] as const;
