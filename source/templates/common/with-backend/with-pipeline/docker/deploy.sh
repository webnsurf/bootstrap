#! /bin/sh
projectName="{{projectName}}"

frontendImage="$projectName-frontend:$BUILD_NUMBER"
backendImage="$projectName-backend:$BUILD_NUMBER"

echo "Zipping up and transfering $projectName frontend image..."
docker save "$frontendImage" | bzip2 | pv | ssh laurynas@141.136.44.124 "bunzip2 | docker load"

echo "Removing $projectName frontend production image from staging server..."
docker image rm "$frontendImage"

echo "Zipping up and transfering $projectName banckend image..."
docker save "$backendImage" | bzip2 | pv | ssh laurynas@141.136.44.124 "bunzip2 | docker load"

echo "Removing $projectName banckend production image from staging server..."
docker image rm "$backendImage"
