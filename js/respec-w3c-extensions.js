// extend the bibliography entries
var localBibliography = {
    "JSON-LD": "Manu Sporny, Gregg Kellogg, Markus Lanthaler, Editors. <cite><a href=\"http://json-ld.org/spec/latest/json-ld/\">JSON-LD 1.0</a>.</cite> W3C Editor's Draft (work in progress). URL: <a href=\"http://json-ld.org/spec/latest/json-ld/\">http://json-ld.org/spec/latest/json-ld/</a>",
    "JSON-LD-API": "Markus Lanthaler, Gregg Kellogg, Manu Sporny, Editors. <cite><a href=\"http://json-ld.org/spec/latest/json-ld-api/\">JSON-LD 1.0 Processing Algorithms and API</a>.</cite> W3C Editor's Draft (work in progress). URL: <a href=\"http://json-ld.org/spec/latest/json-ld-api/\">http://json-ld.org/spec/latest/json-ld-api/</a>"
};

var preProc = {
    apply:  function(c) {
        $.getJSON('../../../core.jsonld', function(vocab) {
            var options = { "base": "http://purl.org/hydra/" };
            var context = {
                "hydra": "http://purl.org/hydra/core#",
                "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "owl": "http://www.w3.org/2002/07/owl#",
                "vs": "http://www.w3.org/2003/06/sw-vocab-status/ns#",
                "defines": { "@reverse": "rdfs:definedBy" },
                "comment": "rdfs:comment",
                "label": "rdfs:label",
                "domain": { "@id": "rdfs:domain" },
                "range": { "@id": "rdfs:range" },
                "subClassOf": { "@id": "rdfs:subClassOf", "@type": "@id", "@container": "@set" },
                "subPropertyOf": { "@id": "rdfs:subPropertyOf", "@type": "@id", "@container": "@set" },
                "seeAlso": { "@id": "rdfs:seeAlso", "@type": "@id" },
                "status": "vs:status"
            };

            jsonld.compact(vocab, context, function(err, doc) {
                $('#vocabulary-jsonld').html(JSON.stringify(doc, null, 2).replace(/\n/g, "<br />"));
            });

            // Document classes
            var classesFrame = {
                "@context": context,
                "@type": [ "hydra:Class", "rdfs:Class", "owl:Class" ],
                "subClassOf": { "@embed": false }
            };

            jsonld.frame(vocab, classesFrame, options, function(err, classes) {
                if (err) {
                    alert('Framing classes failed with error code ' + JSON.stringify(err));
                }

                var classOverview = "";
                var classIndex = new Array();

                $.each(classes['@graph'], function(index, value) {
                    classOverview += '<h3 id="' + value['@id'] + '">' + value['@id'] + '</h3>';
                    classOverview += '<p>' + value['comment'] + '</p>';
                    if (value['subClassOf'].length > 0) {
                        classOverview += '<p><strong>Subclass of:</strong> ' + value['subClassOf'].join(', ') + '</p>';
                    }
                    classOverview += '<p><strong>Status:</strong> ' + value['status'] + '</p>';

                    classIndex.push(value['@id']);
                });

                $('#vocabulary-classes').html(classOverview);

                classIndex.sort();
                classOverview = '<ul class="hlist">';
                $.each(classIndex, function(index, value) {
                    classOverview += '<li><a href="#' + value + '">' + value + '</li>';
                });
                classOverview += '<ul>';
                $('#vocabulary-overview').append(classOverview);
            });

            // Document properties
            var propertiesFrame = {
              "@context": context,
              "@type": [ "hydra:Link", "hydra:TemplatedLink", "rdf:Property", "owl:DatatypeProperty", "owl:ObjectProperty" ]
            };

            jsonld.frame(vocab, propertiesFrame, options, function(err, properties) {

                var propertyOverview = "";
                var propIndex = new Array();

                $.each(properties['@graph'], function(index, value) {
                    propertyOverview += '<h3 id="' + value['@id'] + '">' + value['@id'] + '</h3>';
                    propertyOverview += '<p>' + value['comment'] + '</p>';

                    if (value['domain']) {
                        propertyOverview += '<p><strong>Domain:</strong> ' + value['domain']['@id'] + '</p>';
                    }
                    if (value['range']) {
                        propertyOverview += '<p><strong>Range:</strong> ' + value['range']['@id'] + '</p>';
                    }
                    if (value['subPropertyOf']) {
                        propertyOverview += '<p><strong>Subproperty of:</strong> ' + value['subPropertyOf'] + '</p>';
                    }
                    propertyOverview += '<p><strong>Status:</strong> ' + value['status'] + '</p>';

                    propIndex.push(value['@id']);
                });


                $('#vocabulary-properties').html(propertyOverview);

                propIndex.sort();
                classOverview = '<ul class="hlist">';
                $.each(propIndex, function(index, value) {
                    classOverview += '<li><a href="#' + value + '">' + value + '</li>';
                });
                classOverview += '<ul>';
                $('#vocabulary-overview').append(classOverview);
            });
        }).error(function(jqxhr) {
            alert("Can't load the vocabulary.");
        });
    }
};

function _esc(s) {
    s = s.replace(/&/g,'&amp;');
    s = s.replace(/>/g,'&gt;');
    s = s.replace(/"/g,'&quot;');
    s = s.replace(/</g,'&lt;');
    return s;
}

function updateExample(doc, content) {
  // perform transformations to make it render and prettier
  content = content.replace(/<!--/, '');
  content = content.replace(/-->/, '');
  content = _esc(content);
  content = content.replace(/\*\*\*\*([^*]*)\*\*\*\*/g, '<span class="highlight">$1</span>') ;
  content = content.replace(/####([^#]*)####/g, '<span class="comment">$1</span>') ;
  return content ;
}
