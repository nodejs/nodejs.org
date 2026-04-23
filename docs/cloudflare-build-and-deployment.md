# Cloudflare Build and Deployment

The Node.js Website can be built using the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare). Such build generates a [Cloudflare Worker](https://www.cloudflare.com/en-gb/developer-platform/products/workers/) that can be deployed on the [Cloudflare](https://www.cloudflare.com) network.

The build is gated on the `NEXT_PUBLIC_DEPLOY_TARGET=cloudflare` environment variable (set by the OpenNext `buildCommand`), which makes `apps/site` pull its Next.js, MDX, image-loader, and analytics overrides from [`@node-core/platform-cloudflare`](../apps/cloudflare). See the [Deploy Target Selection](./technologies.md#deploy-target-selection-next_public_deploy_target) section of the Technologies document for the full platform-adapter contract.

## Configurations

All Cloudflare-specific configuration lives in the [`@node-core/platform-cloudflare`](../apps/cloudflare) package. The two key configuration files are:

- [`apps/cloudflare/wrangler.jsonc`](../apps/cloudflare/wrangler.jsonc) — the Wrangler configuration
- [`apps/cloudflare/open-next.config.ts`](../apps/cloudflare/open-next.config.ts) — the OpenNext adapter configuration

### Wrangler Configuration

This file defines the settings for the Cloudflare Worker, which serves the website.

For more details, refer to the [Wrangler documentation](https://developers.cloudflare.com/workers/wrangler/configuration/).

Key configurations include:

- `main`: Points to a custom worker entry point ([`apps/cloudflare/src/worker-entrypoint.ts`](../apps/cloudflare/src/worker-entrypoint.ts)) that wraps the OpenNext-generated worker (see [Custom Worker Entry Point](#custom-worker-entry-point) and [Sentry](#sentry) below).
- `account_id`: Specifies the Cloudflare account ID. This is not required for local previews but is necessary for deployments. You can obtain an account ID for free by signing up at [dash.cloudflare.com](https://dash.cloudflare.com/login).
  - This is currently set to `fb4a2d0f103c6ff38854ac69eb709272`, which is the ID of a Cloudflare account controlled by Node.js, and used for testing.
- `build`: Defines the build command to generate the Node.js filesystem polyfills required for the application to run on Cloudflare Workers. This uses the [`@flarelabs/wrangler-build-time-fs-assets-polyfilling`](https://github.com/flarelabs-net/wrangler-build-time-fs-assets-polyfilling) package.
- `alias`: Maps aliases for the Node.js filesystem polyfills generated during the build process.
- `r2_buckets`: Contains a single R2 binding definition for `NEXT_INC_CACHE_R2_BUCKET`. This is used to implement the Next.js incremental cache.
  - This is currently set up to a R2 bucket in the aforementioned Cloudflare testing account.
- `durable_objects`: Contains a single DurableObject binding definition for `NEXT_CACHE_DO_QUEUE`. This is used to implement the Open-next cache queue.
- `version_metadata`: Contains a binding for `CF_VERSION_METADATA`, used for Sentry release configuration (see [Sentry](#sentry) below).

### OpenNext Configuration

This is the configuration for the OpenNext Cloudflare adapter.

For more details, refer to the [official OpenNext documentation](https://opennext.js.org/cloudflare/get-started#4-add-an-open-nextconfigts-file).

### Skew Protection

While Vercel offers [version skew protection](https://vercel.com/docs/skew-protection) out of the box, such mechanism is not present on the platform level in the Cloudflare network.

Therefore, the OpenNext adapter provides its [own implementation](https://opennext.js.org/cloudflare/howtos/skew).

The OpenNext skew protection requires the following environment variables to be set in the Wrangler configuration file:

- `CF_WORKER_NAME`
  - The name of the worker (the same as `name`)
- `CF_ACCOUNT_ID`
  - The ID of the Cloudflare account (the same as `account_id`)
- `CF_PREVIEW_DOMAIN`
  - The preview domain for the worker. For Node.js, this is `nodejsorg`.

Additionally, when deploying, an extra `CF_WORKERS_SCRIPTS_API_TOKEN` environment variable needs to be set to an API token that has the `Workers Scripts:Read` permission available on the Worker's account.

### Image loader

When deployed on the Cloudflare network a custom image loader is required. The Cloudflare platform config ([`apps/cloudflare/next.platform.config.mjs`](../apps/cloudflare/next.platform.config.mjs)) contributes it via the `images.loaderFile` field, which is merged into the shared Next.js config when `NEXT_PUBLIC_DEPLOY_TARGET=cloudflare` (the variable is set by the OpenNext `buildCommand` in [`open-next.config.ts`](../apps/cloudflare/open-next.config.ts)).

The custom loader can be found at [`apps/cloudflare/src/image-loader.ts`](../apps/cloudflare/src/image-loader.ts).

For more details on this see: https://developers.cloudflare.com/images/transform-images/integrate-with-frameworks/#global-loader

### Custom Worker Entry Point

Instead of directly using the OpenNext-generated worker (`.open-next/worker.js`), the application uses a custom worker entry point at [`apps/cloudflare/src/worker-entrypoint.ts`](../apps/cloudflare/src/worker-entrypoint.ts). This allows customizing the worker's behavior before requests are handled (currently used to integrate [Sentry](#sentry) error monitoring).

The custom entry point imports the OpenNext-generated handler from `.open-next/worker.js` and re-exports the `DOQueueHandler` Durable Object needed by the application.

For more details on custom workers, refer to the [OpenNext custom worker documentation](https://opennext.js.org/cloudflare/howtos/custom-worker).

### Sentry

Error monitoring is provided by [Sentry](https://sentry.io/) via the [`@sentry/cloudflare`](https://www.npmjs.com/package/@sentry/cloudflare) package.

The [custom worker entry point](#custom-worker-entry-point) wraps the OpenNext handler with `Sentry.withSentry()`, which instruments incoming requests for error and performance tracking.

The `version_metadata` binding (`CF_VERSION_METADATA`) in the Wrangler configuration enables Sentry [release configuration](https://docs.sentry.io/platforms/javascript/guides/cloudflare/#release-configuration-optional), allowing errors to be associated with specific worker versions.

For more details, refer to the [Sentry Cloudflare guide](https://docs.sentry.io/platforms/javascript/guides/cloudflare).

## Scripts

Preview and deployment of the website targeting the Cloudflare network is implemented via the following two commands:

- `pnpm cloudflare:preview` builds the website using the OpenNext Cloudflare adapter and runs the website locally in a server simulating the Cloudflare hosting (using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/))
- `pnpm cloudflare:deploy` builds the website using the OpenNext Cloudflare adapter and deploys the website to the Cloudflare network (using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/))
