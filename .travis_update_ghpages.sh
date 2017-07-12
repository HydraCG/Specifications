#!/bin/bash

set -o errexit -o nounset

YELLOW=$'\e[1;33m'
GREEN=$'\e[1;32m'
RESET=$'\e[0m'


# Only publish from the main repository's master branch
REPO_NAME="HydraCG/Specifications"
# if [ "$TRAVIS_REPO_SLUG" != "$REPO_NAME" ] || [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
#   echo "This commit was made against $TRAVIS_BRANCH and not the master. Don't generate gh-pages."
#   exit;
# fi

echo -e "${YELLOW}Updating gh-pages...${RESET}"

echo -e "${YELLOW}Generated files in $PWD/drafts/diagram${RESET}"
ls drafts/diagram

# Checkout the gh-pages branch
REPO_PATH=$PWD
pushd $HOME

echo -e "${YELLOW}Cloning and updating GitHub repository${RESET}"
git clone --branch=gh-pages https://${GH_TOKEN}@github.com/$REPO_NAME gh-pages
cd gh-pages
mkdir -p drafts/diagram/


# Update documents
cp -rf $REPO_PATH/drafts/diagram/* drafts/diagram/

# Commit and push latest version
git config user.name  "Travis"
git config user.email "travis@hydra-cg.com"
git add -A .
git status
git commit -m "Update to $TRAVIS_COMMIT."
git push -q origin gh-pages

popd

echo -e "${GREEN}Successfully updated gh-pages${RESET}"
