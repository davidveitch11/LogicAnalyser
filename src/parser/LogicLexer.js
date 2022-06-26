// Generated from Logic.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4';


const serializedATN = [4,0,10,47,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,
4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,1,0,1,0,1,1,1,1,1,2,1,2,1,
2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,4,9,44,8,9,
11,9,12,9,45,0,0,10,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,1,0,2,
3,0,9,10,12,13,32,32,2,0,65,90,97,122,47,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,
0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,
1,0,0,0,0,19,1,0,0,0,1,21,1,0,0,0,3,23,1,0,0,0,5,25,1,0,0,0,7,29,1,0,0,0,
9,31,1,0,0,0,11,33,1,0,0,0,13,36,1,0,0,0,15,38,1,0,0,0,17,40,1,0,0,0,19,
43,1,0,0,0,21,22,5,40,0,0,22,2,1,0,0,0,23,24,5,41,0,0,24,4,1,0,0,0,25,26,
7,0,0,0,26,27,1,0,0,0,27,28,6,2,0,0,28,6,1,0,0,0,29,30,5,94,0,0,30,8,1,0,
0,0,31,32,5,86,0,0,32,10,1,0,0,0,33,34,5,45,0,0,34,35,5,62,0,0,35,12,1,0,
0,0,36,37,5,45,0,0,37,14,1,0,0,0,38,39,5,84,0,0,39,16,1,0,0,0,40,41,5,70,
0,0,41,18,1,0,0,0,42,44,7,1,0,0,43,42,1,0,0,0,44,45,1,0,0,0,45,43,1,0,0,
0,45,46,1,0,0,0,46,20,1,0,0,0,2,0,45,1,6,0,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class LogicLexer extends antlr4.Lexer {

    static grammarFileName = "Logic.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'('", "')'", null, "'^'", "'V'", "'->'", 
                         "'-'", "'T'", "'F'" ];
	static symbolicNames = [ null, null, null, "WS", "AND", "OR", "IMPLIES", 
                          "NOT", "TRUE", "FALSE", "PROP" ];
	static ruleNames = [ "T__0", "T__1", "WS", "AND", "OR", "IMPLIES", "NOT", 
                      "TRUE", "FALSE", "PROP" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

LogicLexer.EOF = antlr4.Token.EOF;
LogicLexer.T__0 = 1;
LogicLexer.T__1 = 2;
LogicLexer.WS = 3;
LogicLexer.AND = 4;
LogicLexer.OR = 5;
LogicLexer.IMPLIES = 6;
LogicLexer.NOT = 7;
LogicLexer.TRUE = 8;
LogicLexer.FALSE = 9;
LogicLexer.PROP = 10;



