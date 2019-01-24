GITHUB_REPO="/Users/chonlatit/work/thinknetmaps"
GITLAB_REPO="/Users/chonlatit/work/mapbox-gl-js"

echo Cloning mapbox-gl-js [GITLAB] to thinknetmaps [GITHUB]...
rm -rf $GITHUB_REPO/*
rsync --progress -r --exclude=node_modules $GITLAB_REPO/* $GITHUB_REPO
echo Your project has been cloned, please commit and push new vesion of THiNKNET Map