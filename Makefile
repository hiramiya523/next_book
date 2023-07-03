
# Docker Compsose 汎用セット ####
COMPOSE := docker compose
# dummy
.PHONY: help bild up upd dw ps log

help:
	@grep "^[a-zA-Z\-]*:" Makefile | grep -v "grep" | sed -e 's/^/make /' | sed -e 's/://'
	# @grep "^[a-zA-Z\-]*:" Makefile | grep -v "grep" | sed -e 's/^/make /'
	# @grep "^[a-zA-Z\-]*:" Makefile | grep -v "grep"
	# grep "^[a-zA-Z\-]*:" Makefile

build:
	@$(COMPOSE) build --no-cache

up:
	@$(COMPOSE) up -d

upb:
	@$(COMPOSE) up -d --build

dw:
	@$(COMPOSE) down

ps:
	@$(COMPOSE) ps

log:
	@$(COMPOSE) logs

stats:
	docker stats

#################################

bs:
	@$(COMPOSE) exec $(word 2, $(MAKECMDGOALS)) bash

root-bs:
	@$(COMPOSE) exec --user root $(word 2, $(MAKECMDGOALS)) bash

# 引数を与えて動的コマンド実行も可能 ⇒ 使い道あるかもしれないから覚えとけ
say_hello:
	@echo "Hello, $(word 2,$(MAKECMDGOALS)) and $(word 3,$(MAKECMDGOALS))!"

# error handling
%:
	@: