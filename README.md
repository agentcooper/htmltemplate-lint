## HTML::Template lint

#### Run

```
node index.js ./test.inc
```

#### Linter

Linter is based on SublimeLinter, so install that first. Also make sure 'htmltemplate-lint' is available globally.

```bash
cd /Users/{USERNAME}/Library/Application\ Support/Sublime\ Text\ 3/Packages/

ln -s ~/htmltemplate-lint/SublimeLinter-contrib-htmltemplate-lint SublimeLinter-contrib-htmltemplate-lint
```

Go to `Sublime Text > Preferences > Package Settings > SublimeLinter > Settings - User` and add to `linters`:

```json
"htmltemplatelint": {
    "@disable": false,
    "args": [],
    "excludes": []
}
```

#### Tests
```
mocha
```

#### Sublime Text plugin installation

The hackish way is to create a repository file that can be served over HTTPS
within internal network. A really good place is `backend_static` repo on book
KVM.

End user will have to add a new Package Control repository (via _Package Control:
Add Repository_ command) at

    https://██████████-████.███.booking.com/███████_██████/sublime_channel/packages.json

Then over time we would update this file and release new versions. Zipped packages
can be stored near that address as well.
