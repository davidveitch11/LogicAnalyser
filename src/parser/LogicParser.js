// Generated from Logic.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4';
import LogicListener from './LogicListener.js';
const serializedATN = [4,1,10,45,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,
2,5,7,5,2,6,7,6,1,0,1,0,1,0,1,1,1,1,3,1,20,8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,
3,1,3,3,3,30,8,3,1,4,1,4,1,5,1,5,1,5,3,5,37,8,5,1,6,1,6,1,6,1,6,3,6,43,8,
6,1,6,0,0,7,0,2,4,6,8,10,12,0,1,1,0,4,6,43,0,14,1,0,0,0,2,19,1,0,0,0,4,21,
1,0,0,0,6,25,1,0,0,0,8,31,1,0,0,0,10,36,1,0,0,0,12,42,1,0,0,0,14,15,3,2,
1,0,15,16,5,0,0,1,16,1,1,0,0,0,17,20,3,4,2,0,18,20,3,6,3,0,19,17,1,0,0,0,
19,18,1,0,0,0,20,3,1,0,0,0,21,22,5,1,0,0,22,23,3,6,3,0,23,24,5,2,0,0,24,
5,1,0,0,0,25,29,3,10,5,0,26,27,3,8,4,0,27,28,3,6,3,0,28,30,1,0,0,0,29,26,
1,0,0,0,29,30,1,0,0,0,30,7,1,0,0,0,31,32,7,0,0,0,32,9,1,0,0,0,33,34,5,7,
0,0,34,37,3,10,5,0,35,37,3,12,6,0,36,33,1,0,0,0,36,35,1,0,0,0,37,11,1,0,
0,0,38,43,5,8,0,0,39,43,5,9,0,0,40,43,5,10,0,0,41,43,3,4,2,0,42,38,1,0,0,
0,42,39,1,0,0,0,42,40,1,0,0,0,42,41,1,0,0,0,43,13,1,0,0,0,4,19,29,36,42];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LogicParser extends antlr4.Parser {

    static grammarFileName = "Logic.g4";
    static literalNames = [ null, "'('", "')'", null, "'^'", "'V'", "'->'", 
                            "'-'", "'T'", "'F'" ];
    static symbolicNames = [ null, null, null, "WS", "AND", "OR", "IMPLIES", 
                             "NOT", "TRUE", "FALSE", "PROP" ];
    static ruleNames = [ "formula", "expr", "b_expr", "op_expr", "op", "neg_expr", 
                         "value" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LogicParser.ruleNames;
        this.literalNames = LogicParser.literalNames;
        this.symbolicNames = LogicParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	formula() {
	    let localctx = new FormulaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LogicParser.RULE_formula);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 14;
	        this.expr();
	        this.state = 15;
	        this.match(LogicParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	expr() {
	    let localctx = new ExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, LogicParser.RULE_expr);
	    try {
	        this.state = 19;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 17;
	            this.b_expr();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 18;
	            this.op_expr();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	b_expr() {
	    let localctx = new B_exprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, LogicParser.RULE_b_expr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 21;
	        this.match(LogicParser.T__0);
	        this.state = 22;
	        this.op_expr();
	        this.state = 23;
	        this.match(LogicParser.T__1);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	op_expr() {
	    let localctx = new Op_exprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, LogicParser.RULE_op_expr);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 25;
	        this.neg_expr();
	        this.state = 29;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << LogicParser.AND) | (1 << LogicParser.OR) | (1 << LogicParser.IMPLIES))) !== 0)) {
	            this.state = 26;
	            this.op();
	            this.state = 27;
	            this.op_expr();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	op() {
	    let localctx = new OpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, LogicParser.RULE_op);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 31;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << LogicParser.AND) | (1 << LogicParser.OR) | (1 << LogicParser.IMPLIES))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	neg_expr() {
	    let localctx = new Neg_exprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, LogicParser.RULE_neg_expr);
	    try {
	        this.state = 36;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LogicParser.NOT:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 33;
	            this.match(LogicParser.NOT);
	            this.state = 34;
	            this.neg_expr();
	            break;
	        case LogicParser.T__0:
	        case LogicParser.TRUE:
	        case LogicParser.FALSE:
	        case LogicParser.PROP:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 35;
	            this.value();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	value() {
	    let localctx = new ValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, LogicParser.RULE_value);
	    try {
	        this.state = 42;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LogicParser.TRUE:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 38;
	            this.match(LogicParser.TRUE);
	            break;
	        case LogicParser.FALSE:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 39;
	            this.match(LogicParser.FALSE);
	            break;
	        case LogicParser.PROP:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 40;
	            this.match(LogicParser.PROP);
	            break;
	        case LogicParser.T__0:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 41;
	            this.b_expr();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

LogicParser.EOF = antlr4.Token.EOF;
LogicParser.T__0 = 1;
LogicParser.T__1 = 2;
LogicParser.WS = 3;
LogicParser.AND = 4;
LogicParser.OR = 5;
LogicParser.IMPLIES = 6;
LogicParser.NOT = 7;
LogicParser.TRUE = 8;
LogicParser.FALSE = 9;
LogicParser.PROP = 10;

LogicParser.RULE_formula = 0;
LogicParser.RULE_expr = 1;
LogicParser.RULE_b_expr = 2;
LogicParser.RULE_op_expr = 3;
LogicParser.RULE_op = 4;
LogicParser.RULE_neg_expr = 5;
LogicParser.RULE_value = 6;

class FormulaContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_formula;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	EOF() {
	    return this.getToken(LogicParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterFormula(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitFormula(this);
		}
	}


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_expr;
    }

	b_expr() {
	    return this.getTypedRuleContext(B_exprContext,0);
	};

	op_expr() {
	    return this.getTypedRuleContext(Op_exprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitExpr(this);
		}
	}


}



class B_exprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_b_expr;
    }

	op_expr() {
	    return this.getTypedRuleContext(Op_exprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterB_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitB_expr(this);
		}
	}


}



class Op_exprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_op_expr;
    }

	neg_expr() {
	    return this.getTypedRuleContext(Neg_exprContext,0);
	};

	op() {
	    return this.getTypedRuleContext(OpContext,0);
	};

	op_expr() {
	    return this.getTypedRuleContext(Op_exprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterOp_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitOp_expr(this);
		}
	}


}



class OpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_op;
    }

	AND() {
	    return this.getToken(LogicParser.AND, 0);
	};

	OR() {
	    return this.getToken(LogicParser.OR, 0);
	};

	IMPLIES() {
	    return this.getToken(LogicParser.IMPLIES, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitOp(this);
		}
	}


}



class Neg_exprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_neg_expr;
    }

	NOT() {
	    return this.getToken(LogicParser.NOT, 0);
	};

	neg_expr() {
	    return this.getTypedRuleContext(Neg_exprContext,0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterNeg_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitNeg_expr(this);
		}
	}


}



class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LogicParser.RULE_value;
    }

	TRUE() {
	    return this.getToken(LogicParser.TRUE, 0);
	};

	FALSE() {
	    return this.getToken(LogicParser.FALSE, 0);
	};

	PROP() {
	    return this.getToken(LogicParser.PROP, 0);
	};

	b_expr() {
	    return this.getTypedRuleContext(B_exprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.enterValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LogicListener ) {
	        listener.exitValue(this);
		}
	}


}




LogicParser.FormulaContext = FormulaContext; 
LogicParser.ExprContext = ExprContext; 
LogicParser.B_exprContext = B_exprContext; 
LogicParser.Op_exprContext = Op_exprContext; 
LogicParser.OpContext = OpContext; 
LogicParser.Neg_exprContext = Neg_exprContext; 
LogicParser.ValueContext = ValueContext; 
