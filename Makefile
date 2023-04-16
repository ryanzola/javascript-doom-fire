IMAGE_NAME=doomfire

.PHONY: build up down

build:
	docker build -t $(IMAGE_NAME) -f Dockerfile .

up: build
	docker run --rm --name $(IMAGE_NAME) \
		-p 5173:5173 \
		-v ${PWD}:/app \
		-v /app/node_modules \
		$(IMAGE_NAME)

down:
	docker stop $$(docker ps -aqf "name=$(IMAGE_NAME)") || true
	docker rm $$(docker ps -aqf "name=$(IMAGE_NAME)") || true
	docker rmi $(IMAGE_NAME) || true