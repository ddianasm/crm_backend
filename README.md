### run docker compose

docker compose -f docker-compose.dev.yml --env-file .env up

### Connect to running container

docker exec -it crm_backend /bin/bash
