#! /bin/sh

timestamp=$(date +'%Y-%m-%d_%H.%M.%S')
projectName="{{projectName}}"

if [ "$ENVIRONMENT" = "" ]; then
  environment="production"
else
  environment=$ENVIRONMENT
fi;

if [ "$BUILD_NUMBER" = "" ]; then
  buildTag="latest"
else
  buildTag=$BUILD_NUMBER
fi;

image="$projectName:$buildTag"

echo "\\n|------------------------------------------------------------------------------------|"
echo "|-------------- Building $projectName image ---------------------------------------------|"
echo "|------------------------------------------------------------------------------------|"
echo "  Time-------------------| $timestamp"
echo "  Environment:-----------| $environment"
echo "  New Docker Image name:-| $image"
echo "|------------------------------------------------------------------------------------|"
echo "|------------------------------------------------------------------------------------|\\n"

docker build \
  --file "Dockerfile.prod" \
  --build-arg "NODE_ENV=$environment" \
  --tag $image
