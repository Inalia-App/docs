# Static mode

After finishing a talk, we typically want to make the presentation available to the audience using [Slidev build mode](https://sli.dev/guide/hosting#building-and-hosting).

Inalia lets us export presentation data directly into the slides. Finish the talk by clicking the `Finish` button in the status card, then right-click a question and select "Slidev". Inalia displays a snippet to copy and paste into the slide.

During a live presentation you might use a dynamic component like:

```md
<Inalia :questionId="1" />
```

When the talk is over and you want to build and deploy the presentation, replace it with a static component such as:

```md
<Inalia
  question="Will AI replace all of us?"
  type="single_select"
  chart="donut"
  :data="[{
    label: 'Oui',
    count: 10,
    color: '#00DC82'
  }, {
    label: 'Non',
    count: 12,
    color: '#a855f7'
  }]"
/>
```

With static mode, we can generate and deploy slides without needing access to Inalia or an access token at runtime.
