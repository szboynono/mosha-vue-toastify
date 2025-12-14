#!/usr/bin/env sh

# abort on errors
set -e

echo 'Installing dependencies...'
npm install

echo 'Building library...'
npm run build

echo 'Building documentation...'
npm run docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy: upgrade to Vue 3.5.25 and update dependencies'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:szboynono/mosha-vue-toastify.git master:gh-pages

cd -