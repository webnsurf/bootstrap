# CLI to bootstrap React projects with TypeScript
---

## Arguments:
| Name | Alias | Action | Default value | Info |
| ---- | :---: | ------ | :-----------: | ---- |
| `--yes` | `-y` | Skip the propmpt and use default options | `false` | Preferred default options to use here can be set and saved using the `--set-defaults` flag (see below)
| `--docker` | `-d` | Create a Docker setup within the project | `false` | This will create the following structure: <ul><li>Docker image build script `/docker/build.sh`</li><li>Docker container start script `/docker/start.sh`</li><li>front-end and back-end `Dockerfile.prod` & `Dockerfile.dev` in their corresponding folders</li><li>`docker-compose.prod.yml` & `docker-compose.yml` files to easily spin up production and development containers</li></ul>The default Docker setup uses Web'n'surF Docker network. It allows you to access the development server on https://dev.webnsurf.com and the local _"staging"_ server on https://local.webnsurf.com (both resolve to `127.0.0.1` and are then proxied to the right containers using Web'n'surF proxy). Get the [Web'n'surF proxy](https://github.com/webnsurf/proxy) based on [Træfik](https://docs.traefik.io/)
| `--pipeline` | `-p` | Create a Jenkins pipeline | `false` | This will create the following structure: <ul><li>`Jenkinsfile` in the root directory</li><li>Deployment script `/docker/deploy.sh`</li><li>Remote start script `/docker/start-remote.sh`</li></ul>This option automatically sets `--docker` to `true`.<br />Specify `--server-user` & `--server-ip` options to replace variables in the files listed above.<br />Get the [Web'n'surF CI server](https://github.com/webnsurf/proxy) based on [Jenkins](https://www.jenkins.io/)
| `--install` | `-i` | Install node modules | `false` | Install node modules once the project is initialised
| `--set-defaults` | `-s` | Set default options | `false` | Set default options to use next time `--yes(-y)` is used
| `--no-backend` | `N/A` | Create a project without a back-end server | `false` | By default the project is created with an Express JS backend server. This option disables that.
| `--no-git` | `N/A` | Create a project without Git | `false` | By default a new Git project is initiated. This option disables that.
| `--no-router` | `N/A` | Create a project without React router | `false` | By default React router is included and a few front-end routes are set up. This option disables that.<br />_This option can not be disabled if the project is created with Login functionality._
| `--no-login` | `N/A` | Create a project without login fuctionality | `false` | By default the project is setup with a redux store and a user login functionality (both back-end and front-end logic). This option disables that
| `--design` | `N/A` | Specify a design library | `null` | Sets up, istalls and uses a React design library in the project.<Br />Available options:<ul><li>`antd` ([Documentation](https://ant.design/docs/react/introduce))</li><li>`Material UI` ([Documentation](https://material-ui.com/getting-started/templates/)) - this option is currently disabled (WIP)</li></ul>
| `--domain` | `N/A` | Domain name for proxy | `webnsurf.com` | Specify a domain name to use in the [Web'n'surF proxy](https://github.com/webnsurf/proxy) router setup.<br />This option is only needed if `--docker` is set to `true`
| `--server-user` | `N/A` | Remote server username | `<SERVER_USERNAME>` | Specify a username on the remote server for the _deployment_ (`/docker/deploy.sh`) and _start-remote_ (`/docker/start-remote.sh`) scripts to use.<br />This option is only needed if `--pipeline` is set to `true`
| `--server-ip` | `N/A` | Remote server IP address | `<SERVER_IP>` | Specify the remote server IP address for the _deployment_ (`/docker/deploy.sh`) and _start-remote_ (`/docker/start-remote.sh`) scripts to use.<br />This option is only needed if `--pipeline` is set to `true`
---
