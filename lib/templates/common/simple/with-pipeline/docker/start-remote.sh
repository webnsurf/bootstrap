#! /bin/sh
projectName="{{projectName}}"
timestamp=$(date +'%Y-%m-%d_%H-%M-%S');
deploymentScriptsFolder="$projectName-deployment-$timestamp";

echo "Create the temporary $projectName deployment scripts...";
echo "\\n|-----------------------------------------------------------------------------------------|"
echo "|-------------- Create the temporary $projectName deployment scripts -------------------------|"
echo "|-----------------------------------------------------------------------------------------|"
echo "  Time------------------------| $timestamp"
echo "  Deployment Scripts Folder:--| $deploymentScriptsFolder"
echo "|-----------------------------------------------------------------------------------------|"
echo "|-----------------------------------------------------------------------------------------|\\n"

mkdir $deploymentScriptsFolder;
cp docker/start.sh $deploymentScriptsFolder/;
cp docker-compose.prod.yml $deploymentScriptsFolder/;

scp -r $deploymentScriptsFolder "{{serverUsername}}@{{serverIp}}:$projectName";
rm -r $deploymentScriptsFolder;

ssh {{serverUsername}}@{{serverIp}} "cd $projectName ; ./start.sh $BUILD_NUMBER ; cd .. ; rm -r $projectName";
