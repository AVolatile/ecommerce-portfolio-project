import { test, expect } from "@playwright/test";
test("product variants, cart quantity, promo persistence, validated checkout, and ownership history", async ({
  page,
}) => {
  await page.goto("/product/p02-transit-pack");
  await page.getByRole("button", { name: "Mineral", exact: true }).click();
  await page
    .getByRole("button", { name: "Add to bag", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("Mineral");
  await page.getByRole("button", { name: /Close Your bag/ }).click();
  await page.goto("/cart");
  await page.getByRole("button", { name: "Increase Transit Pack" }).click();
  await expect(page.getByText("$456", { exact: true }).first()).toBeVisible();
  await page.getByLabel("A code, if you have one.").fill("FIRSTUSE");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await expect(page.getByText("−$15")).toBeVisible();
  await page.getByRole("button", { name: "Continue to shipping" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page.getByLabel("Full name").fill("Alex Sample");
  await page
    .getByLabel("Email address", { exact: true })
    .first()
    .fill("alex@example.com");
  await page.getByRole("button", { name: "Continue to shipping" }).click();
  await page.getByRole("button", { name: "Continue to delivery" }).click();
  await expect(
    page.getByText("Enter a street number and street name."),
  ).toBeVisible();
  await page.getByLabel("Street address").fill("100 Sample Street");
  await page.getByLabel("City", { exact: true }).fill("New York");
  await page.getByLabel("State code").fill("NY");
  await page.getByLabel("ZIP code").fill("10001");
  await page.getByRole("button", { name: "Continue to delivery" }).click();
  await page.getByRole("radio", { name: /Express/ }).check();
  await page.getByRole("button", { name: "Continue to payment" }).click();
  await expect(page.getByText("DEMO CARD / •••• 4242")).toBeVisible();
  await expect(page.locator('input[name="card"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Review your setup" }).click();
  await expect(
    page.getByText("Confirm that you understand this is a demonstration."),
  ).toBeVisible();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review your setup" }).click();
  await page.getByRole("button", { name: /Place demo order/ }).click();
  await expect(
    page.getByRole("heading", { name: /A good start/ }),
  ).toBeVisible();
  await page.goto("/account/orders");
  await expect(page.getByText("Demo confirmed", { exact: true })).toBeVisible();
  await page.goto("/cart");
  await expect(
    page.getByText(
      "Your bag is empty. Find a setup that fits the way you move.",
    ),
  ).toBeVisible();
});
test("unavailable products cannot be purchased", async ({ page }) => {
  await page.goto("/product/a03-utility-pouch");
  await expect(
    page.getByRole("button", { name: "Sold out", exact: true }).first(),
  ).toBeDisabled();
  await page.goto("/product/s02-light-shell");
  await expect(
    page.getByRole("button", { name: "Coming soon", exact: true }).first(),
  ).toBeDisabled();
});
test("finder explains its recommendation and comparison works", async ({
  page,
}) => {
  await page.goto("/product-finder");
  for (const choice of [
    "International travel",
    "Heavy",
    "Yes",
    "Yes",
    "Yes",
    "Roomy",
  ]) {
    await page.getByRole("button", { name: choice, exact: true }).click();
    await page
      .getByRole("button", { name: /Next question|See my setup/ })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "Travel Pack", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Dedicated storage for a laptop up to 16 inch."),
  ).toBeVisible();
  await page.getByRole("link", { name: "Compare the details" }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(
    page.locator(".compare-table tbody tr").first().locator("td"),
  ).toHaveCount(2);
});
test("search, filtering, sorting, and saved items persist", async ({
  page,
}) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: "Search products" }).click();
  await page
    .getByRole("textbox", { name: "Search by product, category or use" })
    .fill("commute");
  await expect(page.locator(".search-results a")).toHaveCount(7);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: /Filters/ }).click();
  await page
    .getByRole("dialog")
    .getByLabel("Price", { exact: true })
    .selectOption("75");
  await page.getByRole("button", { name: /Show .* objects/ }).click();
  await expect(page.locator(".product-card")).toHaveCount(5);
  await page.getByLabel("Sort products").selectOption("low");
  await expect(page.locator(".product-heading").first()).toContainText(
    "Utility Cap",
  );
  await page
    .getByRole("button", { name: "Save Utility Cap", exact: true })
    .click();
  await page.goto("/account/wishlist");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
});
test("membership and repair have honest complete states", async ({ page }) => {
  await page.goto("/membership");
  await page
    .getByRole("button", { name: "Activate concept membership", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Your membership", exact: true })
    .click();
  await expect(page.getByText("VELT / In Use / Active concept")).toBeVisible();
  await page.goto("/repair");
  await page.getByRole("button", { name: "Preview enquiry" }).click();
  await expect(page.getByText("Choose the VELT object.")).toBeVisible();
  await page.getByLabel("Your object").selectOption("p02-transit-pack");
  await page.getByLabel("Repair type").selectOption("Zipper");
  await page.getByLabel("Demo name").fill("Alex Sample");
  await page.getByLabel("Demo email").fill("alex@example.com");
  await page
    .getByLabel("What happened?")
    .fill("The zipper pull needs to be replaced after regular use.");
  await page.getByRole("button", { name: "Preview enquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "The details are ready." }),
  ).toBeVisible();
});
test("keyboard skip link and native dialog focus stay usable", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Search products" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBeTruthy();
  }
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Search products" }),
  ).toBeFocused();
});

test("mobile navigation and sticky product action support the purchase flow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Packs", exact: true })
    .click();
  await expect(page).toHaveURL(/\/shop\/packs\//);
  await page.goto("/product/p02-transit-pack");
  const action = page.locator(".sticky-atc");
  await expect(action).toBeInViewport();
  await page.getByRole("button", { name: "Mineral", exact: true }).click();
  await action.getByRole("button", { name: "Add to bag", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Mineral");
  await page.getByRole("button", { name: /Close Your bag/ }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
