---
description: MCP server to let AI clients access your Inalia data.
---

# MCP

The Inalia MCP server lets AI clients connect directly to your Inalia data through the Model Context Protocol (MCP). Once connected, an AI client can inspect your talks, read their questions, retrieve detailed question data, and generate ready-to-use Inalia components for your slides.

This page is the canonical overview of what the server exposes, how authentication works, and what each tool returns.

## Endpoint

- **MCP endpoint:** `/mcp`
- **Production URL:** `https://inalia.app/mcp`
- **Transport:** HTTP
- **Authentication:** Bearer token via Laravel Sanctum

The server is implemented as a web MCP server and is protected by the same access rules as the main application.

## Authentication

Use a personal access token from your Inalia account and send it as a bearer token in the `Authorization` header.

- `Authorization: Bearer <your-token>`

To get a token, create a token from your [profile tokens page](https://inalia.app/profile/tokens).

### Visual Studio Code

> [!NOTE]
> Install required extensions. Ensure you have [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions installed.

#### Setup Instructions:

1. Open VS Code and access the Command Palette (Ctrl/Cmd + Shift + P)
2. Type "Preferences: Open Workspace Settings (JSON)" and select it
3. Navigate to your project's `.vscode` folder or create one if it doesn't exist
4. Create or edit the `mcp.json` file with the following configuration:

```json [.vscode/mcp.json]
{
  "servers": {
    "nuxt-ui": {
      "type": "http",
      "url": "https://inalia.app/mcp"
    }
  }
}
```

## Available tools

The server currently exposes five tools.

| Tool                     | Purpose                                                 | Required input                            |
|--------------------------|---------------------------------------------------------|-------------------------------------------|
| `ListUserTalks`          | List all talks owned by the authenticated user          | None                                      |
| `ListTalkQuestions`      | List all questions for one talk                         | `talk_number`                             |
| `GetTalkInformation`     | Retrieve detailed metadata for one talk                 | `talk_number`                             |
| `GetQuestionInformation` | Retrieve detailed metadata and answers for one question | `talk_number`, `question_number`          |
| `GetInaliaComponent`     | Generate a static or dynamic Inalia slide component     | `talk_number`, `question_number`, `state` |

Currently, tools are read-only and do not allow modifying talk or question data.

## Tool reference

### `ListUserTalks`

Returns all talks owned by the authenticated user, sorted by scheduled date in descending order.

The response includes:

- user name and username,
- total talk count,
- one entry per talk with:
  - talk number,
  - title,
  - description,
  - color,
  - scheduled date,
  - event name and location,
  - feature flags such as live reactions, audience questions, feedback, and demo mode,
  - deck URL,
  - talk state,
  - question count,
  - important URLs such as the public overview and dashboard.

This is the best starting point when an AI client needs to discover what is available before calling more specific tools.

### `ListTalkQuestions`

Lists the questions attached to a single talk.

**Required input**

- `talk_number` — integer

The response includes:

- talk number,
- talk title,
- total question count,
- one entry per question with:
  - question number,
  - question text,
  - question type,
  - enabled status,
  - configured options,
  - answer count.

If the talk does not belong to the authenticated user, the tool returns an error.

### `GetTalkInformation`

Returns the full presentation-level view of a talk.

**Required input**

- `talk_number` — integer

The response includes:

- talk identity and scheduling information,
- event metadata,
- feature flags,
- configured live reactions,
- whether arbitrary live reactions are allowed,
- external feedback URL,
- deck URL,
- talk state,
- question count,
- presentation and dashboard URLs.

Use this tool when an AI client needs to reason about a talk as a whole, not just its list of questions.

### `GetQuestionInformation`

Returns the complete details of a specific question inside a talk.

**Required input**

- `talk_number` — integer
- `question_number` — integer

The response includes:

- question number,
- question text,
- question type,
- enabled status,
- configured options,
- answer count,
- all stored answers with timestamps,
- the public answer URL for that question.

This is the tool to use when an AI client needs the audience response data or wants to inspect the exact structure of a question.

### `GetInaliaComponent`

Generates Inalia component code for a question so it can be embedded directly into a slide deck.

**Required input**

- `talk_number` — integer
- `question_number` — integer
- `state` — string, either `static` or `dynamic`

**State values**

- `static` — returns a finalized component based on the current question data and answers.
- `dynamic` — returns a live component intended to keep reflecting current data.

The response is plain text containing the generated component code.

This is the tool that turns your Inalia data into something directly usable in a presentation workflow.
