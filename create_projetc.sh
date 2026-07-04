#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-cannacare}"

mkdir -p "$ROOT"/{cmd/api,internal/{config,domain/{patient,user,prescription,order,stock,billing},application/{dto,usecase,mapper},infrastructure/{database,repository,storage,auth,pdf,queue},interfaces/http/{handler,route,middleware},shared/{errors,logger,utils}},configs,migrations,docs,test,scripts}

touch \
  "$ROOT/cmd/api/main.go" \
  "$ROOT/internal/config/config.go" \
  "$ROOT/internal/interfaces/http/router.go" \
  "$ROOT/internal/interfaces/http/middleware/auth.go" \
  "$ROOT/internal/domain/patient/entity.go" \
  "$ROOT/internal/domain/patient/repository.go" \
  "$ROOT/internal/domain/patient/service.go" \
  "$ROOT/internal/domain/patient/errors.go" \
  "$ROOT/internal/domain/user/entity.go" \
  "$ROOT/internal/domain/user/repository.go" \
  "$ROOT/internal/domain/user/service.go" \
  "$ROOT/internal/domain/user/errors.go" \
  "$ROOT/internal/application/usecase/create_patient.go" \
  "$ROOT/internal/infrastructure/repository/patient_repository_postgres.go" \
  "$ROOT/migrations/0001_create_patients.sql" \
  "$ROOT/Dockerfile" \
  "$ROOT/docker-compose.yml" \
  "$ROOT/.env.example" \
  "$ROOT/.gitignore" \
  "$ROOT/README.md"

echo "Estrutura criada em: $ROOT"
