.PHONY: default
default:
	@echo Tasks:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


# DEVELOPMENT SETUP
.PHONY:
build-dev: ## Rebuild {{projectName}} with Next.js and build docker containers
	@npm run build-dev

.PHONY:
run-dev: ## Rebuild {{projectName}} with Next.js and build docker containers
	@npm run run-dev

.PHONY:
clean-dev: ## Stop and remove {{projectName}} docker containers and images
	@npm run clean-dev


# LOCAL SETUP
.PHONY:
build-local: ## Rebuild {{projectName}} with Next.js and build docker containers
	@npm run build-local
	
.PHONY:
run-local: ## Rebuild {{projectName}} with Next.js and build docker containers
	@npm run run-local
