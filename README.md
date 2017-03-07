# Hydra Architecture Diagram

This repository contains work in progress for an architecture diagram of the [Hydra Core Vocabulary](http://www.hydra-cg.com/spec/latest/core/).

## Overview

![Latest diagram version](https://rubenverborgh.github.io/Hydra-Architecture-Diagram/hydra-architecture-diagram.svg)

An arrow represents a dependency from a component on another.

## Components

### Web API
**Web APIs consist of resources and collections.**

#### Defined by Hydra
- structural description of an API
- metadata of an API

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
Collections are resources themselves.

#### Defined by Hydra
- describing kinds of collections
    - what their elements look like
- describing operations on collections
    - creation
    - addition
    - deletion

### Errors
**Errors describe what can go wrong during the interaction with a resource,
and possible ways to address it.**

#### Defined by Hydra
- types of errors 
- error metadata
    - possible causes
    - possible fixes
- connecting errors to resources

### Paging
**Pages partition collections into subsets such that
each child resource appears on exactly one page.**

#### Defined by Hydra
- page navigation
    - next, previous
    - first, last
    - jump to specific page
- page metadata
    - current page number
    - total number of pages
    - number of items per page
- ordering
    - based on resource attributes
- client-initiated paging
    - determine ordering
    - determine number of items per page

### Filtering
TODO: add details

### URI Templates
TODO: add details

### Fields
TODO: add details

### Actions
TODO: add details
