#!/bin/bash
# Only publish from the main repository's master branch
REPO_NAME="RubenVerborgh/Hydra-Architecture-Diagram"
if [ "$TRAVIS_REPO_SLUG" != "$REPO_NAME" ] || [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then exit; fi
echo -e "Generating gh-pages...\n"

# Checkout the gh-pages branch
REPO_PATH=$PWD
pushd $HOME
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/$REPO_NAME gh-pages 2>&1 > /dev/null
cd gh-pages

# Don't update if already at the latest version
if [[ `git log -1 --pretty=%B` == *$TRAVIS_COMMIT* ]]; then exit; fi

# Update documents
cp $REPO_PATH/*.pdf .

# Commit and push latest version
git add .
git config user.name  "Travis"
git config user.email "travis@travis-ci.org"
git commit -m "Update to $TRAVIS_COMMIT."
git push -fq origin gh-pages 2>&1 > /dev/null
popd
