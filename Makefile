.PHONY: up down  prune  bash logs  init-app enter_fron enter_back build_images

PROJECT_NAME=${PROJECT_NAME}

default: init-app

initializer:
	@echo "Initial configuration"
	@read -p "Node version: " node_version; \
	read -p "Name of proyect: " project_name; \
	echo "NODE_VERSION=$$node_version" > .env; \
	echo "PROJECT_NAME=$$project_name" >> .env; \
	echo "File .env generate succesfull."

create-app:
	@echo "Creando app"
	docker compose -f docker-compose.yml run --rm node_fron npm create vite@latest App
	sudo mv App/App/* App/
	sudo rm -R App/App
	sudo mkdir App/src/external

execute-creationImageUtils:
	@read -p "Enter script arguments (or press Enter to run without arguments): " args; \
    /bin/bash external-submodules/scripts/creationImageUtils.sh $$args

install-dependencies:
	@echo "Instalando app"
	docker compose -f docker-compose.yml run --rm node_fron yarn install
	docker compose -f docker-compose.yml run --rm node_fron yarn add file:src/external/custom-components/App
	
enter_front:
	docker compose -f docker-compose.yml run --rm node_fron bash

install_front:
	docker compose -f docker-compose.yml run --rm node_fron yarn install --network-timeout 300000

install_dependencies_front:
	@echo "Creando app"
	docker compose -f docker-compose.yml run --rm node_fron yarn add $(dep)

check-version-tsc:
	docker compose -f docker-compose.yml run --rm node_fron npx tsc -v

up:
	docker compose -f docker-compose.yml up 

up-wp:
	docker compose -f docker-compose.yml -f docker-compose-wp.yml up 

down:
	@docker compose -f docker-compose.yml down

build_images:
	docker compose -f docker-compose.yml build 

build_production_image:
	docker compose -f docker-compose-prod.yml build

build:
	docker compose -f docker-compose.yml run node_fron yarn run build

prune:
	@echo "Removing containers for $(PROJECT_NAME)..."
	@docker compose down -v

bash:
	docker exec -i -t '	_$(PROJECT_NAME)' /bin/bash

logs:
	@docker compose logs

log:
	tail -f app/log/prod.log

%:
	@:
