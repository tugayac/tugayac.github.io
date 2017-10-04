#!/usr/bin/env bash

JEKYLL_ENV=production bundle exec jekyll build
cp CNAME _site/
git stash
git checkout -b dev-ready
sed -i.gitignore '/_site\//d' .gitignore
rm -rf .gitignore.gitignore
git add .gitignore _site/
git commit -m "Deploying updated version of website"
git subtree split --prefix _site -b deployment
git branch -f master deployment
git checkout master
git push -f origin master
git branch -D dev-ready deployment
git checkout development
