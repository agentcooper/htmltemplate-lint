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
