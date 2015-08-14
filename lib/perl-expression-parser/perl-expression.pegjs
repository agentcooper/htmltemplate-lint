{
  function join(s) {
    return s.join("");
  }
}

start
  = sentence

sentence
  = orSentence

orSentence
  = lhs:andSentence __ op:orOperand __ rhs:orSentence { return { operation: op, between: [lhs, rhs], type: 'or' }; }
  / andSentence

andSentence
  = lhs:compareSentence __ op:andOperand __ rhs:andSentence { return { operation: op, between: [lhs, rhs], type: 'and' }; }
  / compareSentence

compareSentence
  = lhs:primarySentence _ compareOperand _ rhs:primarySentence { return { operation: 'eq', between: [lhs, rhs], type: 'compare' }; }
  / primarySentence

Expression
  = first:xprimarySentence
    rest:(__ '.' __ s:xprimarySentence { return s; })*
    { return { type: 'expr', value: [first].concat(rest) }; }

TernaryExpression
  = cond:Expression _ '?' _ iftrue:primarySentence _ ':' _ iffalse:primarySentence { return { type: 'ternary', cond: cond, iftrue: iftrue, iffalse: iffalse } }

primarySentence =
  '!' xp:xprimarySentence { return { type: 'unary', value: xp } }
  / 'not' __ xp:xprimarySentence { return { type: 'unary', value: xp } }
  / 'ref' __ xp:xprimarySentence { return { type: 'unary', value: xp } }
  / TernaryExpression
  / Expression
  / xprimarySentence

xprimarySentence
  =
  '(' _ sentence:sentence _ ')' { return sentence; }
  / str:QuotedString { return { value: str, type: 'string' }  }
  / num:($[0-9]+) { return { value: num, type: 'number' } }
  / operand

SourceCharacter
  = .

LineTerminator "end of line"
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028"
  / "\u2029"

QuotedString
  = SingleQuotedString
  / DoubleQuotedString

SingleQuotedString = "'" chars:SingleStringCharacter* "'" {
  return join(chars);
}

DoubleQuotedString = "\"" chars:DoubleStringCharacter* "\"" {
  return join(chars);
}

SingleStringCharacter
  = !("'" / "\\" / LineTerminator) SourceCharacter { return text(); }
  / "\\" esc:SingleEscapeCharacter { return esc; }

DoubleStringCharacter
  = !("\"" / "\\" / LineTerminator) SourceCharacter { return text(); }
  / "\\" esc:SingleEscapeCharacter { return esc; }

SingleEscapeCharacter
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b"; }
  / "f"  { return "\f"; }
  / "n"  { return "\n"; }
  / "r"  { return "\r"; }
  / "t"  { return "\t"; }
  / "v"  { return "\v"; }

regExp
  = 'm'? '/' (n:$[^\/]+) '/' { return { type: 'regularExpression', value: n } }

operand
  =
  functionCall /
  regExp /
  operand:(n:$[a-zA-Z0-9\-_/:\.{}\$>\[\]\@]+) { return { value: operand, type: 'operand' }; }

functionCall
  = op:(n:$[a-zA-Z0-9\-_/:\.{}\$>\[\]\@]+) '(' values:(first:sentence rest:(_ ',' _ s:sentence { return s; })* { return [first].concat(rest); })? _ ')' { return { function_name: op, arguments: values, type: 'call' }; }

orOperand = '||' / 'or'

andOperand = '&&' / 'and'

compareOperand = '<=' / '>=' / '==' / '!=' / '<=>' / 'eq' / 'ne' / 'cmp' / '~~' / '<' / '>' / 'lt' / 'gt' / 'le' / 'ge' / '=~'

_ "optionalWhiteSpace"
  = whiteSpace *

__ "mandatoryWhiteSpace"
  = whiteSpace +

whiteSpace
  = [ \t\n\r]+
