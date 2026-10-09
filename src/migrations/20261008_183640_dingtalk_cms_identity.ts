import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_users_auth_source" AS ENUM('local', 'dingtalk');
    ALTER TABLE "users" ADD COLUMN "auth_source" "enum_users_auth_source" DEFAULT 'local' NOT NULL;
    ALTER TABLE "users" ADD COLUMN "dingtalk_user_id" varchar;
    ALTER TABLE "users" ADD COLUMN "dingtalk_role" varchar;
    ALTER TABLE "users" ADD COLUMN "contact_email" varchar;
    ALTER TABLE "users" ADD COLUMN "last_ding_talk_sync_at" timestamp(3) with time zone;
    CREATE UNIQUE INDEX "users_dingtalk_user_id_idx" ON "users" USING btree ("dingtalk_user_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "users_dingtalk_user_id_idx";
    ALTER TABLE "users" DROP COLUMN "auth_source";
    ALTER TABLE "users" DROP COLUMN "dingtalk_user_id";
    ALTER TABLE "users" DROP COLUMN "dingtalk_role";
    ALTER TABLE "users" DROP COLUMN "contact_email";
    ALTER TABLE "users" DROP COLUMN "last_ding_talk_sync_at";
    DROP TYPE "public"."enum_users_auth_source";
  `);
}
