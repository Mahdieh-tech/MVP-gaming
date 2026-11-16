import { describe, expect, it } from "vitest";
import { getSafeRedirectPath } from "@/lib/redirect";

describe("getSafeRedirectPath", () => {
  it("allows a normal path", () => {
    expect(getSafeRedirectPath("/orders")).toBe("/orders");
  });

  it("keeps the query string", () => {
    expect(getSafeRedirectPath("/products?page=2")).toBe("/products?page=2");
  });

  it("falls back for empty values", () => {
    expect(getSafeRedirectPath(undefined)).toBe("/");
    expect(getSafeRedirectPath(null)).toBe("/");
    expect(getSafeRedirectPath("")).toBe("/");
  });

  it("rejects absolute URLs", () => {
    expect(getSafeRedirectPath("https://evil.com")).toBe("/");
    expect(getSafeRedirectPath("http://evil.com/login")).toBe("/");
  });

  it("rejects protocol-relative URLs", () => {
    expect(getSafeRedirectPath("//evil.com")).toBe("/");
  });

  it("rejects backslash tricks", () => {
    expect(getSafeRedirectPath("/\\evil.com")).toBe("/");
  });

  it("rejects javascript URLs", () => {
    expect(getSafeRedirectPath("javascript:alert(1)")).toBe("/");
  });

  it("rejects paths that do not start with a slash", () => {
    expect(getSafeRedirectPath("orders")).toBe("/");
  });

  it("uses a custom fallback", () => {
    expect(getSafeRedirectPath("//evil.com", "/orders")).toBe("/orders");
  });
});