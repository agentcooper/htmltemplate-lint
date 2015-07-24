## Prefix variables name with b_ (b_before_variable_name)

Warns when template-defined variables are not prefixed with `b_`. Temporary
variables that are created in templates should be prefixed to avoid collisions
with copy tags. Additionally, variables starting with `b_` are more efficient
because no copy tag lookup is performed for them.

When a parameter has to be provided to the copy tag it is better to pass that
parameter directly on the corresponding `TMPL_VAR` tag, for example:

```xml
## Copy tag is 'The total price is {price}'
<TMPL_VAR total_price_is price=b_total_price>
```

The following patterns are considered warnings:

```xml
<TMPL_SETVAR city_name>
  <TMPL_IF b_condition>
    <TMPL_VAR b_city_name_one>
  <TMPL_ELSE>
    <TMPL_VAR b_city_name_two>
  </TMPL_IF>
</TMPL_SETVAR>

<TMPL_ASSIGN price b_item_price>
```

The following patterns are not warnings:

```xml
<TMPL_SETVAR b_city_name>
  <TMPL_IF b_condition>
    <TMPL_VAR b_city_name_one>
  <TMPL_ELSE>
    <TMPL_VAR b_city_name_two>
  </TMPL_IF>
</TMPL_SETVAR>

<TMPL_VAR price_copy price=b_item_price>
```
