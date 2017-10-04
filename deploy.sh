#!/usr/bin/env bash

printf "\n\n=== Building website ==="
JEKYLL_ENV=production bundle exec jekyll build

printf "\n\n=== Copying CNAME file to _site ==="
cp CNAME _site/

printf "\n\n=== Stashing changes in development branch ==="
git stash

printf "\n\n=== Creating and moving to dev-ready branch ==="
git checkout -b dev-ready

printf "\n\n=== Removing _site from .gitignore ==="
sed -i.gitignore '/_site\//d' .gitignore

printf "\n\n=== Removing backup .gitignore file ==="
rm -rf .gitignore.gitignore

printf "\n\n=== Adding updated .gitignore file and all site data for commit ==="
git add .gitignore _site/

printf "\n\n=== Committing ==="
git commit -m "Deploying updated version of website, $(date)"

printf "\n\n=== Extracting _site as subtree, into a new branch called deployment ==="
git subtree split --prefix _site -b deployment

printf "\n\n=== Forcing master branch to point to deployment branch ==="
git branch -f master deployment

printf "\n\n=== Moving to master branch ==="
git checkout master

printf "\n\n=== Force pushing changes to remote master branch ==="
git push -f origin master

printf "\n\n=== Removing temp branches ==="
git branch -D dev-ready deployment

printf "\n\n=== Moving back to development branch ==="
git checkout development
