#! /bin/sh
projectName="{{projectName}}"

frontendImage="$projectName:$BUILD_NUMBER"

echo "Zipping up and transfering $projectName image..."
docker save "$frontendImage" | bzip2 | pv | ssh laurynas@141.136.44.124 "bunzip2 | docker load"

echo "Removing $projectName production image from staging server..."
docker image rm "$frontendImage"
