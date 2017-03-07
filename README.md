# Hydra Architecture Diagram

This repository contains work in progress for an architecture diagram of the [Hydra Core Vocabulary](http://www.hydra-cg.com/spec/latest/core/).

## Overview

![Latest diagram version](https://rubenverborgh.github.io/Hydra-Architecture-Diagram/hydra-architecture-diagram.svg)

An arrow represents a dependency from a component on another.

## Components

### Resources
**Resources are the atoms of (Hydra-enabled) REST Web APIs.**

Resources can have one or more representations.
If those representations are RDF-based formats (or support embedding RDF),
then they describe the resource using elements from the Hydra Core Vocabulary.

#### Defined by Hydra
- how resources can incorporate Hydra descriptions and/or controls
    - in particular, in which graph this should happen

### Collections
**Collections are sets of resources and associated behavior.**

Collections can contain zero or more resources.

#### Defined by Hydra
- describing kinds of collections
    - what their elements look like
- describing operations on collections
    - creation
    - addition
    - deletion

### Errors
TODO: add details

### Paging
TODO: add details

### Filtering
TODO: add details

### URI Templates
TODO: add details

### Fields
TODO: add details

### Actions
TODO: add details
