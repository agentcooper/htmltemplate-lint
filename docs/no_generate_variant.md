## Deprecate non-tracking changes in templates (no_generate_variant)

Throws an error when deprecated `b_generate_variant_for_js_tracking` form is
used, suggesting to use staged experiments instead.

The following patterns are considered warnings:

```xml
<TMPL_IF b_generate_variant_for_js_tracking_tfl_footer_links>
  ## ...
</TMPL_IF>
```

The following patterns are not warnings:

```xml
<TMPL_IF b_track_experiment_tfl_footer_links>
  ## ...
</TMPL_IF>
```

