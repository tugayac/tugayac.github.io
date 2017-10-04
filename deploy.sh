#!/usr/bin/env bash

echo "=== Building website ===\n\n"
JEKYLL_ENV=production bundle exec jekyll build

echo "=== Copying CNAME file to _site ===\n\n"
cp CNAME _site/

echo "=== Stashing changes in development branch ===\n\n"
git stash

echo "=== Creating and moving to dev-ready branch ===\n\n"
git checkout -b dev-ready

echo "=== Removing _site from .gitignore ===\n\n"
sed -i.gitignore '/_site\//d' .gitignore

echo "=== Removing backup .gitignore file ===\n\n"
rm -rf .gitignore.gitignore

echo "=== Adding updated .gitignore file and all site data for commit ===\n\n"
git add .gitignore _site/

echo "=== Committing ===\n\n"
git commit -m "Deploying updated version of website"

echo "=== Extracting _site as subtree, into a new branch called deployment ===\n\n"
git subtree split --prefix _site -b deployment

echo "=== Forcing master branch to point to deployment branch ===\n\n"
git branch -f master deployment

echo "=== Moving to master branch ===\n\n"
git checkout master

echo "=== Force pushing changes to remote master branch ===\n\n"
git push -f origin master

echo "=== Removing temp branches ===\n\n"
git branch -D dev-ready deployment

echo "=== Moving back to development branch ===\n\n"
git checkout development
