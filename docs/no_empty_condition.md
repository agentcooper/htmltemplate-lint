## Don't leave empty condition blocks (no_empty_condition)

Warns when a void content branch is left in a complex condition tag. Leaving
empty conditions can look obscure and misleading for the reader.

The following patterns are considered warnings:

```xml
<TMPL_IF b_user_auth>
<TMPL_ELSE>
    <a href="/signin">Sign In</a>
</TMPL_IF>

<TMPL_IF b_condition>
    <TMPL_VAR b_text>
<TMPL_ELSIF b_other_condition>
<TMPL_ELSE>
    <TMPL_VAR b_default_text>
</TMPL_IF>
```

The following patterns are not warnings:

```xml
<TMPL_IF b_experiment_hash_dsf_cd_split></TMPL_IF>
<TMPL_IF [% $b_action eq 'hotel' && $b_experiment_hash_hp_one_column %]></TMPL_IF>
```
