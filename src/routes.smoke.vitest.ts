import { describe, it, expect } from "vitest";

type RouteEntry = {
  path: string;
};

const expectedBaselinePaths: string[] = [
  "/dashboard/:index",
  "/dashboard",
  "/calendar",
  "/reports/worklog",
  "/reports/pivot",
  "/reports/pivot/:reportId",
  "/reports/say-do-ratio",
  "/reports/estimateactual",
  "/reports/sprint",
  "/reports/custom/:reportId",
  "/reports/custom",
  "/import/worklog",
  "/import/issue",
  "/settings/general",
  "/settings/usergroups",
  "/settings/global",
  "/contribute",
  "/contact-us",
];

describe("Web route baseline smoke", () => {
  it("includes all baseline parity routes for migration safety", async () => {
    const routesModule = await import("./routes");
    const routePaths = (routesModule.default as RouteEntry[]).map(
      (route) => route.path,
    );

    expectedBaselinePaths.forEach((path) => {
      expect(routePaths).toContain(path);
    });
  });
});
