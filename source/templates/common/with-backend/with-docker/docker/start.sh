#! /bin/sh
buildNumber=$BUILD_NUMBER;
environment=$ENVIRONMENT;

readBuildNumber() {
  read -p "Please enter a build number: " usersBuildNumber;

  if [ "$usersBuildNumber" = "" ]; then
    echo 'latest';
  else
    echo $usersBuildNumber;
  fi;
}

readEnvironment() {
  read -p "Please enter build environment: " usersEnvironment;
  
  if [ "$usersEnvironment" = "" ]; then
    echo 'production';
  else
    echo $usersEnvironment;
  fi;
}

if [ "$buildNumber" = "" ]; then
  [ "$1" = "" ] && buildNumber=$(readBuildNumber) || buildNumber=$1;
fi;

if [ "$environment" = "" ]; then
  [ "$2" = "" ] && environment=$(readEnvironment) || environment=$2;
fi;

git pull;

ENVIRONMENT=$environment BUILD_NUMBER=$buildNumber docker/deploy.sh;
