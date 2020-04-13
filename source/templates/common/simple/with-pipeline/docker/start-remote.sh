#! /bin/sh

ssh {{serverUsername}}@{{serverIp}} -i /var/lib/jenkins/.ssh/id_rsa "cd {{projectName}} ; docker/start.sh";
