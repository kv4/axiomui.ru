.PHONY: dev build preview install hooks

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

hooks:
	git config core.hooksPath .githooks
