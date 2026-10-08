# CMS access rollout

Payload stores users and roles in the same Postgres database as website
content. Access is no longer maintained in source-code allowlists.

## Roles

| Role | Draft | Publish | Manage users | Manage product records |
|---|---:|---:|---:|---:|
| Editor | Yes | No | No | Edit existing |
| Publisher | Yes | Yes | No | Edit existing |
| Administrator | Yes | Yes | Yes | Create, edit and delete |

The first user is created only after the production database is connected. Use
an individual company-controlled email address; do not create a shared account.
An administrator can revoke access immediately by locking or deleting a user.

Payload sessions expire after eight hours. Five failed login attempts lock the
account for fifteen minutes. Password reset email requires a production email
adapter before rollout; until it is configured, an administrator must handle
recovery directly.
