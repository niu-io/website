import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  capabilities,
  capabilityGroups,
  codeExamples,
  faqs,
  heroPillars,
  pipelineStages,
  stackComponents,
} from "../src/content/landing.ts";
import { benchmarkSuites } from "../src/content/benchmarks.ts";

const UUID_PATTERN =
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i;

test("landing content provides complete bilingual copy and respects Niu brand rules", () => {
  assert.equal(heroPillars.length, 3);
  for (const pillar of heroPillars) {
    assert.ok(pillar.tag && pillar.tagZh);
    assert.ok(pillar.title && pillar.titleZh);
    assert.ok(pillar.detail && pillar.detailZh);
  }

  assert.equal(pipelineStages.length, 4);
  for (const stage of pipelineStages) {
    assert.ok(stage.title && stage.titleZh);
    assert.ok(stage.detail && stage.detailZh);
  }

  for (const group of capabilityGroups) {
    assert.ok(group.title && group.titleZh);
    assert.ok(group.summary && group.summaryZh);
    const items = capabilities.filter((item) => item.group === group.id);
    assert.ok(items.length >= 2);
  }

  for (const item of [...capabilities, ...stackComponents, ...faqs]) {
    const serialized = JSON.stringify(item);
    assert.ok(
      !serialized.includes("牛刀"),
      "Retired Chinese name must not appear",
    );
    assert.ok(!UUID_PATTERN.test(serialized), "Internal UUIDs must not appear");
  }

  for (const faq of faqs) {
    assert.ok(faq.question && faq.questionZh);
    assert.ok(faq.answer && faq.answerZh);
    assert.ok(
      faq.linkHref.startsWith("/") ||
        faq.linkHref.startsWith("https://github.com/niu-io/"),
      `Unexpected FAQ link: ${faq.linkHref}`,
    );
    assert.notEqual(faq.linkHref, "/docs/concepts/architecture/");
  }

  assert.ok(codeExamples.length >= 4);
  for (const ex of codeExamples) {
    assert.ok(ex.label && ex.labelZh);
    assert.ok(ex.trace && ex.traceZh);
  }
});

test("benchmark suites include complete Chinese localization across cards and rows", () => {
  assert.equal(benchmarkSuites.length, 4);
  for (const suite of benchmarkSuites) {
    assert.ok(suite.labelZh && suite.titleZh && suite.descriptionZh);
    assert.ok(suite.verdictTitleZh && suite.verdictBodyZh);
    for (const card of suite.cards) {
      assert.ok(card.badgeZh && card.primaryUnitZh && card.primarySubtextZh);
      for (const fact of card.facts) {
        assert.ok(
          fact.labelZh,
          `Missing labelZh on ${card.name} fact ${fact.label}`,
        );
      }
    }
    for (const row of suite.rows) {
      assert.ok(row.metricZh, `Missing metricZh on ${row.metric}`);
    }
  }
});
