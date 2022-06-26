grammar Logic;

formula : expr EOF ;

expr : b_expr
     | op_expr ;

b_expr : '(' op_expr ')' ;

op_expr : neg_expr (op op_expr)? ;
op : AND | OR | IMPLIES ;

neg_expr : NOT neg_expr
         | value
         ;

value : TRUE
      | FALSE
      | PROP
      | b_expr
      ;

WS : [ \t\n\r\u000C] -> skip;
AND : '^' ;
OR : 'V' ;
IMPLIES : '->' ;
NOT : '-' ;
TRUE : 'T' ;
FALSE : 'F' ;
PROP : [a-zA-Z]+;
