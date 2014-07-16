Hydra: Hypermedia-Driven Web APIs
=====================================================================

Building Web APIs seems still more an art than a science. How can we
build APIs such that generic clients can easily use them? And how do
we build those clients? Current APIs heavily rely on out-of-band
information such as human-readable documentation and API-specific
SDKs. However, this only allows for very simple and brittle clients
that are hardcoded against specific APIs. Hydra, in contrast, is a set
of technologies that allow to design APIs in a different manner, in a
way that enables smarter clients.

The foundation is laid by the [Hydra Core Vocabulary][1]. It defines a
number of fundamental concepts, such as hypermedia controls and
collections, which allow machines to understand how to interact with
an API. Since all information about the API is available in a machine-
readable form, completely generic clients become possible. The Core
Vocabulary is complemented by [Linked Data Fragments][2], a set of
specifications that enable advanced yet efficient client-side querying
of Web APIs.

To participate in the development of these specifications please join
the [Hydra W3C Community Group][3].

More information about Hydra is available at http://www.hydra-cg.com/


[1]: http://www.hydra-cg.com/spec/latest/core/
[2]: http://www.hydra-cg.com/linked-data-fragments/
[3]: http://m.lanthi.com/HydraCG
