#!/bin/bash

set -o errexit -o nounset

# Only publish from the main repository's master branch
REPO_NAME="HydraCG/Specifications"
# if [ "$TRAVIS_REPO_SLUG" != "$REPO_NAME" ] || [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
#   echo "This commit was made against $TRAVIS_BRANCH and not the master. Don't generate gh-pages."
#   exit;
# fi

echo "Updating gh-pages..."

echo "Generated files"
pwd
ls drafts/diagram

# Checkout the gh-pages branch
REPO_PATH=$PWD
pushd $HOME

git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/$REPO_NAME gh-pages
git config user.name  "Travis"
git config user.email "travis@hydra-cg.com"

cd gh-pages
pwd
mkdir -p drafts/diagram/

# Update documents
cp -rf $REPO_PATH/drafts/diagram/* drafts/diagram/

# Commit and push latest version
git add -A .
git status
git commit -m "Update to $TRAVIS_COMMIT."
git push -q origin gh-pages 2>&1 > /dev/null

popd
