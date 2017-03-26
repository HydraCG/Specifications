# Hydra Reference Client Interface

This document describes the interface of a yet-to-be-built reference client
library for ReST APIs supporting the Hydra vocabulary. In the following we call 
that client library "Hydra client".

The Hydra client works similar to a browser. You point it to a URL. The URL becomes the current resource. 
Then you interact with the controls of the representation.

The examples show in pseudocode how a commandline interface application could use the Hydra client 
for interaction with an API.

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

## Sending a Request Body

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

## Working with IRI Templates

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

### Sending a Request Body to IRI Template

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
 
