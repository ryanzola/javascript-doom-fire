# JavaScript Doom Fire

A simple simulation of Doom Fire effect in Pixi.js.

View my Python version using Pygame [here](https://github.com/ryanzola/python-doom-fire)

## Usage

### Docker

To build the Docker image, run the following command:

```sh
docker build -t doomfire -f Dockerfile .
```

To run the container, use the following command:

```sh
docker run --rm --name doomfire \
  -p 5173:5173 \
  -v ${PWD}:/app \
  -v /app/node_modules \
  doomfire
```

The `-p` option maps port 5173 in the container to port 5173 on the host machine, so you can access the application by navigating to `http://localhost:5173` in your web browser.

### Makefile

To build the Docker image using the Makefile, run the following command:

```sh
make build
```

To run the container using the Makefile, use the following command:

```sh
make up
```

The container will map port 5173 in the container to port 5173 on the host machine, so you can access the application by navigating to `http://localhost:5173` in your web browser.

To clean up any Docker containers and images created using the Makefile, run the following command:

```sh
make down
```

Note that this will remove all Docker containers and images with the $(IMAGE_NAME) name, not just the ones created using the Makefile. So make sure you don't have any other containers or images with the same name that you want to keep.

## Acknowledgments

This is based on the [Doom Fire Algorithm](https://fabiensanglard.net/doom_fire_psx/) by Fabien Sanglard.
