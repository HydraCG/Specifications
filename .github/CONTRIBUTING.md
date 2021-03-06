# Hydra W3C Community Group

This repository is being used for work in the Hydra W3C Community Group, governed by the
[W3C Community License Agreement (CLA)](http://www.w3.org/community/about/agreements/cla/).
To contribute, you must [join the Community Group](http://www.hydra-cg.com/#community).

## How to contribute

To advance Hydra, it is imperative that the community engages with us in discussing new and existing features. The only
way to hope for an end result useful for as many people as possible is for the actual interested parties to collaborate
throughout the process of building the Hydra's specification. This is the essence of an Open (Source) community.

This document gathers some guidelines which should help make this collaboration as smooth as possible.
These are not strict rules.

### Getting in touch

The best way to start contributing is to first spark some interest. This can be done by creating a GitHub issue
(more on that below) but a quicker alternative is to reach out to the community through one of our channels mentioned below.

#### Mailing list

The more traditional, and traceable method is to sign up and contact us via the [mailing list][ml]. All messages
are stored in an archive and can be used as reference in the future.

[ml]: https://lists.w3.org/Archives/Public/public-hydra/

#### Slack

As means of instant communication we're monitoring a `#hydra` channel on the HTTP APIs Slack. To register, please
go to http://slack.httpapis.com.

#### Twitter

You can also Tweet to [`@HydraCg`](https://twitter.com/hydracg)

### GitHub issues

Finally, GitHub is the final place to work on the specification in focused manner. Whenever you create an issue, please 
try to follow some simple rules:

* Be complete. Always share all the necessary information for others to understand the issue.
* Be concise. Lengthy comments can easily sidetrack the main focus.
* Be focused. Try to keep the discussion focused on a single subject. If there are additional plot twists, do consider
creating another issue.
* Be proactive. Do not hesitate to share ideas which address the raised issue.

### Submitting pull requests

Unless it's a trivial change, we encourage the following workflow when submitting pull requests to the specification:

1. Make sure there is an issue reported. If not, **report it first**.
1. Create another PR to the [cookbook repository](https://github.com/HydraCG/gitbook).
   * in the PR show example snippets of relevant request/response payloads.
   * if possible, provide some discussion which will be the basis for documentation pages.
   * you may even want to show code snippets (pseudo-code is just fine) demonstrating the new or improved feature.
2. The cookbook PR will be used to brainstorm the solution to the problem.
3. Once a satisfactory solution is found, please proceed with creating a pull request to the specification repository.

If you are not the sole contributor to a contribution (pull request), please identify all
contributors in the pull request's body or in subsequent comments.

To add a contributor (other than yourself, that's automatic), mark them one per line as follows:

```
+@github_username
```

If you added a contributor by mistake, you can remove them in a comment with:

```
-@github_username
```

If you are making a pull request on behalf of someone else but you had no part in designing the
feature, you can remove yourself with the above syntax.
