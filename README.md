# Logic Analyser

This project is a simple web tool that allows someone to examine a formula in
propositional calculus, sometimes known as zero-th order logic. This readme/
report describes the use of the tool, installation, and an overview of the
development process taken to create it.

## Usage

The tool consists of a single page. Initially, the page consists of an input box
where a formula in propositional calculus should be entered. When submitted, this
formula should appear below the input box as well and it should match what was
written. The repeated formula was written the way the formula was parsed with
every binary operation wrapped in brackets to show exactly how the formula is
understood.

When a new formula is entered, all three sections will change their contents to
show the analysis of the formula. The CNF section will show an equivalent formula
in conjunctive normal form. The truth table to the side will be able to evaluate
the formula for all possible assignments of the propositional variables. This
will be limited to just five variables as the number of rows grows exponentially
with the number of variables and too many rows can make the tool slow to use,
but can be overridden by clicking the button provided if desired. The DPLL section
shows the steps taken using DPLL to determine if the formula is satisfiable.

## Installation

The system is built using React and requires `node.js` to install. The simplest
method to using the tool is to run it in "development" mode. Typing the comman
`npm start` from within this directory will start the development
centre and open the tool on the default browser. With access to a HTTP server,
the command `npm build` will create a working version of the tool in the `build`
directory which can be published using the server.

More details on either method of deployment are provided in the
`create-react-app-README.md` file and are available on the
[Create React App](https://github.com/facebook/create-react-app) website.

## Development

Why react
Why antlr
FormulaManager/Whatisthis
Contexts - good or bad?
