Creates 100 random avatars using Replicate's hosted version of Stable Diffusion 3.

To ensure a wide variety of images, prompt is "profile picture of a (18-70)-year-old man/woman"

```bash
export REPLICATE_API_TOKEN=...
node create.mjs
node mix.mjs
```

Can access via JSDeliver CDN e.g.
https://cdn.jsdelivr.net/gh/matthewmayer/sd3-avatars/generic/1.jpg
