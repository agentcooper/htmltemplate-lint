## Alarm about long expired experiments (no_ancient_experiments)

Warns when an experiment stopped more than 6 months ago is detected. Provides
visibility on dead code and helps resolving experiment-related template
conditions.

The following patterns are considered warnings:

```xml
<TMPL_IF b_track_experiment_dsf_top_district_in_cd>
  ## This experiment was stopped in January 2015.
</TMPL_IF>
```
