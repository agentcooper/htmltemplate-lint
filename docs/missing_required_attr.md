## Provide required attributes (missing_required_attr)

Throws an error when a certain tag name is missing a required attribute. For
now the following tags are supported:

- `TMPL_VAR`
- `TMPL_INCLUDE`
- `TMPL_INLINE`
- `TMPL_V`
- `TMPL_BLOCK`

The following patterns are raising errors:

```xml
<TMPL_BLOCK>
  <TMPL_VAR>
</TMPL_BLOCK>

<TMPL_INLINE>
```

The following patterns are not warnings:

```xml
<TMPL_BLOCK signup_form>
  <TMPL_VAR name="acc_signup_title">
</TMPL_BLOCK>

<TMPL_INLINE inc/template.inc>
```
