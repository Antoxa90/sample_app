SHELL:=/bin/bash

# Docker
create: ## Create mysql container
	docker pull mysql/mysql-server:5.7 && docker run --name=mysql -p 3306:3306 -e "MYSQL_ROOT_PASSWORD=root" -e "MYSQL_USER=user" -e "MYSQL_PASSWORD=user" -e "MYSQL_DATABASE=medicine" -d mysql/mysql-server:5.7
start: ## Start mysql container
	docker container start mysql

# Database
db-update: ## Updates db
	./node_modules/.bin/sequelize db:migrate
db-update-test: ## Updates test db
	NODE_ENV=test ./node_modules/.bin/sequelize db:migrate
db-seeds: ## Load seeds to tables
	./node_modules/.bin/sequelize db:seed:all

help: ## Shows help dialog.
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
	for help_line in $${help_lines[@]}; do \
		IFS=$$'#' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf "%-30s %s\n" $$help_command $$help_info ; \
	done
