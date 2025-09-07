# Architecture

This page explains Inalia's architecture and how its components interact.

> [!NOTE]
> It can be helpful when troubleshooting issues.

## Components

Inalia has two components:

1. **Web application** — the core service, available at [inalia.app](https://inalia.app).
2. **Slidev addon** — an [addon for Slidev](./slidev-addon-inalia.md) that integrates Inalia into presentations.

The web application is deployed publicly so the audience can interact with a presentation in real time. We considered removing the internet dependency, but remote talks, unreliable local networks, and audience connectivity make a public deployment the most reliable option.

The Slidev addon runs inside [Slidev](https://sli.dev/guide/theme-addon#use-addon). It enables real-time features automatically when specific environment variables are present. These variables should be defined only in local developer environments because a personal access token is required to communicate with the API. For finished talks, Inalia provides a [static mode](./static-mode.md) to deploy the presentation without runtime connections.

## Communication

The web application is a monolith composed of several parts:

1. **App** — the main interface where we create and manage talks.
2. **Dashboard** - the interface where you can view audience questions during your talk.
3. **Presentation** — the view the audience sees during a talk.
4. **API** — the backend service that provides data to the addon. Because the app is monolithic, the API does not serve the frontend. The addon exposes primitives to [customize the experience](./fully-customizable.md), so direct API access is usually unnecessary.
5. **Websocket server** — an external, from the monolithic point of view, server that communicates with both the addon and the application to enable real-time interactions. It provides low-latency messaging between components. The addon exposes the required primitives, so you normally do not need to manage the websocket server directly.

![Components Communication (internal flow aren't visible)](/architecture.png)
