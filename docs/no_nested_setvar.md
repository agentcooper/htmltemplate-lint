## Detect nested TMPL_SETVAR (no_nested_setvar)

Throws an error when nested `TMPL_SETVAR` statements are encountered. This
pattern is currently not supported by templates compiler.

The following patterns are considered warnings:

```xml
<TMPL_SETVAR b_html>
  <TMPL_IF b_auth_user>
    <TMPL_SETVAR b_authorized>1</TMPL_SETVAR>
  </TMPL_IF>

  ## ...
</TMPL_SETVAR>
```

The following patterns are not warnings:

```xml
<TMPL_IF b_auth_user>
  <TMPL_SETVAR b_authorized>1</TMPL_SETVAR>
</TMPL_IF>

<TMPL_SETVAR b_html>
  ## ...
</TMPL_SETVAR>
```
