import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "@/lib/schemas/auth";

describe("registerSchema", () => {
  it("accepts a valid email and password", () => {
    const result = registerSchema.safeParse({
      email: "player@example.com",
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = registerSchema.safeParse({
      email: "not-an-email",
      password: "12345678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = registerSchema.safeParse({
      email: "player@example.com",
      password: "1234567",
    });
    expect(result.success).toBe(false);
  });

  it("explains a short password in plain words", () => {
    const result = registerSchema.safeParse({
      email: "player@example.com",
      password: "123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Use at least 8 characters");
    }
  });
});

describe("loginSchema", () => {
  it("accepts any non-empty password", () => {
    const result = loginSchema.safeParse({
      email: "player@example.com",
      password: "x",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      email: "player@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});