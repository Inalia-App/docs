import type { EventMeta, MetaCheckerOptions } from 'vue-component-meta'
import { globSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createChecker } from 'vue-component-meta'

interface MetaProp {
  name: string,
  type: string,
  required: boolean,
  description: string,
  default?: string,
}

interface MetaEvent {
  name: string,
  type: string,
  description: string,
}

function escapeDoubleQuotes(str: string) {
  return str.replace(/"/g, "\\'")
}

function main() {
  const __dirname = fileURLToPath(new URL('.', import.meta.url))

  mkdirSync(join(__dirname, '../.meta'), { recursive: true })

  const checkerOptions: MetaCheckerOptions = {
    forceUseTs: true,
    printer: { newLine: 1 },
  }

  const tsconfigChecker = createChecker(
    join(__dirname, '../node_modules/slidev-addon-inalia/tsconfig.json'),
    checkerOptions,
  )

  const components = globSync(join(__dirname, '../node_modules/slidev-addon-inalia/components/*.vue')) as string[]

  components.forEach((componentPath) => {
    const meta = tsconfigChecker.getComponentMeta(componentPath)

    const props = meta.props
      .filter((prop) => !prop.global)
      .map((prop) => ({
        name: escapeDoubleQuotes(prop.name),
        default: prop.default ? escapeDoubleQuotes(prop.default) : undefined,
        required: prop.required,
        type: escapeDoubleQuotes(prop.type),
        description: escapeDoubleQuotes(prop.description),
      } satisfies MetaProp))

    const filename = componentPath.split('/').pop()!.replace('.vue', '.md')
    let content = ''

    content += '<PropsTable\n'
    content += '  :data="[\n'
    props.forEach((prop) => {
      content += `    { name: '${prop.name}', type: '${prop.type}', description: '${prop.description}', default: '${prop.default}', required: ${prop.required} },\n`
    })
    content += '  ]"\n'
    content += '/>'

    const events = meta.events.map((event) => ({
      name: escapeDoubleQuotes(event.name),
      type: escapeDoubleQuotes(event.type),
      description: escapeDoubleQuotes(event.description),
    } satisfies MetaEvent))

    content += '\n\n'

    content += '<EventsTable\n'
    content += '  :data="[\n'
    events.forEach((event) => {
      content += `    { name: '${event.name}', type: '${event.type}', description: '${event.description}' },\n`
    })
    content += '  ]"\n'
    content += '/>'

    writeFileSync(join(__dirname, '../.meta', filename), content)
  })
}

main()
