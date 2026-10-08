import * as migration_20261008_164810_initial_payload_schema from './20261008_164810_initial_payload_schema';

export const migrations = [
  {
    up: migration_20261008_164810_initial_payload_schema.up,
    down: migration_20261008_164810_initial_payload_schema.down,
    name: '20261008_164810_initial_payload_schema'
  },
];
