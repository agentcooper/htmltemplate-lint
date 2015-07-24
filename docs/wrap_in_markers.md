## Wrap file contents in markers (wrap_in_markers)

Warns when template file is not wrapped in `<TMPL_MARKER START>` and
`<TMPL_MARKER END>`. These markers tags are only rendered in dev environment
and very helpful when looking for a source of a specific DOM node.

The following patterns are considered warnings:

```xml
# new template file
<div class="block">
  <TMPL_VAR b_text>
</div>
```

The following patterns are not warnings:

```xml
<TMPL_MARKER START>

<div class="block">
  <TMPL_VAR b_text>
</div>

<TMPL_MARKER END>
```
