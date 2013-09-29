data/json/reciclaje.json: \
	data/csv/reciclaje.csv \
	scripts/reciclaje.js \
	node_modules
	node \
		scripts/reciclaje $< > $@

node_modules: package.json
	npm install
	touch $@

test:
	jshint data/json/*.json

clean:
	rm -rf node_modules

.PHONY: test clean
