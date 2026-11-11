import { describe, expect, it } from "vitest";
import { getArticleBySlug, getArticles } from "./articles";

describe("articles data accessors", () => {
  it("returns published articles with non-empty metadata", () => {
    const list = getArticles();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);

    const first = list[0];
    expect(first.slug).toBeDefined();
    expect(first.title).toBeDefined();
    expect(first.sections.length).toBeGreaterThan(0);
  });

  it("finds article by its exact slug", () => {
    const slug = "why-smart-ai-models-still-write-like-bots";
    const article = getArticleBySlug(slug);
    expect(article).toBeDefined();
    expect(article?.title).toContain("Why smart AI models still write like bots");
  });

  it("returns undefined for non-existent slug", () => {
    const article = getArticleBySlug("does-not-exist-slug");
    expect(article).toBeUndefined();
  });
});
