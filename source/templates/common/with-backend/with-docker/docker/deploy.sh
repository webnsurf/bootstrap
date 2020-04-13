#! /bin/sh

timestamp=$(date +'%Y-%m-%d_%H.%M.%S')
projectName="{{projectName}}"

if [ "$ENVIRONMENT" = "" ]; then
  environment="production"
else
  environment="$ENVIRONMENT"
fi;

if [ "$environment" = "production" ]; then
  hostRule="Host(\`webnsurf.com\`)"
else
  hostRule="Host(\`$environment.webnsurf.com\`)"
fi;

if [ "$BUILD_NUMBER" = "" ]; then
  buildTag="latest"
else
  buildTag="$BUILD_NUMBER"
fi;

frontendImage="$projectName-frontend:$buildTag"
backendImage="$projectName-backend:$buildTag"

echo "\\n|-----------------------------------------------------------------------------------------|"
echo "|-------------- Deploying $projectName containers ------------------------------------------|"
echo "|-----------------------------------------------------------------------------------------|"
echo "  Time------------------------| $timestamp"
echo "  Environment:----------------| $environment"
echo "  Frontend Docker Image name:-| $frontendImage"
echo "  Backend Docker Image name:--| $backendImage"
echo "  Host Rule:------------------| $hostRule"
echo "|-----------------------------------------------------------------------------------------|"
echo "|-----------------------------------------------------------------------------------------|\\n"

export COMPOSE_FRONTEND_IMAGE="$frontendImage"
export COMPOSE_BACKEND_IMAGE="$backendImage"
export COMPOSE_ROUTER_HOST="$hostRule"

docker-compose -f docker-compose.prod.yml up -d
