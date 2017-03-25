# Hydra Reference Client Interface

This document describes the interface of a yet-to-be-built reference client
library in pseudo code.

The hydra client works similar to a browser. You point it to a URL. The URL becomes the current resource. 
Then you interact with the controls of the resource.

## Find API entrypoint for website

Hydra has a special mechanism to discover API entrypoints.

```
hydra.findEntrypoint(website)
print hydra.resource 
// the API entrypoint is now the current resource
```

## Retrieve a resource


### Using uniform interface

Assuming that apiurl is known as API entrypoint and that it is a [FoodEstablishment](http://schema.org/FoodEstablishment)
```
hydra.setLocation(apiurl);
// api url is now the current resource

// we want to retrieve or download the menu of the food establishment
menu = hydra.controls["http://schema.org/hasMenu"]
if(menu && menu.methods["GET"])
    hydra.execute("GET", menu)
    print hydra.resource
    hydra.back()
    if(menu.methods["GET"].supportsMediaType("application/pdf")) 
        hydra.execute("GET", menu, "application/pdf")
        saveFile(hydra.resource, "menu.pdf")
        hydra.back()
        // download pdf without making it the current resource (uses GET) 
        hydra.download(menu, "application/pdf", "menu.pdf")
    

```

### Using schema.org action

Assuming that apiurl is known as API entrypoint and that it is a [FoodEstablishment](http://schema.org/FoodEstablishment)

Related action: [DownloadAction](http://schema.org/DownloadAction)

The client has a downloadAction() method for downloading a resource to a file rather than making that 
resource the new current resource. The API looks for the operation of type DownloadAction 
on the given control and executes its method.

This assumes that the Hydra client shall have a limited number of convenience methods which make use of 
known schema.org Actions. 
```
hydra.setLocation(apiurl);
menu = hydra.controls["http://schema.org/hasMenu"]
if (menu && menu.actions["http://schema.org/DownloadAction"])
    hydra.downloadAction(menu, "menu.pdf")
    
```