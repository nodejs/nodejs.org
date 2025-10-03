# Partners

This document describes how partners and supporters of the Node.js project are referenced and managed.

## Adding or Removing Partners

All partners must be approved by the Node.js Marketing Team and the Node.js Technical Steering Committee (TSC). Therefore, partners cannot be added or removed without their approval.

To add or remove a partner:

1. Modify the `apps/site/public/static/partners/constants.json` file. This file contains an array of partner objects, each with the following fields:
   - `id`: A unique identifier for the partner (used for logo import).
   - `name`: The display name of the partner.
   - `href`: A URL linking to the partner’s website.
   - `categories`: An array of categories the partner belongs to. These are used to filter partners on the Partners and Downloads pages. Valid categories include:
     - `infrastructure`: Partners providing infrastructure for the Node.js project.
     - `esp`: Partners offering support for EOL Node.js versions through the Ecosystem Sustainability Program (ESP).
   - `weight`: A number representing the partner's visibility weight. This is used in the randomization algorithm — higher values increase the partner's likelihood of being shown.

2. Add the partner's logo to the `packages/ui-components/icons/PartnersLogos/` directory.
   The filename must match the partner's `id`, in lowercase.

3. Register the logo in `packages/ui-components/icons/PartnersLogos/index.ts`.
   For example, if the partner’s `id` is `MICROSOFT`, the import must be written as:

   ```ts
   import * as MICROSOFT from './microsoft';
   ```

## Home Page

On the homepage, all partners are displayed regardless of category. The `weight` field is used by the randomization algorithm to determine how likely a partner is to appear e.g., a partner with a `weight` of 3 will be three times more likely to be shown than one with a `weight` of 1.

## Partners Page

The Partners page organizes partners by category. Each category has a description that must be approved by the Node.js Marketing Team and the TSC.
Each partner is displayed with:

- Their logo
- Their name
- A link to their website with UTM parameters for tracking

Partners are sorted alphabetically within each category.

## Downloads Section

The Downloads section only features partners categorized under `infrastructure`. These partners provide essential infrastructure for testing, releasing, and maintaining Node.js website, etc.
The same randomization algorithm used on the homepage is applied here as well.

## Supporters

> [!NOTE]
> Donations made through GitHub Sponsors are not displayed yet; they will be added soon.

Supporters are individuals and organizations that provide financial support to the Node.js project through OpenCollective and GitHub Sponsors. They are displayed on the Partner page, but not on the homepage or Downloads section.

## Partner Randomization Algorithm

The randomization algorithm determines the order in which partners are displayed on both the homepage and the Downloads section. It takes into account:

- The `weight` of each partner (higher weight = higher probability of being shown).
- A time-based seed: the order is refreshed every 5 minutes, not on every request.
  This ensures that the display remains consistent for a short period, rather than changing constantly. E.g., if a user visits the homepage multiple times within 5 minutes, they will see the same order of partners.

> [!NOTE]
> Partner randomization and rendering is performed on the client side, not during server-side rendering (SSR).
