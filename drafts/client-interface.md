# Hydra Reference Client Interface

This document describes the interface of a yet-to-be-built reference client
library for ReST APIs supporting the Hydra vocabulary. In the following we call
that client library "Hydra client".

The Hydra client works similar to a browser. You point it to a URL. The URL becomes the current resource.
Then you interact with the controls of the representation.

The examples show in pseudo-code how a command line interface application could use the Hydra client
for interaction with an API.


## Current Status

This document is in its early stages, a number of points are still under discussion, with no final consensus.

* How does an application which uses the Hydra client maintain state? A Hydra API may have a combined state: On the one hand there is the `ApiDocumentation`, on the other hand there is the current representation. In order to determine available hypermedia affordances for the current state, both the `ApiDocumentation` and the current representation must be considered. The `ApiDocumentation` is not static but must be kept up to date at all times. Question: should the Hydra client maintain the combined application state or should it be stateless and leave the management of the combined state to the calling application?
* Should the Hydra client expose the uniform interface of the underlying protocol, e.g. by handing out information about the methods supported by a resource and by expecting the caller to understand their semantics and make use of that methods - e.g. by telling the caller that the methods GET, PATCH etc. are supported in the case of HTTP? Or should the Hydra client abstract the methods of the uniform interface away, posing the challenge that other protocols may have different method semantics than HTTP and that it might not always be clear how to map from the abstraction method to a concrete protocol method (e.g. CoAP has a restricted set of methods).
* There may be multiple affordances in a given representation that match a given linked data predicate. Consider a representation which contains a list of items where each item has the same predicate whose value is a URL pointing to some related resource (addresses of friends). Another example is a representation which happens to use a certain predicate in several places (address of a location, billing address, delivery address). Obviously the predicate alone is not sufficient for a client to work with a related resource, rather it seems that the caller of the Hydra client needs to be able to determine the context where a predicate occurs. How much context is needed for that? How can the client enable the caller to determine that context, also considering the `ApiDocumentation`?


## Find API entrypoint for website

The Hydra vocabulary has a special mechanism to discover API entrypoints.

```
hydraClient.gotoEntrypoint(website)
print hydraClient.representation
// the API entrypoint is now the current representation
```


## Retrieve a resource from URI

### Using uniform interface

Assuming that `apiurl` is known as the API's entrypoint and that it is a
[schema:FoodEstablishment](http://schema.org/FoodEstablishment) which offers a menu from which users
can choose food items. The menu information is not embedded in the
`FoodEstablishment` representation,
rather there is only a link to the menu. I.e. the `FoodEstablishment` representation
has a control to retrieve the menu.

The following code assumes that the client is aware of the uniform interface of the underlying protocol.
In the example below the client knows that it uses the uniform interface of HTTP.

```
hydraClient.setLocation(apiurl);
// apiurl is now the current representation

// we want to retrieve or download the menu of the food establishment
menu = hydraClient.controls["http://schema.org/hasMenu"]
if(menu && menu.methods["GET"])
    hydraClient.execute("GET", menu.href)
    print hydraClient.representation
    hydraClient.back()
    if(menu.methods["GET"].supportsMediaType("application/pdf"))
        hydraClient.execute("GET", menu.href, {"Accept": application/pdf"})
        saveFile(hydraClient.representation, "menu.pdf")
        hydraClient.back()
        // download pdf without making it the current resource
        hydraClient.download("GET", menu.href, {"Accept": application/pdf"}, "menu.pdf")
```


## Sending a request payload

Assuming that the resource at `producturl` has a [schema:orderedItem](http://schema.org/orderedItem) control:

```
hydraClient.setLocation(producturl);
ordered = hydraClient.controls["http://schema.org/orderedItem"]
if(ordered && ordered.methods["POST"])
    expectations = ordered.methods["POST"].expectations();
    // there may be header, uritemplate and body expectations - here: body
    data = {}
    forEach(expectation in expectations)
        print "expects " + expectation.kind // "expects body"
        data[expectation.kind] = {}
        forEach(expectedProperty in expectation.properties)
            print "enter " + expectedProperty.property +
                "[default " + expectedProperty.defaultValue + "]" +
                expectedProperty.required ? "(*)" : ""
            input value
            data[expectation.kind][expectation.variable] = value
    hydraClient.execute("POST", uri, headers={}, data["body"])
    print hydraClient.representation
```

## Working with IRI templates

> URI Templates provide a mechanism for abstracting a space of resource identifiers such that the variable
parts can be easily identified and described.
-- rfc6570

The resulting URI identifies a resource that may support all methods of the uniform interface.


### Retrieving Resource from IRI Template

Assuming that `apiurl` has a [hydra:search](http://www.w3.org/ns/hydra/core#search) control.

```
hydraClient.setLocation(apiurl);
search = hydraClient.controls["http://www.w3.org/ns/hydra/core#search"]
if(search && search.methods["GET"])
    expectations = search.methods["GET"].expectations();
    // there may be header, uritemplate and body expectations - here: uritemplate
    data = {}
    forEach(expectation in expectations)
        print "expects " + expectation.kind // "expects uritemplate"
        data[expectation.kind] = {}
        forEach(expectedProperty in expectation.properties)
            print "enter " + expectedProperty.property +
                "[default" + expectedProperty.defaultValue + "]" +
                expectedProperty.required ? "(*)" : ""
            input value
            data[expectation.kind][expectation.variable] = value
    uri = search.expandTemplate(data["uritemplate"])
    hydraClient.execute("GET", uri)
    print hydraClient.representation
```


### Sending a request payload to an IRI template

```
hydraClient.setLocation(producturl);
ordered = hydraClient.controls["http://schema.org/orderedItem"]
if(ordered && ordered.methods["POST"])
    expectations = ordered.methods["POST"].expectations();
    // there are header, uritemplate and body expectations: here: uritemplate and body
    data = {}
    forEach(expectation in expectations)
        print "expects" + expectation.kind
        data[expectation.kind] = {}
        forEach(expectedProperty in expectation.properties)
            print "enter " + expectedProperty.property +
                "[default " + expectedProperty.defaultValue + "]" +
                expectedProperty.required ? "(*)" : ""
            input value
            data[expectation.kind][expectation.variable] = value
    uri = ordered.expandTemplate(data["uritemplate"])
    hydraClient.execute("POST", uri, headers, data["body"])
    print hydraClient.representation
```
