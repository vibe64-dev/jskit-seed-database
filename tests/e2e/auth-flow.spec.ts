import { expect, test } from "@playwright/test";
import { BASE_URL } from "../support/base-url";

test("a database-backed account can register, sign out, and sign in again", async ({ browser }) => {
  const accountName = `seed-account-${Date.now()}-${process.pid}`;
  const email = `${accountName}@example.test`;
  const password = `SeedApp!${Date.now()}Aa`;

  const registrationContext = await browser.newContext();
  const registrationPage = await registrationContext.newPage();

  await registrationPage.goto(`${BASE_URL}/auth/login?mode=register`);
  await expect(registrationPage.getByRole("heading", { name: "Create your account" })).toBeVisible();

  await registrationPage.getByLabel("Email").fill(email);
  await registrationPage.getByLabel("Password", { exact: true }).fill(password);
  await registrationPage.getByLabel("Confirm password", { exact: true }).fill(password);
  await registrationPage.getByTestId("auth-submit").click();

  await expect(registrationPage).toHaveURL(/\/home(?:[/?#]|$)/u);
  await expect(registrationPage.getByRole("button", { name: accountName, exact: true })).toBeVisible();

  await registrationPage.getByRole("button", { name: accountName, exact: true }).click();
  await registrationPage.getByRole("link", { name: "Sign out", exact: true }).click();
  await expect(registrationPage).toHaveURL(/\/auth\/login(?:[/?#]|$)/u);
  await registrationContext.close();

  const loginContext = await browser.newContext();
  const loginPage = await loginContext.newPage();

  await loginPage.goto(`${BASE_URL}/auth/login`);
  await loginPage.getByLabel("Email").fill(email);
  await loginPage.getByLabel("Password", { exact: true }).fill(password);
  await loginPage.getByTestId("auth-submit").click();

  await expect(loginPage).toHaveURL(/\/home(?:[/?#]|$)/u);
  await expect(loginPage.getByRole("button", { name: accountName, exact: true })).toBeVisible();

  await loginContext.close();
});
