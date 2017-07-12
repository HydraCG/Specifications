#!/bin/bash

set -o errexit -o nounset

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
pwd
ls

echo -e "\n${YELLOW}Checking out GitHub repository{RESET}"
git clone --branch=gh-pages https://${GH_TOKEN}@github.com/$REPO_NAME gh-pages
cd gh-pages
mkdir -p drafts/diagram/

echo -e "${YELLOW}Files in $PWD${RESET}"
ls

# Update documents
cp -rf $REPO_PATH/drafts/diagram/* drafts/diagram/

# Commit and push latest version
git config user.name  "Travis"
git config user.email "travis@hydra-cg.com"
git add -A .
git status
git commit -m "Update to $TRAVIS_COMMIT."
git push -q origin gh-pages

echo -e "${GREEN}Successfully updated gh-pages{RESET}"
popd
