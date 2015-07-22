## HTML::Template lint

#### Run

```
node index.js ./test.inc
```

#### Linter

Linter is based on SublimeLinter, so install that first.

```
cd /Users/{USERNAME}/Library/Application\ Support/Sublime\ Text\ 3/Packages/

ln -s ~/htmltemplate-lint/SublimeLinter-contrib-htmltemplate-lint SublimeLinter-contrib-htmltemplate-lint
```

Go to `Sublime Text > Preferences > Package Settings > SublimeLinter > Settings - User` and to 'linters'

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
