// Organization userIds verified against the company directory, not display names.
export const cmsCorporation = "ding4bbd7f547b8ade69ee0f45d8e4f7c288";

const permissions: Record<string, { edit: boolean; publish: boolean }> = {
  "3221296213756221632": { edit: true, publish: true },
  "0850131661836093": { edit: true, publish: false },
  "635933485526245649": { edit: false, publish: true },
};

export function cmsPermissions(userId: string) {
  return Object.hasOwn(permissions, userId) ? permissions[userId] : null;
}
