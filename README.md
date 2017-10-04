# tugayac.github.io

## Production Info
Run `node reformat-liquid-html.js` before merging into master to reformat front-matter content in HTML (JS-Beautify does not format it properly unfortunately...)

## Build and Push
1. Run `JEKYLL_ENV=production bundle exec jekyll build` to [build the website](https://github.com/jekyll/jekyll-assets/wiki/Configuration).
1. Add `CNAME` file to `_site` folder, with content `ardactugay.me`.
1. Extract `_site` folder into another branch: `git subtree split --prefix _site -b deployment`.
1. Overwrite local master: `git branch -f master deployment`
1. Push master to remote for deployment: `git checkout master && git push -f`
