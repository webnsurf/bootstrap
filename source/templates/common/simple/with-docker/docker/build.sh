#! /bin/sh
projectScope=$1
buildNumber=$BUILD_NUMBER;
environment=$ENVIRONMENT;

timestamp=$(date +'%Y-%m-%d_%H.%M.%S');
projectName="{{projectName}}";


if [ "$buildNumber" = "" ]; then
  [ "$2" = "" ] && buildNumber="latest" || buildNumber=$2;
fi;

if [ "$environment" = "" ]; then
  [ "$3" = "" ] && environment="production" || environment=$3;
fi;

if [ "$projectScope" = "" ] || [ "$projectScope" = "."  ]; then
  image="$projectName:$buildNumber";
  projectScope=".";
else
  image="$projectName-$projectScope:$buildNumber";
fi;

echo "\\n|-------------------------------------------------------------------------------------|";
echo "|-------------- Building $projectScope image ----------------------------------------------|";
echo "|-------------------------------------------------------------------------------------|";
echo "  Time-------------------| $timestamp";
echo "  Environment:-----------| $environment";
echo "  New Docker Image name:-| $image";
echo "|-------------------------------------------------------------------------------------|";
echo "|-------------------------------------------------------------------------------------|\\n";

docker build $projectScope \
  --file "$projectScope/Dockerfile.prod" \
  --build-arg "BUILD_ENV=$environment" \
  --tag $image;
