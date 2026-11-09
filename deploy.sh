#!/bin/sh
# Build the invitation and publish it to GitHub Pages (gh-pages branch).
# Usage:  sh deploy.sh
set -e
cd "$(dirname "$0")"
npm run build
touch dist/.nojekyll
TMP=$(mktemp -d)
cp -R dist/. "$TMP"/
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="Shubham" -c user.email="ssagar8186@gmail.com" commit -q -m "Deploy invitation build"
git push -q -f https://github.com/ssagar1999/wedding-invitation.git gh-pages
cd - >/dev/null
rm -rf "$TMP"
gh api -X POST repos/ssagar1999/wedding-invitation/pages/builds >/dev/null 2>&1 || true
echo "Deployed → https://ssagar1999.github.io/wedding-invitation/ (live in ~1 minute)"
