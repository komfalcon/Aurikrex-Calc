# Cloudflare Workers AI model notes

- Live endpoint tested: https://aurikrex-calc.moparaji57.workers.dev/api/ask
- The deployed endpoint returned HTTP 502 with Cloudflare error code 5028: `Model has been deprecated: @cf/meta/llama-3.1-8b-instruct was deprecated on 2026-05-30.`
- Current supported replacement used in the code: `@cf/meta/llama-3.1-8b-instruct-fp8`.
- Official model page: https://developers.cloudflare.com/workers-ai/models/llama-3.1-8b-instruct-fp8/
- Official deprecation notice: https://developers.cloudflare.com/changelog/post/2026-05-08-planned-model-deprecations/
- Cloudflare model catalog: https://developers.cloudflare.com/workers-ai/models/

The local passphrase/API-key field was not the cause of the screenshot error: the Worker reached Cloudflare and received a model-deprecation response. The Worker now falls back from known deprecated model IDs and returns the upstream error text instead of only a generic rejection message.
