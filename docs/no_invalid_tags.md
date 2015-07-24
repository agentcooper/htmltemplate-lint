## Disallow invalid tags (no_invalid_tags)

Warns when unknown `TMPL_` tag is encountered. This rule's main goal is to
signal about mistyped tag names.

The following patterns are considered warnings:

```xml
<TMPL_ILINE inc/template.inc>
<TMPL_VR b_text>
<TMPL IF b_condition>
  ## ...
</TMPL_IF>
```

The following patterns are not warnings:

```xml
<TMPL_COMMENT>
    <TMPL_VR b_text>
</TMPL_COMMENT>

## <TMPL_ILINE inc/template.inc>
```
