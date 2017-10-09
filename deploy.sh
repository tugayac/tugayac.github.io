#!/usr/bin/env bash

printf "\n\n=== Building website ===\n"
JEKYLL_ENV=production bundle exec jekyll build

printf "\n\n=== Copying CNAME file to _site ===\n"
cp CNAME _site/

printf "\n\n=== Stashing changes in development branch ===\n"
git stash

printf "\n\n=== Creating and moving to dev-ready branch ===\n"
git checkout -b dev-ready

printf "\n\n=== Removing _site from .gitignore ===\n"
sed -i.gitignore '/_site\//d' .gitignore

printf "\n\n=== Removing backup .gitignore file ===\n"
rm -rf .gitignore.gitignore

printf "\n\n=== Adding updated .gitignore file and all site data for commit ===\n"
git add .gitignore _site/

printf "\n\n=== Committing ===\n"
git commit -m "Deploying updated version of website, $(date)"

printf "\n\n=== Extracting _site as subtree, into a new branch called deployment ===\n"
git subtree split --prefix _site -b deployment

printf "\n\n=== Forcing master branch to point to deployment branch ===\n"
git branch -f master deployment

printf "\n\n=== Moving to master branch ===\n"
git checkout master

printf "\n\n=== Force pushing changes to remote master branch ===\n"
git push -f origin master

printf "\n\n=== Removing temp branches ===\n"
git branch -D dev-ready deployment

printf "\n\n=== Moving back to development branch ===\n"
git checkout development
