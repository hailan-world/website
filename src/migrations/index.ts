import * as migration_20261008_164810_initial_payload_schema from './20261008_164810_initial_payload_schema';
import * as migration_20261008_183640_dingtalk_cms_identity from './20261008_183640_dingtalk_cms_identity';

export const migrations = [
  {
    up: migration_20261008_164810_initial_payload_schema.up,
    down: migration_20261008_164810_initial_payload_schema.down,
    name: '20261008_164810_initial_payload_schema',
  },
  {
    up: migration_20261008_183640_dingtalk_cms_identity.up,
    down: migration_20261008_183640_dingtalk_cms_identity.down,
    name: '20261008_183640_dingtalk_cms_identity'
  },
];
