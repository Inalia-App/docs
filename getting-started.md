# Getting started

Inalia has two parts:

- The web app, [inalia.app](https://inalia.app), where we create and configure talks.
- The Slidev addon, [slidev-addon-inalia](./slidev-addon-inalia), which communicates with the web app from the presentation and displays interactive elements.

Before continuing, create an account on [inalia.app](https://inalia.app). A **free plan** is available.

In this guide we create a simple talk with one question to demonstrate how Inalia works.

## Inalia

The [Inalia web app](https://inalia.app) lets us create and configure talks through a simple interface for managing interactive presentation elements.

Create a new talk by clicking the "Create Talk" button, then complete the form with your talk details.

![Create Talk Button](./assets/create-talk-button.png)

![Fill Talk Form](./assets/fill-talk-form.png)

After creation, the app redirects us to the talk details page, where we manage settings and add interactive elements. For this guide we focus on the questions section.

![Talk Details Page](./assets/talk-details-page.png)

Create a question by clicking the "Create Question" button in the questions section and completing the form — we'll use a simple text question for this example.

<!-- TODO: use a gif -->
![Create Question Button](./assets/create-question-button.png)

For a broader overview, see the [architecture documentation](./architecture.md).

## Slidev

Now that our talk is ready on [inalia.app](https://inalia.app), we can create a Slidev project and add the Inalia addon.

```sh
pnpm create slidev@latest
```

Change into the new project folder and run the Slidev addon CLI to install and configure the addon:

```sh
npx slidev-addon-inalia
```

The CLI prompts a few questions, then installs the required dependencies and applies the configuration.

See the Slidev addon documentation for more details: [slidev-addon-inalia](./slidev-addon-inalia.md).
