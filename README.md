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
  - in particular, how descriptions and controls can be separated from data
- describing representations
  - properties that a resource representation will list

#### Dependencies
- on Errors, since resources can generate errors


### Collections
**Collections are sets of resources and associated behavior.**

Collections can contain zero or more resources.
Collections are resources themselves.

#### Defined by Hydra
- describing kinds of collections
  - properties of their elements (type etc.)
- describing representations
  - (optional) properties of resources that a collection representation will list
- describing operations on collections
  - creation
  - addition
  - deletion

#### Dependencies
- on Resources, since a collection is a resource and contains resources


### Errors
**Errors describe what can go wrong during the interaction with a resource,
and possible ways to address it.**

#### Defined by Hydra
- types of errors 
- error metadata
  - possible causes
  - possible fixes
- connecting errors to resources

#### Dependencies
none


### Fields
**Fields are places where clients can provide input.**

#### Defined by Hydra
- parameter description
  - name
- constraints
  - range
  - validation

#### Dependencies
none


### URI Templates
**URI Templates express how field values are combined into an URL.**

#### Defined by Hydra
- field serialization

#### Dependencies
- on Fields, since they are needed to fill out templates


### Entity Bodies
**Entity Bodies express field values are combined into an request body (e.g., for `POST`/`PUT`/`PATCH`).**

#### Defined by Hydra
- entity structure
  - JSON(-LD)
  - other RDF formats
- field serialization

#### Dependencies
- on Fields, since they are needed to fill out entity bodies


### Paging
**Pages partition collections into subsets such that
each child resource appears on exactly one page.**

Pages (only) change [application state](https://www.safaribooksonline.com/library/view/restful-web-services/9780596529260/ch04s05.html#id3189296).

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

#### Dependencies
- on Collections, since they are being paged
- on URI Templates, since some paging options require generating a page URI


### Filtering
**Filters select subsets of collections based on resource attributes.**

Filters (only) change [application state](https://www.safaribooksonline.com/library/view/restful-web-services/9780596529260/ch04s05.html#id3189296).

#### Defined by Hydra
- availability of filters
- conditions for applying a filter
- the effect of a filter
  - how a filter maps input values to a selection

#### Dependencies
- on Collections, since they are being filtered
- on URI Templates, since some filters require generating a page URI
- on Fields, since they relate the filter to its effect


### Actions
**Actions express manipulations of resources through representations.**

Actions change [resource state](https://www.safaribooksonline.com/library/view/restful-web-services/9780596529260/ch04s05.html#id3189296).

#### Defined by Hydra
- availability of actions
- conditions for executing an action
- the effect of executing an action

#### Dependencies
- on Resources, since actions can be executed on them
- on Collections, since actions can be executed on them
- on Fields, since they relate the action to its effect
- on Entity Bodies, since some actions require sending a request body
