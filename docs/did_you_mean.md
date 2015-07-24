## Prevent misspelling of common variable names (did_you_mean)

Warns when there is a misspelling in one of the following forms:

- `b_track_experiment`
- `b_experiment_hash`

The following patterns are considered warnings:

```xml
<TMPL_IF [% $b_action eq 'hotel' && $b_track_exeriment_hp_add_border_to_sbox %]>
  ## ...
</TMPL_IF>

<TMPL_IF [% $b_experment_hash_dsf_cd_split %]></TMPL_IF>
```

The following patterns are not warnings:

```xml
<TMPL_IF [% $b_action eq 'hotel' && $b_track_experiment_hp_add_border_to_sbox %]>
  ## ...
</TMPL_IF>

<TMPL_IF [% $b_experiment_hash_dsf_cd_split %]></TMPL_IF>
```
