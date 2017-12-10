# Security considerations

## JSON array root security issues

Due to security issues with JSON arrays which can be exploited in some circumstances,
there may be a need to avoid pure arrays in favor of a JSON object.
In the scenario above, server returned a single object, which won't cause issues.
But it is possible to return multiple resources, resulting in an JSON array returned
(server may not use any JSON-LD context or it may be completely different from the one used by the client).
There are several possibilities here. One of them would be to use a *@graph* notation, i.e.:

```json
{
  "@context": "/api/context.jsonld",
  "@graph": [
    {
      "@id": "/api",
      "@type": "EntryPoint",
      "collection": [
        {
          "@id": "/api/events",
          "title": "List of events",
          "@type": "Collection",
          "manages": {
            "property": "rdf:type",
            "object": "schema:Event"
          },
          "operation": {
            "@type": ["Operation", "schema:CreateAction"],
            "title": "Create new event",
            "method": "POST",
            "expects": "schema:Event"
          }
        },
        {
          "@id": "/api/people",
          "title": "List of people",
          "@type": "Collection",
          "manages": {
            "property": "rdf:type",
            "object": "schema:Person"
          },
          "operation": {
            "@type": ["Operation", "schema:CreateAction"],
            "title": "Create new person",
            "method": "POST",
            "expects": "schema:Person"
          }
        },
        {
          "@id": "/api/venues",
          "title": "List of venues",
          "@type": "Collection",
          "manages": {
            "property": "rdf:type",
            "object": "schema:Place"
          },
          "operation": {
            "@type": ["Operation", "schema:CreateAction"],
            "title": "Create new venue",
            "method": "POST",
            "expects": "schema:Place"
          }
        }
      ]
    },
    {
      "rdfs:label": "Some other resource somehow related to the main one."
    }
  ]
}
```

Using default graph seems reasonable, but implies some additional, possibly unwanted,
logic of the graph itself.
We could consider another approach or somehow standardize the graph name (if necessary).
