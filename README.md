# NKZ Module: Mattermost (Communications)

Provides a sovereign "ChatOps" interface integrated into the NKZ platform using [Mattermost Team Edition](https://mattermost.com/).

## Architecture

- **Backend**: Official Mattermost Docker image running in Kubernetes.
- **Database**: Uses the platform's shared PostgreSQL cluster (`nkz_mattermost` DB).
- **Storage**: Uses MinIO (S3 compatible) for file storage (`mattermost-data` bucket).
- **Auth**: Delegated to generic Keycloak via GitLab OIDC emulation.
- **Frontend**: A thin React wrapper (IIFE) that embeds Mattermost via `<iframe>` to maintain the platform navigation context.

## Integration Points

1.  **Multi-Tenancy**: "Soft" isolation. Users are assigned to Teams based on their Tenant.
2.  **Broadcast**: N8N workflow triggers announcements to `#town-square` in all teams.
3.  **Alerts**: N8N posts operational alerts to specific channels (e.g., `#operations`).

## Development

### Prerequisites
- `nkz` core platform running.
- PostgreSQL accessible.

### Local Run
See `docker/docker-compose.yml`.

## Deployment

1.  **Bootstrap DB & MinIO**:
    ```bash
    kubectl apply -f k8s/bootstrap-db.yaml
    kubectl apply -f k8s/bootstrap-minio.yaml
    ```
2.  **Deploy Mattermost**:
    ```bash
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl apply -f k8s/ingress.yaml
    ```
3.  **Build Frontend**:
    ```bash
    cd frontend
    npm install
    npm run build
    # Upload dist/nkz-module.js to MinIO
    ```
