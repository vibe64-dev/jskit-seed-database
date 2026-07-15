import { expect, test } from "@playwright/test";
import { BASE_URL } from "./support/base-url";

test("general settings omits the removed shell introduction", async ({ page }) => {
  const accountName = `settings-account-${Date.now()}-${process.pid}`;
  const email = `${accountName}@example.test`;
  const password = `Settings!${Date.now()}Aa`;

  await page.goto(`${BASE_URL}/auth/login?mode=register`);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password", { exact: true }).fill(password);
  await page.getByTestId("auth-submit").click();
  await expect(page).toHaveURL(/\/home(?:[/?#]|$)/u);

  await page.goto(`${BASE_URL}/home/settings/general`);

  await expect(page.getByRole("heading", { name: "Navigation", exact: true })).toBeVisible();
  await expect(page.getByText("Open drawer by default on wider screens", { exact: true })).toBeVisible();
  await expect(page.getByText("Home settings", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Configure shell behavior for this surface.", { exact: true })).toHaveCount(0);
});
