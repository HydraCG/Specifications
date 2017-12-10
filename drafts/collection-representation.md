# Hydra Collection Representation

This document describes the representation of collections in Hydra.

**Tracking issue:** [ISSUE-41](https://github.com/HydraCG/Specifications/issues/41)


## Requirements

* [Avoid that collections "break" relationships](https://www.w3.org/community/hydra/wiki/Avoid_that_collections_break_relationships)
* Needs to be able to support [pagination](https://www.w3.org/community/hydra/wiki/Pagination)
* Needs to be able to support [filtering](https://www.w3.org/community/hydra/wiki/Filtering)


## Vocabulary

Classes:

* `Collection`


Properties:

* `member`
* `totalItems`
* `search`
* `collection`
* `manages`
* `subject`
* `object`

It has been decided to declare it a best practice to inline the "manages block"
in collection representations.


## Examples

The following examples illustrates a simple collection.

```json
{
  "@context": "http://www.w3.org/ns/hydra/core",
  "@id": "http://api.example.com/an-issue/comments",
  "@type": "Collection",
  "totalItems": "4980",
  "member": [
    {
      "@id": "/comments/429"
    },
    {
      "@id": "/comments/781",
      "title": "Properties may be embedded directly in the collection"
    },
    ...
  ]
}
```


If a vocabulary that uses `rdfs:range`, a collection needs to be referenced
indirectly to not confuse the client:

```json
{
  "@context": "http://www.w3.org/ns/hydra/core",
  "@id": "/alice",
  "collection": {
    "@id": "/alice/friends",
    "@type": "Collection",
    "manages": {
      "property": "foaf:knows",
      "subject": "/alice"
    }
  }
}
```


## Open questions

* Pagination: [ISSUE-42](https://github.com/HydraCG/Specifications/issues/42)
* Name of the "`manages` block": [ISSUE-60](https://github.com/HydraCG/Specifications/issues/60)
