# CMS access rollout

Approved by the site owner on 2026-09-14. These identities were verified using
the company DingTalk directory. This records the intended permissions; it is
not an active authorization source or evidence of a successful deployment.

Organization: 金华市海蓝新材料有限公司
Corp ID: `ding4bbd7f547b8ade69ee0f45d8e4f7c288`

| Person | Organization userId | Edit drafts | Review and publish |
| --- | --- | --- | --- |
| 张程南 | `3221296213756221632` | Yes | Yes |
| 施瀚 | `0850131661836093` | Yes | No |
| 林子越 | `635933485526245649` | Not separately requested | Yes |

Do not use these organization userIds as OAuth unionId/openId values. The
OAuth adapter resolves unionId through the application's organization directory
and checks the resulting userId against `src/lib/cms-access.ts`. Membership is
revalidated on every gateway request. Do not authorize by display name.

Server-side restrictions limit edits to content files and CMS branches. Publishers
can merge only same-repository CMS pull requests into main, at the validated SHA.
Review-only users can change review labels and remove an already-merged CMS branch,
but cannot create draft content. Editors cannot mark a draft ready to publish.

Automated tests mock external providers. Real login, draft saving, review and
publication must still be accepted with the three assigned accounts; deployment
alone is not evidence that these end-to-end tests have passed.
