# Realms

Fullstack generation tool for Restlang


## Installation

```
npm install realms
```

## Introduction

Realms is a command-line-application that consumes Restlang source and targets, and outputs web applications.  It is expected that Realms can only generate the basic structure of the webapp, ready for you to manually implement complex business logic.

```
Usage: realms [options] <name>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -i, --source <source>  The path to the input restlang file(s).
    -o, --target <target>  The output directory.
```

## Restlang

Restlang is a Web API description language.  More information can be found at https://github.com/binarymax/restlang