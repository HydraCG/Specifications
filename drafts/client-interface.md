# Hydra Reference Client Interface

This document describes the interface of a yet-to-be-built reference client
library in pseudo code.

The hydra client works similar to a browser. You point it to a URL. The URL becomes the current resource. 
Then you interact with the controls of the resource.

## Find API entrypoint for website

Hydra has a special mechanism to discover API entrypoints.

```
hydra.findEntrypoint(website)
print hydra.representation 
// the API entrypoint is now the current representation
```

## Retrieve a resource from URI

### Using uniform interface

Assuming that apiurl is known as API entrypoint and that it is a 
[FoodEstablishment](http://schema.org/FoodEstablishment). The menu information is not embedded, but there is only a link to the menu, 
i.e. the FoodEstablishment representation has a control to retrieve the menu. 

This assumes that the client is aware of the uniform interface of the underlying protocol. 
In the example below the client knows that it uses the uniform interface of HTTP.
```
hydra.setLocation(apiurl);
// apiurl is now the current representation

// we want to retrieve or download the menu of the food establishment
menu = hydra.controls["http://schema.org/hasMenu"]
if(menu && menu.methods["GET"])
    hydra.execute("GET", menu.href)
    print hydra.representation
    hydra.back()
    if(menu.methods["GET"].supportsMediaType("application/pdf")) 
        hydra.execute("GET", menu.href, {"Accept": application/pdf"})
        saveFile(hydra.representation, "menu.pdf")
        hydra.back()
        // download pdf without making it the current resource 
        hydra.download("GET", menu.href, {"Accept": application/pdf"}, "menu.pdf")
    

```

### Using schema.org action

Assuming that apiurl is known as API entrypoint and that it is a [FoodEstablishment](http://schema.org/FoodEstablishment)

Related action: [DownloadAction](http://schema.org/DownloadAction)

The client has a downloadAction() method for downloading a resource to a file rather than making that 
resource the new current resource. The client looks for the operation of type DownloadAction 
on the given control and executes its method.

This assumes that the Hydra client shall have a limited number of convenience methods which make use of 
known schema.org Actions. 
```
hydra.setLocation(apiurl);
menu = hydra.controls["http://schema.org/hasMenu"]
if (menu && menu.actions["http://schema.org/DownloadAction"] && !menu.templated)
    hydra.downloadAction(menu, "menu.pdf")
    
```

## Sending a Request Body

Assuming that producturl has a schema:orderedItem control

```
hydra.setLocation(producturl);
ordered = hydra.controls["http://schema.org/orderedItem"]
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
    hydra.execute("POST", uri, headers={}, data["body"])
    print hydra.representation
```

## Working with Resources in a URI space

Using IriTemplate. 

URI Templates provide a mechanism for abstracting a space of resource identifiers such that the variable 
parts can be easily identified and described.
-- rfc6570

The resulting URI identifies a resource that may support all methods of the uniform interface.

### Retrieving Resource from URI Space

Assuming that apiurl has a hydra:search control

```
hydra.setLocation(apiurl);
search = hydra.controls["http://www.w3.org/ns/hydra/core#search"]
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
    hydra.execute("GET", uri)
    print hydra.representation
```

### Sending a Request Body to URI Space

```
hydra.setLocation(producturl);
ordered = hydra.controls["http://schema.org/orderedItem"]
if(ordered && ordered.methods["POST"] && ordered.templated)
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
    hydra.execute("POST", uri, headers, data["body"])
    print hydra.representation
```
 
