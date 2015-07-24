## Reduce simple assignment verbosity (no_verbose_assignment)

Warns whenever there is a chance to reduce verbosity of variable assignment.
Improves overall code readability. For now it only discourages use of
`TMPL_SETVAR` with a single `TMPL_VAR` child, in favor of using `TMPL_ASSIGN`.

The following patterns are considered warnings:

```xml
<TMPL_SETVAR b_tag><TMPL_VAR b_other_tag></TMPL_SETVAR>
<TMPL_SETVAR b_exclaim_name><TMPL_VAR [% $b_name . '!' %]></TMPL_SETVAR>
```

The following patterns are not warnings:

```xml
<TMPL_SETVAR b_tag>
    <TMPL_VAR b_other_tag>
</TMPL_SETVAR>

<TMPL_SETVAR b_button_class_name>
    b-button
    <TMPL_IF b_track_experiment_button_cta>
        b-button_cta
    </TMPL_IF>
</TMPL_SETVAR>

<TMPL_ASSIGN b_exclaim_name [% $b_name . '!' %]>
```
