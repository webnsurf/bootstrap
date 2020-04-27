.PHONY: default
default:
	@echo Tasks:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


# DEVELOPMENT SETUP
.PHONY:
build-dev: ## Build {{projectName}} development docker containers
	@npm run build-dev

.PHONY:
run-dev: ## Run {{projectName}} development docker containers
	@npm run run-dev

.PHONY:
clean-dev: ## Stop and remove {{projectName}} development docker containers and images
	@npm run clean-dev


# LOCAL SETUP
.PHONY:
build-local: ## Build {{projectName}} local docker containers
	@npm run build-local
	
.PHONY:
run-local: ## Run {{projectName}} local docker containers
	@npm run run-local

.PHONY:
clean-local: ## Stop and remove {{projectName}} local docker containers and images
	@npm run clean-local
