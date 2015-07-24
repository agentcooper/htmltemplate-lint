## Don't comment TMPL tags with HTML comments (no_html_commented_tags)

Warns when TMPL tags are wrapped into HTML comments. TMPL markup is still
parsed and executed even inside of HTML comments, leading to usually unintended
consequences like inlining extra files or bad tracking.

The following patterns are considered warnings:

```xml
<!-- <TMPL_VAR b_value> -->

<!--
    <div class="block">
        <TMPL_INLINE inc/template.inc>
    </div>
-->
```

Using TMPL comments, however is not frowned upon, so the following patterns are
not warnings:

```xml
<!--
    <div class="block">
        ## TODO: Put markup
    </div>
-->
```
