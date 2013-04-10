// extend the bibliography entries
var localBibliography = {
    "JSON-LD": "Manu Sporny, Gregg Kellogg, Markus Lanthaler, Editors. <cite><a href=\"http://json-ld.org/spec/latest/json-ld/\">JSON-LD 1.0</a>.</cite> W3C Editor's Draft (work in progress). URL: <a href=\"http://json-ld.org/spec/latest/json-ld/\">http://json-ld.org/spec/latest/json-ld/</a>",
    "JSON-LD-API": "Markus Lanthaler, Gregg Kellogg, Manu Sporny, Editors. <cite><a href=\"http://json-ld.org/spec/latest/json-ld-api/\">JSON-LD 1.0 Processing Algorithms and API</a>.</cite> W3C Editor's Draft (work in progress). URL: <a href=\"http://json-ld.org/spec/latest/json-ld-api/\">http://json-ld.org/spec/latest/json-ld-api/</a>"
};

var preProc = {
    apply:  function(c) {
        $.getJSON('../../../core.jsonld', function(vocab) {
            $('#vocabulary-jsonld').html(JSON.stringify(vocab, null, 2).replace(/\n/g, "<br />"));

            var options = { "base": "http://purl.org/hydra/" };
            var classesFrame = {
                "@context": [
                    vocab["@context"],
                    {
                        "rdfs:subClassOf": { "@container": "@set" }
                    }
                ],
                "@type": [ "rdfs:Class", "owl:Class" ]
            };

            // Document classes
            jsonld.frame(vocab, classesFrame, options, function(err, classes) {
                if (err) {
                    alert('Framing classes failed with error code ' + err.code);
                }

                var classOverview = "";
                var classIndex = new Array();

                $.each(classes["@graph"], function(index, value) {
                    classOverview += '<h3 id="' + value["@id"] + '">' + value["@id"] + '</h3>';
                    classOverview += '<p>' + value["rdfs:comment"] + '</p>';
                    classOverview += '<p><strong>Subclass of:</strong> add this!!</p>';
                    classOverview += '<p><strong>Status:</strong> ' + value["vs:status"] + '</p>';

                    classIndex.push(value["@id"]);
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
              "@context": vocab["@context"],
              "@type": [ "rdfs:Property", "owl:DatatypeProperty", "owl:ObjectProperty" ]
            };

            jsonld.frame(vocab, propertiesFrame, options, function(err, properties) {
                var propertyOverview = "";
                var propIndex = new Array();

                $.each(properties["@graph"], function(index, value) {
                    propertyOverview += '<h3 id="' + value["@id"] + '">' + value["@id"] + '</h3>';
                    propertyOverview += '<p>' + value["rdfs:comment"] + '</p>';

                    if (value["rdfs:domain"]) {
                        propertyOverview += '<p><strong>Domain:</strong> ' + value["rdfs:domain"] + '</p>';
                    }
                    if (value["rdfs:range"]) {
                        propertyOverview += '<p><strong>Range:</strong> ' + value["rdfs:range"] + '</p>';
                    }
                    propertyOverview += '<p><strong>Status:</strong> ' + value["vs:status"] + '</p>';

                    propIndex.push(value["@id"]);
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
  content = content.replace(/\*\*\*\*([^*]*)\*\*\*\*/g, '<span class="diff">$1</span>') ;
  return content ;
}
