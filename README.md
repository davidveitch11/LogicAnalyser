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

### React

The application was developed using React to build the HTML structure and control
the behavioural logic and state of the application. This is a powerful tool that
changes the way web design can be viewed by developing each component of the UI
separately and thus keeping all the code managing structure, logic and state for
the same aspect of the layout in one place. This made developing this tool more
effiecient and modular which also aided with developing in stages.

### ANTLR

The first step of the tool on the entry of a new formula is to parse the formula
to allow it to be understood by further processes within the system. The library
[antlr](https://www.antlr.org/) was used to generate the parser for the tool.
This involved writing a grammar for the language to be processed - this is in 
`parser/Logic.g4` - and using the library to generate a parser for the grammar.
After this, antlr then produces a `listener` and `visitor` which are base classes
that can be used to explore the expression tree produced in different ways, which
were then be extended to allow a project-specific listener for processing the
expression tree and producing a more refined tree representing the structure of
the formula. It would have been possible to write a parser from scratch for the
project but using an external library meant that all the testing that would be
required had already taken place and allowed the development of the rest of the
project to continue smoothly.

### FormulaManager

The project has a simple structure where the management of the formula happened
at the top of the tree - in the component `FormulaManager` - and all subcomponents
were able to access the results of these computations to display.

The original intention was to have the formula manager in charge of only the
formula itself and allowing the individual components to take charge of processing
the formula. This was not what was produced as it was realised that since components
are regularly re-rendered, this could result in a lot of repeated computation. It
was necessary to only re-compute values when the original formula changed, which
meant that either there would need to be some form of message passed down the
component tree on a change or that the computations would have to occur in the one
location which would be notified on a change to the input. It was decided that
the second option should be used and as much of the code for computation should
be split to other modules, as the first option did not seem in line with the idea
of 'top-down' state in React components: values should be passed down and function calls
should be sent up, to have a higher component cause computation in a lower component
would contradict this.

This result had the unfortunate effect of removing some of the goals of the project.
Now the components displaying the results of computations have little to do with
the computations themselves. In addition the code for performing the necessary 
is not all in one place with the parsing done in FormulaManager, the conversion
to CNF in the nodes of the formula tree and the DPLL analysis in a separate module.
These decisions were the right ones as it makes sense to have the parsing code
in the module for managing the formula and other processes in other modules, with
the CNF conversion taking place in the nodes of the tree as it involves recursively
altering the structure of a formula.

This is an example of a situation where using one tool for its benifits requires
compromises elsewhere. Despite this, it may have been better to try to collect
the code in one place.

### Context

Since the structure of components has results produced at the top of the tree and
passed down to lower components, it was thought prudent to have the top component
use Contexts to pass the information to the whole sub-tree without having to pass
the values to every child.

The other side of this is that the values are all compacted into a large context
object and are all read by the shallow components. It may have made more sense
then to simply pass the relevant values to each child component that needed it.

Back to the first side, this method allowed separation of the structure of
components and the formula manager, which was used to re-shuffle the various
parts of the display. In addition, the use of contexts allowed the `FormulaDisplay`
component to be moved down a layer without rewriting any other code.

Ultimately, this is another trade-off between desires and has been left in the
original design as it works well enough.

