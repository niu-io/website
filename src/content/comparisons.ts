export const reviewed = "October 30, 2026";
export const comparisons = [
  {
    "slug": "litellm",
    "name": "LiteLLM",
    "intro": "Compare two self-hosted gateways by operating model. Niu focuses on Provider management, workspace budgets and customer-charge accounting. LiteLLM offers a Proxy and Python SDK with broad Provider integrations, virtual keys, spend tracking and configurable routing. Choose against the capabilities you need today.",
    "rows": [
      {
        "category": "Access & billing",
        "feature": "From experimentation to ongoing operation",
        "niu": "Provider management, company/workspace/key budgets, request accounting and text/video generation management",
        "alternative": "Self-hosted Proxy and Python SDK with virtual keys, spend tracking and an admin UI"
      },
      {
        "category": "Model access",
        "feature": "Video generation management",
        "niu": "Create and track supported video jobs, restore saved inputs and history, and preview/download available results with workspace-key authorization",
        "alternative": "Supported video endpoints depend on the configured model and Provider"
      },
      {
        "category": "Access & billing",
        "feature": "Application keys",
        "niu": "Workspace keys with model grants, expiry, revocation and rotation",
        "alternative": "Virtual keys with model access, budgets and expiry"
      },
      {
        "category": "Access & billing",
        "feature": "Spending controls",
        "niu": "Company funds plus independent workspace/key caps; outstanding reservations count",
        "alternative": "Key, user and team budgets; configurable budget duration"
      },
      {
        "category": "Access & billing",
        "feature": "Pricing",
        "niu": "Customer tariffs are separate from Provider offers; unresolved charges stay unknown",
        "alternative": "Model cost tracking with configurable pricing"
      },
      {
        "category": "Observability",
        "feature": "Request history",
        "niu": "PostgreSQL records: model, key, status, reported tokens, timing and customer charge",
        "alternative": "Spend logs and configurable logging integrations"
      },
      {
        "category": "Observability",
        "feature": "Inspecting retries",
        "niu": "Each recorded attempt remains distinguishable from the request",
        "alternative": "Retry and fallback configuration; logging depends on configured integrations"
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
        "alternative": "Model aliases in model_list map to upstream deployments"
      },
      {
        "category": "Model access",
        "feature": "Upstream credentials",
        "niu": "Provider businesses with separate credentials and model mappings",
        "alternative": "Provider credentials configured per deployment"
      },
      {
        "category": "Model access",
        "feature": "Routing",
        "niu": "Configured pools with priorities and weights",
        "alternative": "Load balancing across deployments with configurable strategies"
      },
      {
        "category": "Model access",
        "feature": "Retries and fallbacks",
        "niu": "Bounded Chat failover after a qualified OpenRouter 401; no generic replay of uncertain requests",
        "alternative": "Configurable retries, cooldowns, timeouts and fallbacks"
      },
      {
        "category": "Model access",
        "feature": "Function tools",
        "niu": "Opt-in route support; the caller executes requested tools",
        "alternative": "Tool calling for supported models; caller executes tools"
      },
      {
        "category": "Setup",
        "feature": "Where it runs",
        "niu": "Your own gateway deployment",
        "alternative": "Self-hosted Proxy or Python SDK in your application"
      },
      {
        "category": "Setup",
        "feature": "Database",
        "niu": "PostgreSQL is required",
        "alternative": "PostgreSQL required for Proxy virtual-key management"
      },
      {
        "category": "Setup",
        "feature": "Source code",
        "niu": "Public core under MIT",
        "alternative": "Open-source core; review separate enterprise licensing terms"
      }
    ],
    "decisions": [
      {
        "need": "Use a Python SDK inside an existing application",
        "niu": "Gateway accessed through HTTP APIs",
        "alternative": "Python SDK alongside the self-hosted Proxy",
        "choice": "Choose LiteLLM for the Python SDK"
      },
      {
        "need": "Configure retries and fallbacks across deployments",
        "niu": "Bounded Chat failover after a qualified OpenRouter 401",
        "alternative": "Configurable retries, cooldowns and fallbacks",
        "choice": "Choose LiteLLM when broader routing controls are required"
      },
      {
        "need": "Separate customer charges from Provider purchase rates",
        "niu": "Customer tariffs independent of Provider offers; persisted customer-charge records",
        "alternative": "Model cost tracking and configurable pricing; validate your billing requirements",
        "choice": "Evaluate Niu for this customer-billing workflow"
      },
      {
        "need": "Manage company funds across workspaces and application keys",
        "niu": "Company funds with independent workspace/key caps and pending reservations",
        "alternative": "Key, user and team budgets",
        "choice": "Compare the budget hierarchy against your organization"
      }
    ],
    "sources": [
      {
        "label": "LiteLLM overview",
        "url": "https://docs.litellm.ai/docs/"
      },
      {
        "label": "LiteLLM virtual keys and database requirements",
        "url": "https://docs.litellm.ai/docs/proxy/virtual_keys"
      },
      {
        "label": "LiteLLM routing and fallbacks",
        "url": "https://docs.litellm.ai/docs/routing"
      },
      {
        "label": "LiteLLM video APIs",
        "url": "https://docs.litellm.ai/docs/videos"
      },
      {
        "label": "LiteLLM spend tracking",
        "url": "https://docs.litellm.ai/docs/proxy/cost_tracking"
      },
      {
        "label": "LiteLLM source and licensing",
        "url": "https://github.com/BerriAI/litellm"
      },
      {
        "label": "Niu routes and Providers",
        "url": "/docs/configuration/models/"
      },
      {
        "label": "Niu key limits and routing boundaries",
        "url": "https://github.com/niu-io/niu/blob/main/docs/product/backend-capability-checklist.md"
      }
    ]
  },
  {
    "slug": "openrouter",
    "name": "OpenRouter",
    "intro": "OpenRouter gets you started with a hosted model catalog. Choose Niu when you need to manage model access as an ongoing business workflow: Providers, application budgets, customer billing, request records and video generation management. OpenRouter can remain an upstream service behind Niu.",
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
        "niu": "Customer tariffs are separate from Provider offers; unresolved charges stay unknown",
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
        "niu": "Provider businesses with separate credentials and model mappings",
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
    "niu": "Provider management, company/workspace/key budgets, request accounting and text/video generation management",
    "openRouter": "Hosted model catalog, Provider routing and API-key limits",
    "litellm": "Self-hosted Proxy and Python SDK with virtual keys, spend tracking and an admin UI"
  },
  {
    "category": "Model access",
    "feature": "Video generation management",
    "niu": "Create and track supported video jobs, restore saved inputs and history, and preview/download available results with workspace-key authorization",
    "openRouter": "Hosted video APIs and video logs; model availability depends on its catalog",
    "litellm": "Supported video endpoints depend on the configured model and Provider"
  },
  {
    "category": "Access & billing",
    "feature": "Application keys",
    "niu": "Workspace keys with model grants, expiry, revocation and rotation",
    "openRouter": "API keys with expiry and management APIs",
    "litellm": "Virtual keys with model access, budgets and expiry"
  },
  {
    "category": "Access & billing",
    "feature": "Spending controls",
    "niu": "Company funds plus independent workspace/key caps; outstanding reservations count",
    "openRouter": "USD key limit; optional daily/weekly/monthly reset",
    "litellm": "Key, user and team budgets; configurable budget duration"
  },
  {
    "category": "Access & billing",
    "feature": "Pricing",
    "niu": "Customer tariffs are separate from Provider offers; unresolved charges stay unknown",
    "openRouter": "Catalog charges paid with credits; BYOK is also supported",
    "litellm": "Model cost tracking with configurable pricing"
  },
  {
    "category": "Observability",
    "feature": "Request history",
    "niu": "PostgreSQL records: model, key, status, reported tokens, timing and customer charge",
    "openRouter": "Generation logs: model, Provider, key, usage, cost and timing",
    "litellm": "Spend logs and configurable logging integrations"
  },
  {
    "category": "Observability",
    "feature": "Inspecting retries",
    "niu": "Each recorded attempt remains distinguishable from the request",
    "openRouter": "Upstream Requests tab and Provider response waterfall",
    "litellm": "Retry and fallback configuration; logging depends on configured integrations"
  },
  {
    "category": "Model access",
    "feature": "Chat endpoint",
    "niu": "POST /v1/chat/completions",
    "openRouter": "POST /api/v1/chat/completions",
    "litellm": "POST /v1/chat/completions"
  },
  {
    "category": "Model access",
    "feature": "Model names",
    "niu": "Aliases mapped to configured upstream models",
    "openRouter": "Catalog model slugs",
    "litellm": "Model aliases in model_list map to upstream deployments"
  },
  {
    "category": "Model access",
    "feature": "Upstream credentials",
    "niu": "Provider businesses with separate credentials and model mappings",
    "openRouter": "OpenRouter credits or your Provider keys (BYOK)",
    "litellm": "Provider credentials configured per deployment"
  },
  {
    "category": "Model access",
    "feature": "Routing",
    "niu": "Configured pools with priorities and weights",
    "openRouter": "Provider order; price, latency or throughput sorting",
    "litellm": "Load balancing across deployments with configurable strategies"
  },
  {
    "category": "Model access",
    "feature": "Retries and fallbacks",
    "niu": "Bounded Chat failover after a qualified OpenRouter 401; no generic replay of uncertain requests",
    "openRouter": "Provider fallbacks; allow_fallbacks can disable them",
    "litellm": "Configurable retries, cooldowns, timeouts and fallbacks"
  },
  {
    "category": "Model access",
    "feature": "Function tools",
    "niu": "Opt-in route support; the caller executes requested tools",
    "openRouter": "Routes to tool-capable Providers; caller handles execution",
    "litellm": "Tool calling for supported models; caller executes tools"
  },
  {
    "category": "Setup",
    "feature": "Where it runs",
    "niu": "Your own gateway deployment",
    "openRouter": "OpenRouter-hosted service",
    "litellm": "Self-hosted Proxy or Python SDK in your application"
  },
  {
    "category": "Setup",
    "feature": "Database",
    "niu": "PostgreSQL is required",
    "openRouter": "No gateway database to operate",
    "litellm": "PostgreSQL required for Proxy virtual-key management"
  },
  {
    "category": "Setup",
    "feature": "Source code",
    "niu": "Public core under MIT",
    "openRouter": "Hosted service; client SDKs are public",
    "litellm": "Open-source core; review separate enterprise licensing terms"
  }
] as const;
