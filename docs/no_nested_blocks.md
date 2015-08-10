## Detect nested TMPL_BLOCK (no_nested_blocks)

Warns when a TMPL_BLOCK declaration nested inside conditional or loop is
encountered. Having multiple or repeated declarations are obscure and error-prone.
Conditional layout can be achieved by passing variables to a block inline.

The following patterns are considered warnings:

```xml
<TMPL_IF b_condition>
    <TMPL_BLOCK block_name>
        <TMPL_VAR b_text>
    </TMPL_BLOCK>
<TMPL_ELSE>
    <TMPL_BLOCK block_name>
        <TMPL_VAR b_text2>
    </TMPL_BLOCK>
</TMPL_IF>
```

The following patterns are not warnings:

```xml
<TMPL_BLOCK block_name>
    <TMPL_IF b_l_show_second_text>
        <TMPL_VAR b_text2>
    <TMPL_ELSE>
        <TMPL_VAR b_text>
    </TMPL_IF>
</TMPL_BLOCK>

<TMPL_IF b_condition>
    <INLINE block_name
        b_l_show_second_text=[% 0 %]>
<TMPL_ELSE>
    <INLINE block_name
        b_l_show_second_text=[% 1 %]>
</TMPL_IF>
```
