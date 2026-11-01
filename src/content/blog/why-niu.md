---
title: "Why Niu? The Model Platform for Agents"
description: "Niu gives coding agents model information, request evidence and management controls. You set the goals and review important decisions."
cover: "/site-assets/blog/why-niu-v3.webp"
status: "published"
pinned: true
pinOrder: 0
publishedAt: "2026-10-15"
updatedAt: "2026-10-31"
category: "Product"
author: "Niuer"
---

Coding agents already understand the goal: complete your task while making sensible tradeoffs between quality, speed, reliability and cost. What they need is access to reliable information and the controls to act on it.

**Niu is The Model Platform for Agents.** It provides those information and management capabilities. Your agent makes the task-specific decisions; Niu does not promise an optimal model or guaranteed savings.

## Give your agent information and controls

Your agent can inspect available models, declared capabilities and published customer prices, compare outputs on task samples within an approved test budget, and retrieve request timing, usage and charges directly. Missing evidence stays unknown.

Model calls are only part of the workflow. Niu also supports administrator-managed model pools and routing, scoped access and budgets, and request diagnostics. Your agent can propose a pool; current MCP tools do not administer pools or change budgets. Authorized administrators review and apply those changes.

## Keep the decisions that matter

You describe the desired result and set spending and permission boundaries. The agent retrieves the evidence and does the work within its authority. You review consequential changes, rather than carrying model lists, JSON or screenshots between systems.

If you want to investigate yourself, [browse models](/models/), try them in Niu and inspect results, latency, usage and customer charges. The dashboard remains a place to explore, review and recover.

## Start with your coding agent

Follow [Build with Niu](/docs/guides/personal-assistant/) and let your agent handle installation and configuration. A [runnable personal assistant example](https://github.com/niu-io/niu/tree/main/examples/personal-assistant) gives it a concrete starting point. The purpose is to learn how to use Niu, not to prescribe the application you should build.

The current integration uses a local MCP server and a workspace API key. Native coding-agent plugins and agent-managed event subscriptions are planned. Plugins should expose the same Niu capabilities in each host's supported form; they do not grant broader permissions or replace the agent's judgment.

## Read only what you need

This orientation and the onboarding workflow should be enough to begin. The remaining reference library is primarily for your agent to consult as needed. You can also [self-host Niu](/docs/deployment/single-container/); actual availability depends on configuration, permissions and the [release qualification](https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md).
