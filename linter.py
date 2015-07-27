#
# linter.py
# Linter for SublimeLinter3, a code checking framework for Sublime Text 3
#
# Written by Artem Tyurin
# Copyright (c) 2015 Artem Tyurin
#
# License: MIT
#

"""This module exports the HtmltemplateLint plugin class."""

from SublimeLinter.lint import NodeLinter, util
from os.path import dirname, realpath, join

class HtmltemplateLint(NodeLinter):

    """Provides an interface to htmltemplate-lint."""

    syntax = 'html'
    cmd = (join(dirname(realpath(__file__)), 'bin/lint'), '--oneline', '@')
    version_args = '--version'
    version_re = r'(?P<version>\d+\.\d+\.\d+)'
    version_requirement = '>= 0.0.1'
    regex = (
        r'^.+?: line (?P<line>\d+), col (?P<col>\d+), '
        r'(?:(?P<error>Error)|(?P<warning>Warning)) - '
        r'(?P<message>.+)'
    )
    multiline = False
    line_col_base = (1, 1)
    tempfile_suffix = None
    error_stream = util.STREAM_BOTH
    selectors = {}
    word_re = r'(\[%.*?%\]|[a-zA-Z0-9\-_<]+)'
    defaults = {}
    inline_settings = None
    inline_overrides = None
    comment_re = r'\s*/[/*]'
