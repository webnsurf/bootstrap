#! /bin/sh
buildNumber=$BUILD_NUMBER;
environment=$ENVIRONMENT;

timestamp=$(date +'%Y-%m-%d_%H.%M.%S');
projectName="{{projectName}}";

if [ "$buildNumber" = "" ]; then
  [ "$1" = "" ] && buildNumber="latest" || buildNumber=$1;
fi;

if [ "$environment" = "" ]; then
  [ "$2" = "" ] && environment="production" || environment=$2;
fi;

if [ "$environment" = "production" ]; then
  hostRule="Host(\`{{domain}}\`) || Host(\`www.{{domain}}\`)"
  redirect="full-strip-slash@file, full-redirect@file"
else
  hostRule="Host(\`$environment.{{domain}}\`)"
  redirect="https-strip-slash@file, https-redirect@file"
fi;

frontendImage="$projectName:$buildNumber"

echo "\\n|-----------------------------------------------------------------------------------------|"
echo "|-------------- Starting $projectName containers --------------------------------------------|"
echo "|-----------------------------------------------------------------------------------------|"
echo "  Time------------------------| $timestamp"
echo "  Environment:----------------| $environment"
echo "  Docker Image name:----------| $frontendImage"
echo "  Host Rule:------------------| $hostRule"
echo "  Redirect:-------------------| $redirect"
echo "|-----------------------------------------------------------------------------------------|"
echo "|-----------------------------------------------------------------------------------------|\\n"

export COMPOSE_FRONTEND_IMAGE="$frontendImage"
export COMPOSE_REDIRECT_STRATEGY="$redirect"
export COMPOSE_ROUTER_HOST="$hostRule"

docker-compose -f docker-compose.prod.yml up -d
