## Use of TMPL_LOOP is discouraged (no_tmpl_loop)

Warns when `TMPL_LOOP` tag is used for iteration. Within `TMPL_LOOP` the original
template data variables are shadowed by the values available on the current
iteration item, which means that:

- there can be naming collisions, e.g. `b_city_id` is present both in global
context and as a key on iterated item,
- the ability to statically infer where the variable is coming from is limited.

It is therefore advised to use `TMPL_FOR` instead.

The following patterns are considered warnings:

```xml
<TMPL_LOOP b_visited_cities>
  ## ...
</TMPL_LOOP>
```

Which can be translated to:

```xml
<TMPL_FOR b_visited_city IN=b_visited_cities>
  ## ...
</TMPL_FOR>
```
