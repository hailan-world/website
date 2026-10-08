import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_users_role" AS ENUM('editor', 'publisher', 'admin');
  CREATE TYPE "public"."enum_products_slug" AS ENUM('lvt-flooring', 'pet-wall-coverings', 'pet-carpet-coverings');
  CREATE TYPE "public"."enum_products_texture" AS ENUM('lvt', 'wall', 'carpet');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_slug" AS ENUM('lvt-flooring', 'pet-wall-coverings', 'pet-carpet-coverings');
  CREATE TYPE "public"."enum__products_v_version_texture" AS ENUM('lvt', 'wall', 'carpet');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_news_category" AS ENUM('Events', 'Manufacturing', 'Sustainability', 'Company');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('Events', 'Manufacturing', 'Sustainability', 'Company');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_site_common_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_common_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_common_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_home_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_about_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_about_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_about_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_products_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_mfg_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_mfg_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_mfg_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_oem_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_oem_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_oem_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_quality_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_quality_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_quality_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_contact_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_contact_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_contact_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TYPE "public"."enum_site_card_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_card_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_card_v_published_locale" AS ENUM('en', 'zh', 'fr', 'es', 'ru', 'ar', 'ja', 'ms', 'id');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT 'website',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "products_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" "enum_products_slug",
  	"texture" "enum_products_texture",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"name" varchar,
  	"category" varchar,
  	"headline" varchar,
  	"short" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_products_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" "enum__products_v_version_slug",
  	"version_texture" "enum__products_v_version_texture",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_name" varchar,
  	"version_category" varchar,
  	"version_headline" varchar,
  	"version_short" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"category" "enum_news_category",
  	"cover_image_id" integer,
  	"approved_by" varchar,
  	"approval_reference" varchar,
  	"source_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_category" "enum__news_v_version_category",
  	"version_cover_image_id" integer,
  	"version_approved_by" varchar,
  	"version_approval_reference" varchar,
  	"version_source_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"products_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_common" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_common_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_common_locales" (
  	"site_meta_title" varchar,
  	"site_meta_description" varchar,
  	"nav_about" varchar,
  	"nav_products" varchar,
  	"nav_manufacturing" varchar,
  	"nav_quality" varchar,
  	"nav_oem_odm" varchar,
  	"nav_news" varchar,
  	"nav_contact" varchar,
  	"common_skip_to_content" varchar,
  	"common_all_products" varchar,
  	"common_all_news" varchar,
  	"common_read_article" varchar,
  	"common_request_samples" varchar,
  	"common_more_about_hailan" varchar,
  	"common_explore_products" varchar,
  	"common_our_manufacturing" varchar,
  	"common_language_label" varchar,
  	"cta_title" varchar,
  	"cta_lede" varchar,
  	"cta_button" varchar,
  	"footer_tagline" varchar,
  	"footer_products" varchar,
  	"footer_company" varchar,
  	"footer_headquarters" varchar,
  	"footer_rights" varchar,
  	"footer_signoff" varchar,
  	"footer_global_inquiries" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_common_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_site_common_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_common_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_common_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_common_v_locales" (
  	"version_site_meta_title" varchar,
  	"version_site_meta_description" varchar,
  	"version_nav_about" varchar,
  	"version_nav_products" varchar,
  	"version_nav_manufacturing" varchar,
  	"version_nav_quality" varchar,
  	"version_nav_oem_odm" varchar,
  	"version_nav_news" varchar,
  	"version_nav_contact" varchar,
  	"version_common_skip_to_content" varchar,
  	"version_common_all_products" varchar,
  	"version_common_all_news" varchar,
  	"version_common_read_article" varchar,
  	"version_common_request_samples" varchar,
  	"version_common_more_about_hailan" varchar,
  	"version_common_explore_products" varchar,
  	"version_common_our_manufacturing" varchar,
  	"version_common_language_label" varchar,
  	"version_cta_title" varchar,
  	"version_cta_lede" varchar,
  	"version_cta_button" varchar,
  	"version_footer_tagline" varchar,
  	"version_footer_products" varchar,
  	"version_footer_company" varchar,
  	"version_footer_headquarters" varchar,
  	"version_footer_rights" varchar,
  	"version_footer_signoff" varchar,
  	"version_footer_global_inquiries" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_common_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "site_home_manufacturing_home_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_home_why_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"proof" varchar
  );
  
  CREATE TABLE "site_home_markets_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"markets" varchar
  );
  
  CREATE TABLE "site_home_markets_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "site_home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_home_locales" (
  	"hero_kicker" varchar,
  	"hero_headline_line1" varchar,
  	"hero_headline_line2" varchar,
  	"hero_lede" varchar,
  	"hero_badge" varchar,
  	"hero_scroll" varchar,
  	"intro_eyebrow" varchar,
  	"intro_title" varchar,
  	"intro_para1" varchar,
  	"intro_para2" varchar,
  	"intro_stats_countries" varchar,
  	"intro_stats_facility" varchar,
  	"intro_stats_facility_unit" varchar,
  	"intro_stats_capacity" varchar,
  	"intro_stats_team" varchar,
  	"products_home_eyebrow" varchar,
  	"products_home_title" varchar,
  	"products_home_lede" varchar,
  	"product_lines_lvt_flooring_name" varchar,
  	"product_lines_lvt_flooring_category" varchar,
  	"product_lines_lvt_flooring_short" varchar,
  	"product_lines_pet_wall_coverings_name" varchar,
  	"product_lines_pet_wall_coverings_category" varchar,
  	"product_lines_pet_wall_coverings_short" varchar,
  	"product_lines_pet_carpet_coverings_name" varchar,
  	"product_lines_pet_carpet_coverings_category" varchar,
  	"product_lines_pet_carpet_coverings_short" varchar,
  	"manufacturing_home_eyebrow" varchar,
  	"manufacturing_home_title" varchar,
  	"manufacturing_home_lede" varchar,
  	"manufacturing_home_link" varchar,
  	"why_eyebrow" varchar,
  	"why_title" varchar,
  	"why_lede" varchar,
  	"markets_eyebrow" varchar,
  	"markets_title" varchar,
  	"markets_lede" varchar,
  	"news_home_eyebrow" varchar,
  	"news_home_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_home_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_site_home_v_version_manufacturing_home_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_home_v_version_why_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"proof" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_home_v_version_markets_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"markets" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_home_v_version_markets_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_home_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_home_v_locales" (
  	"version_hero_kicker" varchar,
  	"version_hero_headline_line1" varchar,
  	"version_hero_headline_line2" varchar,
  	"version_hero_lede" varchar,
  	"version_hero_badge" varchar,
  	"version_hero_scroll" varchar,
  	"version_intro_eyebrow" varchar,
  	"version_intro_title" varchar,
  	"version_intro_para1" varchar,
  	"version_intro_para2" varchar,
  	"version_intro_stats_countries" varchar,
  	"version_intro_stats_facility" varchar,
  	"version_intro_stats_facility_unit" varchar,
  	"version_intro_stats_capacity" varchar,
  	"version_intro_stats_team" varchar,
  	"version_products_home_eyebrow" varchar,
  	"version_products_home_title" varchar,
  	"version_products_home_lede" varchar,
  	"version_product_lines_lvt_flooring_name" varchar,
  	"version_product_lines_lvt_flooring_category" varchar,
  	"version_product_lines_lvt_flooring_short" varchar,
  	"version_product_lines_pet_wall_coverings_name" varchar,
  	"version_product_lines_pet_wall_coverings_category" varchar,
  	"version_product_lines_pet_wall_coverings_short" varchar,
  	"version_product_lines_pet_carpet_coverings_name" varchar,
  	"version_product_lines_pet_carpet_coverings_category" varchar,
  	"version_product_lines_pet_carpet_coverings_short" varchar,
  	"version_manufacturing_home_eyebrow" varchar,
  	"version_manufacturing_home_title" varchar,
  	"version_manufacturing_home_lede" varchar,
  	"version_manufacturing_home_link" varchar,
  	"version_why_eyebrow" varchar,
  	"version_why_title" varchar,
  	"version_why_lede" varchar,
  	"version_markets_eyebrow" varchar,
  	"version_markets_title" varchar,
  	"version_markets_lede" varchar,
  	"version_news_home_eyebrow" varchar,
  	"version_news_home_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_home_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "site_about_about_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_about_about_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_about_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_about_locales" (
  	"about_meta_title" varchar,
  	"about_meta_description" varchar,
  	"about_hero_eyebrow" varchar,
  	"about_hero_title" varchar,
  	"about_hero_lede" varchar,
  	"about_story_eyebrow" varchar,
  	"about_story_title" varchar,
  	"about_story_para1" varchar,
  	"about_story_para2" varchar,
  	"about_story_para3" varchar,
  	"about_story_stats_founded" varchar,
  	"about_story_stats_facility" varchar,
  	"about_story_stats_lines" varchar,
  	"about_story_stats_team" varchar,
  	"about_values_eyebrow" varchar,
  	"about_values_title" varchar,
  	"about_values_lede" varchar,
  	"about_timeline_eyebrow" varchar,
  	"about_timeline_title" varchar,
  	"about_compliance_eyebrow" varchar,
  	"about_compliance_title" varchar,
  	"about_compliance_text" varchar,
  	"about_cta_title" varchar,
  	"about_cta_lede" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_about_v_version_about_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_about_v_version_about_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_about_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_about_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_about_v_locales" (
  	"version_about_meta_title" varchar,
  	"version_about_meta_description" varchar,
  	"version_about_hero_eyebrow" varchar,
  	"version_about_hero_title" varchar,
  	"version_about_hero_lede" varchar,
  	"version_about_story_eyebrow" varchar,
  	"version_about_story_title" varchar,
  	"version_about_story_para1" varchar,
  	"version_about_story_para2" varchar,
  	"version_about_story_para3" varchar,
  	"version_about_story_stats_founded" varchar,
  	"version_about_story_stats_facility" varchar,
  	"version_about_story_stats_lines" varchar,
  	"version_about_story_stats_team" varchar,
  	"version_about_values_eyebrow" varchar,
  	"version_about_values_title" varchar,
  	"version_about_values_lede" varchar,
  	"version_about_timeline_eyebrow" varchar,
  	"version_about_timeline_title" varchar,
  	"version_about_compliance_eyebrow" varchar,
  	"version_about_compliance_title" varchar,
  	"version_about_compliance_text" varchar,
  	"version_about_cta_title" varchar,
  	"version_about_cta_lede" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_products_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_products_locales" (
  	"products_page_meta_title" varchar,
  	"products_page_meta_description" varchar,
  	"products_page_hero_eyebrow" varchar,
  	"products_page_hero_title" varchar,
  	"products_page_hero_lede" varchar,
  	"products_page_explore" varchar,
  	"products_page_roadmap_eyebrow" varchar,
  	"products_page_roadmap_title" varchar,
  	"products_page_roadmap_text" varchar,
  	"products_page_roadmap_link" varchar,
  	"products_page_cta_title" varchar,
  	"products_page_cta_lede" varchar,
  	"products_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_products_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_products_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_products_v_locales" (
  	"version_products_page_meta_title" varchar,
  	"version_products_page_meta_description" varchar,
  	"version_products_page_hero_eyebrow" varchar,
  	"version_products_page_hero_title" varchar,
  	"version_products_page_hero_lede" varchar,
  	"version_products_page_explore" varchar,
  	"version_products_page_roadmap_eyebrow" varchar,
  	"version_products_page_roadmap_title" varchar,
  	"version_products_page_roadmap_text" varchar,
  	"version_products_page_roadmap_link" varchar,
  	"version_products_page_cta_title" varchar,
  	"version_products_page_cta_lede" varchar,
  	"version_products_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mfg_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "mfg_automation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_mfg" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_mfg_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_mfg_locales" (
  	"manufacturing_page_meta_title" varchar,
  	"manufacturing_page_meta_description" varchar,
  	"manufacturing_page_hero_eyebrow" varchar,
  	"manufacturing_page_hero_title" varchar,
  	"manufacturing_page_hero_lede" varchar,
  	"manufacturing_page_process_eyebrow" varchar,
  	"manufacturing_page_process_title" varchar,
  	"manufacturing_page_process_lede" varchar,
  	"manufacturing_page_automation_eyebrow" varchar,
  	"manufacturing_page_automation_title" varchar,
  	"manufacturing_page_automation_lede" varchar,
  	"manufacturing_page_automation_link" varchar,
  	"manufacturing_page_logistics_eyebrow" varchar,
  	"manufacturing_page_logistics_title" varchar,
  	"manufacturing_page_logistics_text" varchar,
  	"manufacturing_page_cta_title" varchar,
  	"manufacturing_page_cta_lede" varchar,
  	"manufacturing_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_mfg_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_mfg_process_steps_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_mfg_automation_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_mfg_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_mfg_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_mfg_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_mfg_v_locales" (
  	"version_manufacturing_page_meta_title" varchar,
  	"version_manufacturing_page_meta_description" varchar,
  	"version_manufacturing_page_hero_eyebrow" varchar,
  	"version_manufacturing_page_hero_title" varchar,
  	"version_manufacturing_page_hero_lede" varchar,
  	"version_manufacturing_page_process_eyebrow" varchar,
  	"version_manufacturing_page_process_title" varchar,
  	"version_manufacturing_page_process_lede" varchar,
  	"version_manufacturing_page_automation_eyebrow" varchar,
  	"version_manufacturing_page_automation_title" varchar,
  	"version_manufacturing_page_automation_lede" varchar,
  	"version_manufacturing_page_automation_link" varchar,
  	"version_manufacturing_page_logistics_eyebrow" varchar,
  	"version_manufacturing_page_logistics_title" varchar,
  	"version_manufacturing_page_logistics_text" varchar,
  	"version_manufacturing_page_cta_title" varchar,
  	"version_manufacturing_page_cta_lede" varchar,
  	"version_manufacturing_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_mfg_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "site_oem_oem_odm_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_oem_oem_odm_page_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_oem" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_oem_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_oem_locales" (
  	"oem_odm_page_meta_title" varchar,
  	"oem_odm_page_meta_description" varchar,
  	"oem_odm_page_hero_eyebrow" varchar,
  	"oem_odm_page_hero_title" varchar,
  	"oem_odm_page_hero_lede" varchar,
  	"oem_odm_page_process_eyebrow" varchar,
  	"oem_odm_page_process_title" varchar,
  	"oem_odm_page_process_lede" varchar,
  	"oem_odm_page_services_eyebrow" varchar,
  	"oem_odm_page_services_title" varchar,
  	"oem_odm_page_assurances_eyebrow" varchar,
  	"oem_odm_page_assurances_title" varchar,
  	"oem_odm_page_assurances_intro" varchar,
  	"oem_odm_page_cta_title" varchar,
  	"oem_odm_page_cta_lede" varchar,
  	"oem_odm_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_oem_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_site_oem_v_version_oem_odm_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_oem_v_version_oem_odm_page_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_oem_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_oem_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_oem_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_oem_v_locales" (
  	"version_oem_odm_page_meta_title" varchar,
  	"version_oem_odm_page_meta_description" varchar,
  	"version_oem_odm_page_hero_eyebrow" varchar,
  	"version_oem_odm_page_hero_title" varchar,
  	"version_oem_odm_page_hero_lede" varchar,
  	"version_oem_odm_page_process_eyebrow" varchar,
  	"version_oem_odm_page_process_title" varchar,
  	"version_oem_odm_page_process_lede" varchar,
  	"version_oem_odm_page_services_eyebrow" varchar,
  	"version_oem_odm_page_services_title" varchar,
  	"version_oem_odm_page_assurances_eyebrow" varchar,
  	"version_oem_odm_page_assurances_title" varchar,
  	"version_oem_odm_page_assurances_intro" varchar,
  	"version_oem_odm_page_cta_title" varchar,
  	"version_oem_odm_page_cta_lede" varchar,
  	"version_oem_odm_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_oem_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "site_quality_quality_page_gates_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_quality" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_quality_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_quality_locales" (
  	"quality_page_meta_title" varchar,
  	"quality_page_meta_description" varchar,
  	"quality_page_hero_eyebrow" varchar,
  	"quality_page_hero_title" varchar,
  	"quality_page_hero_lede" varchar,
  	"quality_page_gates_eyebrow" varchar,
  	"quality_page_gates_title" varchar,
  	"quality_page_gates_lede" varchar,
  	"quality_page_gates_gate_label" varchar,
  	"quality_page_lab_eyebrow" varchar,
  	"quality_page_lab_title" varchar,
  	"quality_page_lab_lede" varchar,
  	"quality_page_lab_caption" varchar,
  	"quality_page_lab_col_test" varchar,
  	"quality_page_lab_col_method" varchar,
  	"quality_page_trace_eyebrow" varchar,
  	"quality_page_trace_title" varchar,
  	"quality_page_trace_para1" varchar,
  	"quality_page_trace_para2" varchar,
  	"quality_page_certs_eyebrow" varchar,
  	"quality_page_certs_title" varchar,
  	"quality_page_certs_lede" varchar,
  	"quality_page_cta_title" varchar,
  	"quality_page_cta_lede" varchar,
  	"quality_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_quality_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_site_quality_v_version_quality_page_gates_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_quality_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_quality_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_quality_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_quality_v_locales" (
  	"version_quality_page_meta_title" varchar,
  	"version_quality_page_meta_description" varchar,
  	"version_quality_page_hero_eyebrow" varchar,
  	"version_quality_page_hero_title" varchar,
  	"version_quality_page_hero_lede" varchar,
  	"version_quality_page_gates_eyebrow" varchar,
  	"version_quality_page_gates_title" varchar,
  	"version_quality_page_gates_lede" varchar,
  	"version_quality_page_gates_gate_label" varchar,
  	"version_quality_page_lab_eyebrow" varchar,
  	"version_quality_page_lab_title" varchar,
  	"version_quality_page_lab_lede" varchar,
  	"version_quality_page_lab_caption" varchar,
  	"version_quality_page_lab_col_test" varchar,
  	"version_quality_page_lab_col_method" varchar,
  	"version_quality_page_trace_eyebrow" varchar,
  	"version_quality_page_trace_title" varchar,
  	"version_quality_page_trace_para1" varchar,
  	"version_quality_page_trace_para2" varchar,
  	"version_quality_page_certs_eyebrow" varchar,
  	"version_quality_page_certs_title" varchar,
  	"version_quality_page_certs_lede" varchar,
  	"version_quality_page_cta_title" varchar,
  	"version_quality_page_cta_lede" varchar,
  	"version_quality_page_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_quality_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "site_contact_contact_page_expectations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "site_contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_contact_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_contact_locales" (
  	"contact_page_meta_title" varchar,
  	"contact_page_meta_description" varchar,
  	"contact_page_hero_eyebrow" varchar,
  	"contact_page_hero_title" varchar,
  	"contact_page_hero_lede" varchar,
  	"contact_page_inquiries" varchar,
  	"contact_page_hq" varchar,
  	"contact_page_hours" varchar,
  	"contact_page_visits" varchar,
  	"contact_page_next_title" varchar,
  	"contact_page_form_heading" varchar,
  	"contact_page_form_intro" varchar,
  	"contact_page_form_name" varchar,
  	"contact_page_form_name_placeholder" varchar,
  	"contact_page_form_company" varchar,
  	"contact_page_form_company_placeholder" varchar,
  	"contact_page_form_email" varchar,
  	"contact_page_form_email_placeholder" varchar,
  	"contact_page_form_country" varchar,
  	"contact_page_form_country_placeholder" varchar,
  	"contact_page_form_inquiry" varchar,
  	"contact_page_form_products_interest" varchar,
  	"contact_page_form_message" varchar,
  	"contact_page_form_message_placeholder" varchar,
  	"contact_page_form_submit" varchar,
  	"contact_page_form_note" varchar,
  	"contact_page_form_status" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_contact_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_site_contact_v_version_contact_page_expectations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_contact_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_contact_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_contact_v_locales" (
  	"version_contact_page_meta_title" varchar,
  	"version_contact_page_meta_description" varchar,
  	"version_contact_page_hero_eyebrow" varchar,
  	"version_contact_page_hero_title" varchar,
  	"version_contact_page_hero_lede" varchar,
  	"version_contact_page_inquiries" varchar,
  	"version_contact_page_hq" varchar,
  	"version_contact_page_hours" varchar,
  	"version_contact_page_visits" varchar,
  	"version_contact_page_next_title" varchar,
  	"version_contact_page_form_heading" varchar,
  	"version_contact_page_form_intro" varchar,
  	"version_contact_page_form_name" varchar,
  	"version_contact_page_form_name_placeholder" varchar,
  	"version_contact_page_form_company" varchar,
  	"version_contact_page_form_company_placeholder" varchar,
  	"version_contact_page_form_email" varchar,
  	"version_contact_page_form_email_placeholder" varchar,
  	"version_contact_page_form_country" varchar,
  	"version_contact_page_form_country_placeholder" varchar,
  	"version_contact_page_form_inquiry" varchar,
  	"version_contact_page_form_products_interest" varchar,
  	"version_contact_page_form_message" varchar,
  	"version_contact_page_form_message_placeholder" varchar,
  	"version_contact_page_form_submit" varchar,
  	"version_contact_page_form_note" varchar,
  	"version_contact_page_form_status" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_contact_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "site_card" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_site_card_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_card_locales" (
  	"linus_page_meta_title" varchar,
  	"linus_page_meta_description" varchar,
  	"linus_page_hero_role" varchar,
  	"linus_page_get_in_touch" varchar,
  	"linus_page_labels_email" varchar,
  	"linus_page_wecom_value" varchar,
  	"linus_page_wecom_note" varchar,
  	"linus_page_linkedin_value" varchar,
  	"linus_page_company_tagline" varchar,
  	"linus_page_wecom_heading" varchar,
  	"linus_page_wecom_scan" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_card_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__site_card_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_card_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_card_v_locales" (
  	"version_linus_page_meta_title" varchar,
  	"version_linus_page_meta_description" varchar,
  	"version_linus_page_hero_role" varchar,
  	"version_linus_page_get_in_touch" varchar,
  	"version_linus_page_labels_email" varchar,
  	"version_linus_page_wecom_value" varchar,
  	"version_linus_page_wecom_note" varchar,
  	"version_linus_page_linkedin_value" varchar,
  	"version_linus_page_company_tagline" varchar,
  	"version_linus_page_wecom_heading" varchar,
  	"version_linus_page_wecom_scan" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_specs" ADD CONSTRAINT "products_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_texts" ADD CONSTRAINT "products_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features" ADD CONSTRAINT "_products_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_specs" ADD CONSTRAINT "_products_v_version_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_texts" ADD CONSTRAINT "_products_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_texts" ADD CONSTRAINT "news_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_texts" ADD CONSTRAINT "_news_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_common_locales" ADD CONSTRAINT "site_common_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_common_texts" ADD CONSTRAINT "site_common_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_common_v_locales" ADD CONSTRAINT "_site_common_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_common_v_texts" ADD CONSTRAINT "_site_common_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_common_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_home_manufacturing_home_pillars" ADD CONSTRAINT "site_home_manufacturing_home_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_home_why_reasons" ADD CONSTRAINT "site_home_why_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_home_markets_regions" ADD CONSTRAINT "site_home_markets_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_home_markets_figures" ADD CONSTRAINT "site_home_markets_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_home_locales" ADD CONSTRAINT "site_home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_home_texts" ADD CONSTRAINT "site_home_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_home_v_version_manufacturing_home_pillars" ADD CONSTRAINT "_site_home_v_version_manufacturing_home_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_home_v_version_why_reasons" ADD CONSTRAINT "_site_home_v_version_why_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_home_v_version_markets_regions" ADD CONSTRAINT "_site_home_v_version_markets_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_home_v_version_markets_figures" ADD CONSTRAINT "_site_home_v_version_markets_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_home_v_locales" ADD CONSTRAINT "_site_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_home_v_texts" ADD CONSTRAINT "_site_home_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_about_about_values_items" ADD CONSTRAINT "site_about_about_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_about_about_timeline_items" ADD CONSTRAINT "site_about_about_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_about_locales" ADD CONSTRAINT "site_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_about_v_version_about_values_items" ADD CONSTRAINT "_site_about_v_version_about_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_about_v_version_about_timeline_items" ADD CONSTRAINT "_site_about_v_version_about_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_about_v_locales" ADD CONSTRAINT "_site_about_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_products_locales" ADD CONSTRAINT "site_products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_products_v_locales" ADD CONSTRAINT "_site_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mfg_process_steps" ADD CONSTRAINT "mfg_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_mfg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mfg_automation_items" ADD CONSTRAINT "mfg_automation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_mfg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_mfg_locales" ADD CONSTRAINT "site_mfg_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_mfg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_mfg_texts" ADD CONSTRAINT "site_mfg_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_mfg"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mfg_process_steps_v" ADD CONSTRAINT "_mfg_process_steps_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_mfg_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mfg_automation_items_v" ADD CONSTRAINT "_mfg_automation_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_mfg_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_mfg_v_locales" ADD CONSTRAINT "_site_mfg_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_mfg_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_mfg_v_texts" ADD CONSTRAINT "_site_mfg_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_mfg_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_oem_oem_odm_page_process_steps" ADD CONSTRAINT "site_oem_oem_odm_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_oem"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_oem_oem_odm_page_services_items" ADD CONSTRAINT "site_oem_oem_odm_page_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_oem"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_oem_locales" ADD CONSTRAINT "site_oem_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_oem"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_oem_texts" ADD CONSTRAINT "site_oem_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_oem"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_oem_v_version_oem_odm_page_process_steps" ADD CONSTRAINT "_site_oem_v_version_oem_odm_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_oem_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_oem_v_version_oem_odm_page_services_items" ADD CONSTRAINT "_site_oem_v_version_oem_odm_page_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_oem_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_oem_v_locales" ADD CONSTRAINT "_site_oem_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_oem_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_oem_v_texts" ADD CONSTRAINT "_site_oem_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_oem_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_quality_quality_page_gates_items" ADD CONSTRAINT "site_quality_quality_page_gates_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_quality"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_quality_locales" ADD CONSTRAINT "site_quality_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_quality"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_quality_texts" ADD CONSTRAINT "site_quality_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_quality"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_quality_v_version_quality_page_gates_items" ADD CONSTRAINT "_site_quality_v_version_quality_page_gates_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_quality_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_quality_v_locales" ADD CONSTRAINT "_site_quality_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_quality_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_quality_v_texts" ADD CONSTRAINT "_site_quality_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_quality_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contact_contact_page_expectations" ADD CONSTRAINT "site_contact_contact_page_expectations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contact_locales" ADD CONSTRAINT "site_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contact_texts" ADD CONSTRAINT "site_contact_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_contact_v_version_contact_page_expectations" ADD CONSTRAINT "_site_contact_v_version_contact_page_expectations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_contact_v_locales" ADD CONSTRAINT "_site_contact_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_contact_v_texts" ADD CONSTRAINT "_site_contact_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_card_locales" ADD CONSTRAINT "site_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_card_v_locales" ADD CONSTRAINT "_site_card_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_card_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE INDEX "products_features_locale_idx" ON "products_features" USING btree ("_locale");
  CREATE INDEX "products_specs_order_idx" ON "products_specs" USING btree ("_order");
  CREATE INDEX "products_specs_parent_id_idx" ON "products_specs" USING btree ("_parent_id");
  CREATE INDEX "products_specs_locale_idx" ON "products_specs" USING btree ("_locale");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_texts_order_parent" ON "products_texts" USING btree ("order","parent_id");
  CREATE INDEX "products_texts_locale_parent" ON "products_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_products_v_version_features_order_idx" ON "_products_v_version_features" USING btree ("_order");
  CREATE INDEX "_products_v_version_features_parent_id_idx" ON "_products_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_features_locale_idx" ON "_products_v_version_features" USING btree ("_locale");
  CREATE INDEX "_products_v_version_specs_order_idx" ON "_products_v_version_specs" USING btree ("_order");
  CREATE INDEX "_products_v_version_specs_parent_id_idx" ON "_products_v_version_specs" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_specs_locale_idx" ON "_products_v_version_specs" USING btree ("_locale");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_texts_order_parent" ON "_products_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_products_v_texts_locale_parent" ON "_products_v_texts" USING btree ("locale","parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_texts_order_parent" ON "news_texts" USING btree ("order","parent_id");
  CREATE INDEX "news_texts_locale_parent" ON "news_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_texts_order_parent" ON "_news_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_news_v_texts_locale_parent" ON "_news_v_texts" USING btree ("locale","parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_common__status_idx" ON "site_common" USING btree ("_status");
  CREATE UNIQUE INDEX "site_common_locales_locale_parent_id_unique" ON "site_common_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_common_texts_order_parent" ON "site_common_texts" USING btree ("order","parent_id");
  CREATE INDEX "site_common_texts_locale_parent" ON "site_common_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_site_common_v_version_version__status_idx" ON "_site_common_v" USING btree ("version__status");
  CREATE INDEX "_site_common_v_created_at_idx" ON "_site_common_v" USING btree ("created_at");
  CREATE INDEX "_site_common_v_updated_at_idx" ON "_site_common_v" USING btree ("updated_at");
  CREATE INDEX "_site_common_v_snapshot_idx" ON "_site_common_v" USING btree ("snapshot");
  CREATE INDEX "_site_common_v_published_locale_idx" ON "_site_common_v" USING btree ("published_locale");
  CREATE INDEX "_site_common_v_latest_idx" ON "_site_common_v" USING btree ("latest");
  CREATE INDEX "_site_common_v_autosave_idx" ON "_site_common_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_common_v_locales_locale_parent_id_unique" ON "_site_common_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_common_v_texts_order_parent" ON "_site_common_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_common_v_texts_locale_parent" ON "_site_common_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "site_home_manufacturing_home_pillars_order_idx" ON "site_home_manufacturing_home_pillars" USING btree ("_order");
  CREATE INDEX "site_home_manufacturing_home_pillars_parent_id_idx" ON "site_home_manufacturing_home_pillars" USING btree ("_parent_id");
  CREATE INDEX "site_home_manufacturing_home_pillars_locale_idx" ON "site_home_manufacturing_home_pillars" USING btree ("_locale");
  CREATE INDEX "site_home_why_reasons_order_idx" ON "site_home_why_reasons" USING btree ("_order");
  CREATE INDEX "site_home_why_reasons_parent_id_idx" ON "site_home_why_reasons" USING btree ("_parent_id");
  CREATE INDEX "site_home_why_reasons_locale_idx" ON "site_home_why_reasons" USING btree ("_locale");
  CREATE INDEX "site_home_markets_regions_order_idx" ON "site_home_markets_regions" USING btree ("_order");
  CREATE INDEX "site_home_markets_regions_parent_id_idx" ON "site_home_markets_regions" USING btree ("_parent_id");
  CREATE INDEX "site_home_markets_regions_locale_idx" ON "site_home_markets_regions" USING btree ("_locale");
  CREATE INDEX "site_home_markets_figures_order_idx" ON "site_home_markets_figures" USING btree ("_order");
  CREATE INDEX "site_home_markets_figures_parent_id_idx" ON "site_home_markets_figures" USING btree ("_parent_id");
  CREATE INDEX "site_home_markets_figures_locale_idx" ON "site_home_markets_figures" USING btree ("_locale");
  CREATE INDEX "site_home__status_idx" ON "site_home" USING btree ("_status");
  CREATE UNIQUE INDEX "site_home_locales_locale_parent_id_unique" ON "site_home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_home_texts_order_parent" ON "site_home_texts" USING btree ("order","parent_id");
  CREATE INDEX "site_home_texts_locale_parent" ON "site_home_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_site_home_v_version_manufacturing_home_pillars_order_idx" ON "_site_home_v_version_manufacturing_home_pillars" USING btree ("_order");
  CREATE INDEX "_site_home_v_version_manufacturing_home_pillars_parent_id_idx" ON "_site_home_v_version_manufacturing_home_pillars" USING btree ("_parent_id");
  CREATE INDEX "_site_home_v_version_manufacturing_home_pillars_locale_idx" ON "_site_home_v_version_manufacturing_home_pillars" USING btree ("_locale");
  CREATE INDEX "_site_home_v_version_why_reasons_order_idx" ON "_site_home_v_version_why_reasons" USING btree ("_order");
  CREATE INDEX "_site_home_v_version_why_reasons_parent_id_idx" ON "_site_home_v_version_why_reasons" USING btree ("_parent_id");
  CREATE INDEX "_site_home_v_version_why_reasons_locale_idx" ON "_site_home_v_version_why_reasons" USING btree ("_locale");
  CREATE INDEX "_site_home_v_version_markets_regions_order_idx" ON "_site_home_v_version_markets_regions" USING btree ("_order");
  CREATE INDEX "_site_home_v_version_markets_regions_parent_id_idx" ON "_site_home_v_version_markets_regions" USING btree ("_parent_id");
  CREATE INDEX "_site_home_v_version_markets_regions_locale_idx" ON "_site_home_v_version_markets_regions" USING btree ("_locale");
  CREATE INDEX "_site_home_v_version_markets_figures_order_idx" ON "_site_home_v_version_markets_figures" USING btree ("_order");
  CREATE INDEX "_site_home_v_version_markets_figures_parent_id_idx" ON "_site_home_v_version_markets_figures" USING btree ("_parent_id");
  CREATE INDEX "_site_home_v_version_markets_figures_locale_idx" ON "_site_home_v_version_markets_figures" USING btree ("_locale");
  CREATE INDEX "_site_home_v_version_version__status_idx" ON "_site_home_v" USING btree ("version__status");
  CREATE INDEX "_site_home_v_created_at_idx" ON "_site_home_v" USING btree ("created_at");
  CREATE INDEX "_site_home_v_updated_at_idx" ON "_site_home_v" USING btree ("updated_at");
  CREATE INDEX "_site_home_v_snapshot_idx" ON "_site_home_v" USING btree ("snapshot");
  CREATE INDEX "_site_home_v_published_locale_idx" ON "_site_home_v" USING btree ("published_locale");
  CREATE INDEX "_site_home_v_latest_idx" ON "_site_home_v" USING btree ("latest");
  CREATE INDEX "_site_home_v_autosave_idx" ON "_site_home_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_home_v_locales_locale_parent_id_unique" ON "_site_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_home_v_texts_order_parent" ON "_site_home_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_home_v_texts_locale_parent" ON "_site_home_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "site_about_about_values_items_order_idx" ON "site_about_about_values_items" USING btree ("_order");
  CREATE INDEX "site_about_about_values_items_parent_id_idx" ON "site_about_about_values_items" USING btree ("_parent_id");
  CREATE INDEX "site_about_about_values_items_locale_idx" ON "site_about_about_values_items" USING btree ("_locale");
  CREATE INDEX "site_about_about_timeline_items_order_idx" ON "site_about_about_timeline_items" USING btree ("_order");
  CREATE INDEX "site_about_about_timeline_items_parent_id_idx" ON "site_about_about_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "site_about_about_timeline_items_locale_idx" ON "site_about_about_timeline_items" USING btree ("_locale");
  CREATE INDEX "site_about__status_idx" ON "site_about" USING btree ("_status");
  CREATE UNIQUE INDEX "site_about_locales_locale_parent_id_unique" ON "site_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_about_v_version_about_values_items_order_idx" ON "_site_about_v_version_about_values_items" USING btree ("_order");
  CREATE INDEX "_site_about_v_version_about_values_items_parent_id_idx" ON "_site_about_v_version_about_values_items" USING btree ("_parent_id");
  CREATE INDEX "_site_about_v_version_about_values_items_locale_idx" ON "_site_about_v_version_about_values_items" USING btree ("_locale");
  CREATE INDEX "_site_about_v_version_about_timeline_items_order_idx" ON "_site_about_v_version_about_timeline_items" USING btree ("_order");
  CREATE INDEX "_site_about_v_version_about_timeline_items_parent_id_idx" ON "_site_about_v_version_about_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_site_about_v_version_about_timeline_items_locale_idx" ON "_site_about_v_version_about_timeline_items" USING btree ("_locale");
  CREATE INDEX "_site_about_v_version_version__status_idx" ON "_site_about_v" USING btree ("version__status");
  CREATE INDEX "_site_about_v_created_at_idx" ON "_site_about_v" USING btree ("created_at");
  CREATE INDEX "_site_about_v_updated_at_idx" ON "_site_about_v" USING btree ("updated_at");
  CREATE INDEX "_site_about_v_snapshot_idx" ON "_site_about_v" USING btree ("snapshot");
  CREATE INDEX "_site_about_v_published_locale_idx" ON "_site_about_v" USING btree ("published_locale");
  CREATE INDEX "_site_about_v_latest_idx" ON "_site_about_v" USING btree ("latest");
  CREATE INDEX "_site_about_v_autosave_idx" ON "_site_about_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_about_v_locales_locale_parent_id_unique" ON "_site_about_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_products__status_idx" ON "site_products" USING btree ("_status");
  CREATE UNIQUE INDEX "site_products_locales_locale_parent_id_unique" ON "site_products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_products_v_version_version__status_idx" ON "_site_products_v" USING btree ("version__status");
  CREATE INDEX "_site_products_v_created_at_idx" ON "_site_products_v" USING btree ("created_at");
  CREATE INDEX "_site_products_v_updated_at_idx" ON "_site_products_v" USING btree ("updated_at");
  CREATE INDEX "_site_products_v_snapshot_idx" ON "_site_products_v" USING btree ("snapshot");
  CREATE INDEX "_site_products_v_published_locale_idx" ON "_site_products_v" USING btree ("published_locale");
  CREATE INDEX "_site_products_v_latest_idx" ON "_site_products_v" USING btree ("latest");
  CREATE INDEX "_site_products_v_autosave_idx" ON "_site_products_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_products_v_locales_locale_parent_id_unique" ON "_site_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "mfg_process_steps_order_idx" ON "mfg_process_steps" USING btree ("_order");
  CREATE INDEX "mfg_process_steps_parent_id_idx" ON "mfg_process_steps" USING btree ("_parent_id");
  CREATE INDEX "mfg_process_steps_locale_idx" ON "mfg_process_steps" USING btree ("_locale");
  CREATE INDEX "mfg_automation_items_order_idx" ON "mfg_automation_items" USING btree ("_order");
  CREATE INDEX "mfg_automation_items_parent_id_idx" ON "mfg_automation_items" USING btree ("_parent_id");
  CREATE INDEX "mfg_automation_items_locale_idx" ON "mfg_automation_items" USING btree ("_locale");
  CREATE INDEX "site_mfg__status_idx" ON "site_mfg" USING btree ("_status");
  CREATE UNIQUE INDEX "site_mfg_locales_locale_parent_id_unique" ON "site_mfg_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_mfg_texts_order_parent" ON "site_mfg_texts" USING btree ("order","parent_id");
  CREATE INDEX "site_mfg_texts_locale_parent" ON "site_mfg_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_mfg_process_steps_v_order_idx" ON "_mfg_process_steps_v" USING btree ("_order");
  CREATE INDEX "_mfg_process_steps_v_parent_id_idx" ON "_mfg_process_steps_v" USING btree ("_parent_id");
  CREATE INDEX "_mfg_process_steps_v_locale_idx" ON "_mfg_process_steps_v" USING btree ("_locale");
  CREATE INDEX "_mfg_automation_items_v_order_idx" ON "_mfg_automation_items_v" USING btree ("_order");
  CREATE INDEX "_mfg_automation_items_v_parent_id_idx" ON "_mfg_automation_items_v" USING btree ("_parent_id");
  CREATE INDEX "_mfg_automation_items_v_locale_idx" ON "_mfg_automation_items_v" USING btree ("_locale");
  CREATE INDEX "_site_mfg_v_version_version__status_idx" ON "_site_mfg_v" USING btree ("version__status");
  CREATE INDEX "_site_mfg_v_created_at_idx" ON "_site_mfg_v" USING btree ("created_at");
  CREATE INDEX "_site_mfg_v_updated_at_idx" ON "_site_mfg_v" USING btree ("updated_at");
  CREATE INDEX "_site_mfg_v_snapshot_idx" ON "_site_mfg_v" USING btree ("snapshot");
  CREATE INDEX "_site_mfg_v_published_locale_idx" ON "_site_mfg_v" USING btree ("published_locale");
  CREATE INDEX "_site_mfg_v_latest_idx" ON "_site_mfg_v" USING btree ("latest");
  CREATE INDEX "_site_mfg_v_autosave_idx" ON "_site_mfg_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_mfg_v_locales_locale_parent_id_unique" ON "_site_mfg_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_mfg_v_texts_order_parent" ON "_site_mfg_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_mfg_v_texts_locale_parent" ON "_site_mfg_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "site_oem_oem_odm_page_process_steps_order_idx" ON "site_oem_oem_odm_page_process_steps" USING btree ("_order");
  CREATE INDEX "site_oem_oem_odm_page_process_steps_parent_id_idx" ON "site_oem_oem_odm_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "site_oem_oem_odm_page_process_steps_locale_idx" ON "site_oem_oem_odm_page_process_steps" USING btree ("_locale");
  CREATE INDEX "site_oem_oem_odm_page_services_items_order_idx" ON "site_oem_oem_odm_page_services_items" USING btree ("_order");
  CREATE INDEX "site_oem_oem_odm_page_services_items_parent_id_idx" ON "site_oem_oem_odm_page_services_items" USING btree ("_parent_id");
  CREATE INDEX "site_oem_oem_odm_page_services_items_locale_idx" ON "site_oem_oem_odm_page_services_items" USING btree ("_locale");
  CREATE INDEX "site_oem__status_idx" ON "site_oem" USING btree ("_status");
  CREATE UNIQUE INDEX "site_oem_locales_locale_parent_id_unique" ON "site_oem_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_oem_texts_order_parent" ON "site_oem_texts" USING btree ("order","parent_id");
  CREATE INDEX "site_oem_texts_locale_parent" ON "site_oem_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_site_oem_v_version_oem_odm_page_process_steps_order_idx" ON "_site_oem_v_version_oem_odm_page_process_steps" USING btree ("_order");
  CREATE INDEX "_site_oem_v_version_oem_odm_page_process_steps_parent_id_idx" ON "_site_oem_v_version_oem_odm_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_site_oem_v_version_oem_odm_page_process_steps_locale_idx" ON "_site_oem_v_version_oem_odm_page_process_steps" USING btree ("_locale");
  CREATE INDEX "_site_oem_v_version_oem_odm_page_services_items_order_idx" ON "_site_oem_v_version_oem_odm_page_services_items" USING btree ("_order");
  CREATE INDEX "_site_oem_v_version_oem_odm_page_services_items_parent_id_idx" ON "_site_oem_v_version_oem_odm_page_services_items" USING btree ("_parent_id");
  CREATE INDEX "_site_oem_v_version_oem_odm_page_services_items_locale_idx" ON "_site_oem_v_version_oem_odm_page_services_items" USING btree ("_locale");
  CREATE INDEX "_site_oem_v_version_version__status_idx" ON "_site_oem_v" USING btree ("version__status");
  CREATE INDEX "_site_oem_v_created_at_idx" ON "_site_oem_v" USING btree ("created_at");
  CREATE INDEX "_site_oem_v_updated_at_idx" ON "_site_oem_v" USING btree ("updated_at");
  CREATE INDEX "_site_oem_v_snapshot_idx" ON "_site_oem_v" USING btree ("snapshot");
  CREATE INDEX "_site_oem_v_published_locale_idx" ON "_site_oem_v" USING btree ("published_locale");
  CREATE INDEX "_site_oem_v_latest_idx" ON "_site_oem_v" USING btree ("latest");
  CREATE INDEX "_site_oem_v_autosave_idx" ON "_site_oem_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_oem_v_locales_locale_parent_id_unique" ON "_site_oem_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_oem_v_texts_order_parent" ON "_site_oem_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_oem_v_texts_locale_parent" ON "_site_oem_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "site_quality_quality_page_gates_items_order_idx" ON "site_quality_quality_page_gates_items" USING btree ("_order");
  CREATE INDEX "site_quality_quality_page_gates_items_parent_id_idx" ON "site_quality_quality_page_gates_items" USING btree ("_parent_id");
  CREATE INDEX "site_quality_quality_page_gates_items_locale_idx" ON "site_quality_quality_page_gates_items" USING btree ("_locale");
  CREATE INDEX "site_quality__status_idx" ON "site_quality" USING btree ("_status");
  CREATE UNIQUE INDEX "site_quality_locales_locale_parent_id_unique" ON "site_quality_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_quality_texts_order_parent" ON "site_quality_texts" USING btree ("order","parent_id");
  CREATE INDEX "site_quality_texts_locale_parent" ON "site_quality_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_site_quality_v_version_quality_page_gates_items_order_idx" ON "_site_quality_v_version_quality_page_gates_items" USING btree ("_order");
  CREATE INDEX "_site_quality_v_version_quality_page_gates_items_parent_id_idx" ON "_site_quality_v_version_quality_page_gates_items" USING btree ("_parent_id");
  CREATE INDEX "_site_quality_v_version_quality_page_gates_items_locale_idx" ON "_site_quality_v_version_quality_page_gates_items" USING btree ("_locale");
  CREATE INDEX "_site_quality_v_version_version__status_idx" ON "_site_quality_v" USING btree ("version__status");
  CREATE INDEX "_site_quality_v_created_at_idx" ON "_site_quality_v" USING btree ("created_at");
  CREATE INDEX "_site_quality_v_updated_at_idx" ON "_site_quality_v" USING btree ("updated_at");
  CREATE INDEX "_site_quality_v_snapshot_idx" ON "_site_quality_v" USING btree ("snapshot");
  CREATE INDEX "_site_quality_v_published_locale_idx" ON "_site_quality_v" USING btree ("published_locale");
  CREATE INDEX "_site_quality_v_latest_idx" ON "_site_quality_v" USING btree ("latest");
  CREATE INDEX "_site_quality_v_autosave_idx" ON "_site_quality_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_quality_v_locales_locale_parent_id_unique" ON "_site_quality_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_quality_v_texts_order_parent" ON "_site_quality_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_quality_v_texts_locale_parent" ON "_site_quality_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "site_contact_contact_page_expectations_order_idx" ON "site_contact_contact_page_expectations" USING btree ("_order");
  CREATE INDEX "site_contact_contact_page_expectations_parent_id_idx" ON "site_contact_contact_page_expectations" USING btree ("_parent_id");
  CREATE INDEX "site_contact_contact_page_expectations_locale_idx" ON "site_contact_contact_page_expectations" USING btree ("_locale");
  CREATE INDEX "site_contact__status_idx" ON "site_contact" USING btree ("_status");
  CREATE UNIQUE INDEX "site_contact_locales_locale_parent_id_unique" ON "site_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_contact_texts_order_parent" ON "site_contact_texts" USING btree ("order","parent_id");
  CREATE INDEX "site_contact_texts_locale_parent" ON "site_contact_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_site_contact_v_version_contact_page_expectations_order_idx" ON "_site_contact_v_version_contact_page_expectations" USING btree ("_order");
  CREATE INDEX "_site_contact_v_version_contact_page_expectations_parent_id_idx" ON "_site_contact_v_version_contact_page_expectations" USING btree ("_parent_id");
  CREATE INDEX "_site_contact_v_version_contact_page_expectations_locale_idx" ON "_site_contact_v_version_contact_page_expectations" USING btree ("_locale");
  CREATE INDEX "_site_contact_v_version_version__status_idx" ON "_site_contact_v" USING btree ("version__status");
  CREATE INDEX "_site_contact_v_created_at_idx" ON "_site_contact_v" USING btree ("created_at");
  CREATE INDEX "_site_contact_v_updated_at_idx" ON "_site_contact_v" USING btree ("updated_at");
  CREATE INDEX "_site_contact_v_snapshot_idx" ON "_site_contact_v" USING btree ("snapshot");
  CREATE INDEX "_site_contact_v_published_locale_idx" ON "_site_contact_v" USING btree ("published_locale");
  CREATE INDEX "_site_contact_v_latest_idx" ON "_site_contact_v" USING btree ("latest");
  CREATE INDEX "_site_contact_v_autosave_idx" ON "_site_contact_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_contact_v_locales_locale_parent_id_unique" ON "_site_contact_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_contact_v_texts_order_parent" ON "_site_contact_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_site_contact_v_texts_locale_parent" ON "_site_contact_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "site_card__status_idx" ON "site_card" USING btree ("_status");
  CREATE UNIQUE INDEX "site_card_locales_locale_parent_id_unique" ON "site_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_card_v_version_version__status_idx" ON "_site_card_v" USING btree ("version__status");
  CREATE INDEX "_site_card_v_created_at_idx" ON "_site_card_v" USING btree ("created_at");
  CREATE INDEX "_site_card_v_updated_at_idx" ON "_site_card_v" USING btree ("updated_at");
  CREATE INDEX "_site_card_v_snapshot_idx" ON "_site_card_v" USING btree ("snapshot");
  CREATE INDEX "_site_card_v_published_locale_idx" ON "_site_card_v" USING btree ("published_locale");
  CREATE INDEX "_site_card_v_latest_idx" ON "_site_card_v" USING btree ("latest");
  CREATE INDEX "_site_card_v_autosave_idx" ON "_site_card_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_card_v_locales_locale_parent_id_unique" ON "_site_card_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products_specs" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "products_texts" CASCADE;
  DROP TABLE "_products_v_version_features" CASCADE;
  DROP TABLE "_products_v_version_specs" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "_products_v_texts" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_texts" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "_news_v_texts" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_common" CASCADE;
  DROP TABLE "site_common_locales" CASCADE;
  DROP TABLE "site_common_texts" CASCADE;
  DROP TABLE "_site_common_v" CASCADE;
  DROP TABLE "_site_common_v_locales" CASCADE;
  DROP TABLE "_site_common_v_texts" CASCADE;
  DROP TABLE "site_home_manufacturing_home_pillars" CASCADE;
  DROP TABLE "site_home_why_reasons" CASCADE;
  DROP TABLE "site_home_markets_regions" CASCADE;
  DROP TABLE "site_home_markets_figures" CASCADE;
  DROP TABLE "site_home" CASCADE;
  DROP TABLE "site_home_locales" CASCADE;
  DROP TABLE "site_home_texts" CASCADE;
  DROP TABLE "_site_home_v_version_manufacturing_home_pillars" CASCADE;
  DROP TABLE "_site_home_v_version_why_reasons" CASCADE;
  DROP TABLE "_site_home_v_version_markets_regions" CASCADE;
  DROP TABLE "_site_home_v_version_markets_figures" CASCADE;
  DROP TABLE "_site_home_v" CASCADE;
  DROP TABLE "_site_home_v_locales" CASCADE;
  DROP TABLE "_site_home_v_texts" CASCADE;
  DROP TABLE "site_about_about_values_items" CASCADE;
  DROP TABLE "site_about_about_timeline_items" CASCADE;
  DROP TABLE "site_about" CASCADE;
  DROP TABLE "site_about_locales" CASCADE;
  DROP TABLE "_site_about_v_version_about_values_items" CASCADE;
  DROP TABLE "_site_about_v_version_about_timeline_items" CASCADE;
  DROP TABLE "_site_about_v" CASCADE;
  DROP TABLE "_site_about_v_locales" CASCADE;
  DROP TABLE "site_products" CASCADE;
  DROP TABLE "site_products_locales" CASCADE;
  DROP TABLE "_site_products_v" CASCADE;
  DROP TABLE "_site_products_v_locales" CASCADE;
  DROP TABLE "mfg_process_steps" CASCADE;
  DROP TABLE "mfg_automation_items" CASCADE;
  DROP TABLE "site_mfg" CASCADE;
  DROP TABLE "site_mfg_locales" CASCADE;
  DROP TABLE "site_mfg_texts" CASCADE;
  DROP TABLE "_mfg_process_steps_v" CASCADE;
  DROP TABLE "_mfg_automation_items_v" CASCADE;
  DROP TABLE "_site_mfg_v" CASCADE;
  DROP TABLE "_site_mfg_v_locales" CASCADE;
  DROP TABLE "_site_mfg_v_texts" CASCADE;
  DROP TABLE "site_oem_oem_odm_page_process_steps" CASCADE;
  DROP TABLE "site_oem_oem_odm_page_services_items" CASCADE;
  DROP TABLE "site_oem" CASCADE;
  DROP TABLE "site_oem_locales" CASCADE;
  DROP TABLE "site_oem_texts" CASCADE;
  DROP TABLE "_site_oem_v_version_oem_odm_page_process_steps" CASCADE;
  DROP TABLE "_site_oem_v_version_oem_odm_page_services_items" CASCADE;
  DROP TABLE "_site_oem_v" CASCADE;
  DROP TABLE "_site_oem_v_locales" CASCADE;
  DROP TABLE "_site_oem_v_texts" CASCADE;
  DROP TABLE "site_quality_quality_page_gates_items" CASCADE;
  DROP TABLE "site_quality" CASCADE;
  DROP TABLE "site_quality_locales" CASCADE;
  DROP TABLE "site_quality_texts" CASCADE;
  DROP TABLE "_site_quality_v_version_quality_page_gates_items" CASCADE;
  DROP TABLE "_site_quality_v" CASCADE;
  DROP TABLE "_site_quality_v_locales" CASCADE;
  DROP TABLE "_site_quality_v_texts" CASCADE;
  DROP TABLE "site_contact_contact_page_expectations" CASCADE;
  DROP TABLE "site_contact" CASCADE;
  DROP TABLE "site_contact_locales" CASCADE;
  DROP TABLE "site_contact_texts" CASCADE;
  DROP TABLE "_site_contact_v_version_contact_page_expectations" CASCADE;
  DROP TABLE "_site_contact_v" CASCADE;
  DROP TABLE "_site_contact_v_locales" CASCADE;
  DROP TABLE "_site_contact_v_texts" CASCADE;
  DROP TABLE "site_card" CASCADE;
  DROP TABLE "site_card_locales" CASCADE;
  DROP TABLE "_site_card_v" CASCADE;
  DROP TABLE "_site_card_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_products_slug";
  DROP TYPE "public"."enum_products_texture";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_slug";
  DROP TYPE "public"."enum__products_v_version_texture";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_site_common_status";
  DROP TYPE "public"."enum__site_common_v_version_status";
  DROP TYPE "public"."enum__site_common_v_published_locale";
  DROP TYPE "public"."enum_site_home_status";
  DROP TYPE "public"."enum__site_home_v_version_status";
  DROP TYPE "public"."enum__site_home_v_published_locale";
  DROP TYPE "public"."enum_site_about_status";
  DROP TYPE "public"."enum__site_about_v_version_status";
  DROP TYPE "public"."enum__site_about_v_published_locale";
  DROP TYPE "public"."enum_site_products_status";
  DROP TYPE "public"."enum__site_products_v_version_status";
  DROP TYPE "public"."enum__site_products_v_published_locale";
  DROP TYPE "public"."enum_site_mfg_status";
  DROP TYPE "public"."enum__site_mfg_v_version_status";
  DROP TYPE "public"."enum__site_mfg_v_published_locale";
  DROP TYPE "public"."enum_site_oem_status";
  DROP TYPE "public"."enum__site_oem_v_version_status";
  DROP TYPE "public"."enum__site_oem_v_published_locale";
  DROP TYPE "public"."enum_site_quality_status";
  DROP TYPE "public"."enum__site_quality_v_version_status";
  DROP TYPE "public"."enum__site_quality_v_published_locale";
  DROP TYPE "public"."enum_site_contact_status";
  DROP TYPE "public"."enum__site_contact_v_version_status";
  DROP TYPE "public"."enum__site_contact_v_published_locale";
  DROP TYPE "public"."enum_site_card_status";
  DROP TYPE "public"."enum__site_card_v_version_status";
  DROP TYPE "public"."enum__site_card_v_published_locale";`)
}
