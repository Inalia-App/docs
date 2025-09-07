# slidev-addon-inalia

The [slidev-addon-inalia](https://github.com/Inalia-App/slidev-addon-inalia) is a [Slidev addon](https://sli.dev/guide/theme-addon#use-addon) and an essential part of Inalia, enabling real-time communication between our slides and the Inalia web application.

> [!INFO]
> See the [architecture](./architecture.md) page for an in-depth explanation of how the addon interacts with the web application.

## Installation

### Automatic

The package on npm also provides a CLI that sets up the addon in your Slidev project:

```sh
npx slidev-addon-inalia
```

Follow the prompts. The CLI creates a `.env` file with the values you provide, installs the package, and adds the addon to the Slidev configuration.

### Manual

Manually install the addon with these steps:

1. Install the package:

```sh
npm install slidev-addon-inalia
```

2. Create a `.env` file at the root of your Slidev project with these variables:

```ini
VITE_INALIA_API_KEY=<your-api-key>
VITE_INALIA_USERNAME=<your-username>
VITE_INALIA_TALK_NUMBER=<your-talk-number>
```

Create an access token on your profile: https://inalia.app/profile/tokens. Your username and talk number are visible in a talk URL: `https://inalia.app/<your-username>/talks/<your-talk-number>`.

3. Add the addon to your Slidev configuration:

```md
---
addons:
  - slidev-addon-inalia
---

# My Slides
```

4. Restart the Slidev server.

## Usage

The addon provides built-in components and layouts to get started quickly.

After you create a talk and a question in the web application, include the provided components in your slides. For example:

```md
<Inalia :questionId="1" />
```

The `Inalia` component fetches question data from the Inalia API and connects to the websocket server for real-time updates.

If you don't know the `questionId`, right-click a question in the web app and choose "Slidev" to copy the snippet. You can also find the ID in the question URL: `https://inalia.app/<your-username>/talks/<your-talk-number>/questions/<question-id>`.

Question IDs are scoped to their talk. The first question in any talk has ID `1`, which makes IDs predictable and easy to reference in slides before creating the question.

### Layouts

The addon registers two layouts automatically:

- `inalia-feedback` — displays a QR code that links to the [feedback](./feedback.md) form.
- `inalia-overview` — displays a QR code that links to the [presentation](./presentation.md) card.

Use them like any other layout:

```md
---
layout: inalia-overview
---
```

They do not add styles or slots. Inspect the [source code](https://github.com/Inalia-App/slidev-addon-inalia) to build custom layouts from the provided primitives.

> [!INFO]
> See an example in the [Examples Repository](https://github.com/inalia-app/examples/tree/main/examples).

## Advanced usage

The addon is built from reusable primitives: components, composables, and utils. You can compose these to customize behavior or appearance.

Example: create a slide that shows answers to a question:

```vue
<script setup>
import { useInaliaQuestion } from 'slidev-addon-inalia/composables'
import { InaliaQR } from 'slidev-addon-inalia/components'

const props = defineProps(['questionId'])
const { question, data } = useInaliaQuestion(() => props.questionId)
</script>

<template>
  <div>
    <h1>{{ question.title }}</h1>

    <InaliaQR :url="question.tiny_url" />

    <YourDataViewer :data="data" />
  </div>
</template>
```

If you use TypeScript, types are provided for autocompletion.

API helpers, channel names, event names, and types are exported for consumption:

```ts
import { fetchTalk } from 'slidev-addon-inalia/utils/api'
import { EVENT_ANSWER_CREATED } from 'slidev-addon-inalia/utils/events'
import type { Answer } from 'slidev-addon-inalia/types/answer'
```

Explore the [source code](https://github.com/Inalia-App/slidev-addon-inalia) for details and to build custom solutions from the primitives.

> [!INFO]
> See an example in the [Examples Repository](https://github.com/inalia-app/examples/tree/main/examples).
