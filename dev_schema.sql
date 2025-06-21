--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: enum__activiteiten_v_version_division; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__activiteiten_v_version_division AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin'
);


ALTER TYPE public.enum__activiteiten_v_version_division OWNER TO postgres;

--
-- Name: enum__activiteiten_v_version_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__activiteiten_v_version_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum__activiteiten_v_version_status OWNER TO postgres;

--
-- Name: enum__camps_v_version_division; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__camps_v_version_division AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin'
);


ALTER TYPE public.enum__camps_v_version_division OWNER TO postgres;

--
-- Name: enum__camps_v_version_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__camps_v_version_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum__camps_v_version_status OWNER TO postgres;

--
-- Name: enum__info_page_v_version_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__info_page_v_version_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum__info_page_v_version_status OWNER TO postgres;

--
-- Name: enum__inschrijven_page_v_version_practical_info_icon; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__inschrijven_page_v_version_practical_info_icon AS ENUM (
    'calendar',
    'mapPin',
    'euro',
    'shirt'
);


ALTER TYPE public.enum__inschrijven_page_v_version_practical_info_icon OWNER TO postgres;

--
-- Name: enum__inschrijven_page_v_version_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__inschrijven_page_v_version_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum__inschrijven_page_v_version_status OWNER TO postgres;

--
-- Name: enum__inschrijven_page_v_version_why_join_reasons_icon; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__inschrijven_page_v_version_why_join_reasons_icon AS ENUM (
    'users',
    'star',
    'heart',
    'mapPin',
    'calendar',
    'sparkles'
);


ALTER TYPE public.enum__inschrijven_page_v_version_why_join_reasons_icon OWNER TO postgres;

--
-- Name: enum__weekends_v_version_division; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__weekends_v_version_division AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin'
);


ALTER TYPE public.enum__weekends_v_version_division OWNER TO postgres;

--
-- Name: enum__weekends_v_version_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum__weekends_v_version_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum__weekends_v_version_status OWNER TO postgres;

--
-- Name: enum_activiteiten_division; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_activiteiten_division AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin'
);


ALTER TYPE public.enum_activiteiten_division OWNER TO postgres;

--
-- Name: enum_activiteiten_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_activiteiten_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_activiteiten_status OWNER TO postgres;

--
-- Name: enum_camps_division; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_camps_division AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin'
);


ALTER TYPE public.enum_camps_division OWNER TO postgres;

--
-- Name: enum_camps_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_camps_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_camps_status OWNER TO postgres;

--
-- Name: enum_enrollments_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_enrollments_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled',
    'paid'
);


ALTER TYPE public.enum_enrollments_status OWNER TO postgres;

--
-- Name: enum_enrollments_target_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_enrollments_target_type AS ENUM (
    'activiteiten',
    'weekends',
    'camps'
);


ALTER TYPE public.enum_enrollments_target_type OWNER TO postgres;

--
-- Name: enum_info_page_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_info_page_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_info_page_status OWNER TO postgres;

--
-- Name: enum_inschrijven_page_practical_info_icon; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_inschrijven_page_practical_info_icon AS ENUM (
    'calendar',
    'mapPin',
    'euro',
    'shirt'
);


ALTER TYPE public.enum_inschrijven_page_practical_info_icon OWNER TO postgres;

--
-- Name: enum_inschrijven_page_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_inschrijven_page_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_inschrijven_page_status OWNER TO postgres;

--
-- Name: enum_inschrijven_page_why_join_reasons_icon; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_inschrijven_page_why_join_reasons_icon AS ENUM (
    'users',
    'star',
    'heart',
    'mapPin',
    'calendar',
    'sparkles'
);


ALTER TYPE public.enum_inschrijven_page_why_join_reasons_icon OWNER TO postgres;

--
-- Name: enum_leiders_takken; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_leiders_takken AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin',
    'groepsleiding',
    'gestopt'
);


ALTER TYPE public.enum_leiders_takken OWNER TO postgres;

--
-- Name: enum_photo_albums_tak; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_photo_albums_tak AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin',
    'groepsactiviteit'
);


ALTER TYPE public.enum_photo_albums_tak OWNER TO postgres;

--
-- Name: enum_weekends_division; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_weekends_division AS ENUM (
    'kapoenen',
    'wouters',
    'jonggivers',
    'givers',
    'jin'
);


ALTER TYPE public.enum_weekends_division OWNER TO postgres;

--
-- Name: enum_weekends_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_weekends_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_weekends_status OWNER TO postgres;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select nullif(current_setting('request.jwt.claim.email', true), '')::text;
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select nullif(current_setting('request.jwt.claim.role', true), '')::text;
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

    REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
    REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

    GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO postgres;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
DECLARE
_bucketId text;
BEGIN
    -- will be replaced by migrations when server starts
    -- saving space for cloud-init
END
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) OWNER TO supabase_storage_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: _activiteiten_v; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._activiteiten_v (
    id integer NOT NULL,
    parent_id integer,
    version_title character varying,
    version_start_date timestamp(3) with time zone,
    version_end_date timestamp(3) with time zone,
    version_description jsonb,
    version_enrollment_settings_enabled boolean DEFAULT false,
    version_enrollment_settings_closed boolean DEFAULT false,
    version_enrollment_settings_hide_button boolean DEFAULT false,
    version_enrollment_settings_closed_message character varying DEFAULT 'De inschrijvingen voor deze activiteit zijn helaas gesloten.'::character varying,
    version_enrollment_settings_enrollment_link character varying,
    version_enrollment_settings_info_document_id integer,
    version_enrollment_settings_enrollment_deadline timestamp(3) with time zone,
    version_enrollment_settings_custom_message character varying DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.'::character varying,
    version_enrollment_settings_is_paid boolean DEFAULT false,
    version_enrollment_settings_price_per_child numeric,
    version_enrollment_settings_payment_instructions character varying,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__activiteiten_v_version_status DEFAULT 'draft'::public.enum__activiteiten_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean,
    autosave boolean
);


ALTER TABLE public._activiteiten_v OWNER TO postgres;

--
-- Name: _activiteiten_v_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._activiteiten_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._activiteiten_v_id_seq OWNER TO postgres;

--
-- Name: _activiteiten_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._activiteiten_v_id_seq OWNED BY public._activiteiten_v.id;


--
-- Name: _activiteiten_v_version_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._activiteiten_v_version_division (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum__activiteiten_v_version_division,
    id integer NOT NULL
);


ALTER TABLE public._activiteiten_v_version_division OWNER TO postgres;

--
-- Name: _activiteiten_v_version_division_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._activiteiten_v_version_division_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._activiteiten_v_version_division_id_seq OWNER TO postgres;

--
-- Name: _activiteiten_v_version_division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._activiteiten_v_version_division_id_seq OWNED BY public._activiteiten_v_version_division.id;


--
-- Name: _activiteiten_v_version_enrollment_settings_custom_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._activiteiten_v_version_enrollment_settings_custom_questions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    question character varying,
    required boolean DEFAULT false,
    _uuid character varying
);


ALTER TABLE public._activiteiten_v_version_enrollment_settings_custom_questions OWNER TO postgres;

--
-- Name: _activiteiten_v_version_enrollment_settings_custom_quest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq OWNER TO postgres;

--
-- Name: _activiteiten_v_version_enrollment_settings_custom_quest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq OWNED BY public._activiteiten_v_version_enrollment_settings_custom_questions.id;


--
-- Name: _camps_v; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._camps_v (
    id integer NOT NULL,
    parent_id integer,
    version_title character varying,
    version_start_date timestamp(3) with time zone,
    version_end_date timestamp(3) with time zone,
    version_banner_image_id integer,
    version_enrollment_settings_enabled boolean DEFAULT false,
    version_enrollment_settings_closed boolean DEFAULT false,
    version_enrollment_settings_hide_button boolean DEFAULT false,
    version_enrollment_settings_closed_message character varying DEFAULT 'De inschrijvingen voor dit kamp zijn helaas gesloten.'::character varying,
    version_enrollment_settings_enrollment_link character varying,
    version_enrollment_settings_info_document_id integer,
    version_enrollment_settings_enrollment_deadline timestamp(3) with time zone,
    version_enrollment_settings_custom_message character varying DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.'::character varying,
    version_enrollment_settings_is_paid boolean DEFAULT false,
    version_enrollment_settings_price_per_child numeric,
    version_enrollment_settings_payment_instructions character varying,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__camps_v_version_status DEFAULT 'draft'::public.enum__camps_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean,
    autosave boolean
);


ALTER TABLE public._camps_v OWNER TO postgres;

--
-- Name: _camps_v_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._camps_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._camps_v_id_seq OWNER TO postgres;

--
-- Name: _camps_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._camps_v_id_seq OWNED BY public._camps_v.id;


--
-- Name: _camps_v_version_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._camps_v_version_division (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum__camps_v_version_division,
    id integer NOT NULL
);


ALTER TABLE public._camps_v_version_division OWNER TO postgres;

--
-- Name: _camps_v_version_division_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._camps_v_version_division_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._camps_v_version_division_id_seq OWNER TO postgres;

--
-- Name: _camps_v_version_division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._camps_v_version_division_id_seq OWNED BY public._camps_v_version_division.id;


--
-- Name: _camps_v_version_enrollment_settings_custom_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._camps_v_version_enrollment_settings_custom_questions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    question character varying,
    required boolean DEFAULT false,
    _uuid character varying
);


ALTER TABLE public._camps_v_version_enrollment_settings_custom_questions OWNER TO postgres;

--
-- Name: _camps_v_version_enrollment_settings_custom_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._camps_v_version_enrollment_settings_custom_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._camps_v_version_enrollment_settings_custom_questions_id_seq OWNER TO postgres;

--
-- Name: _camps_v_version_enrollment_settings_custom_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._camps_v_version_enrollment_settings_custom_questions_id_seq OWNED BY public._camps_v_version_enrollment_settings_custom_questions.id;


--
-- Name: _info_page_v; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._info_page_v (
    id integer NOT NULL,
    version_title character varying,
    version_intro character varying,
    version_hero_image_id integer,
    version__status public.enum__info_page_v_version_status DEFAULT 'draft'::public.enum__info_page_v_version_status,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean,
    autosave boolean
);


ALTER TABLE public._info_page_v OWNER TO postgres;

--
-- Name: _info_page_v_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._info_page_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._info_page_v_id_seq OWNER TO postgres;

--
-- Name: _info_page_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._info_page_v_id_seq OWNED BY public._info_page_v.id;


--
-- Name: _info_page_v_version_pillars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._info_page_v_version_pillars (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    heading character varying,
    body character varying,
    _uuid character varying
);


ALTER TABLE public._info_page_v_version_pillars OWNER TO postgres;

--
-- Name: _info_page_v_version_pillars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._info_page_v_version_pillars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._info_page_v_version_pillars_id_seq OWNER TO postgres;

--
-- Name: _info_page_v_version_pillars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._info_page_v_version_pillars_id_seq OWNED BY public._info_page_v_version_pillars.id;


--
-- Name: _inschrijven_page_v; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._inschrijven_page_v (
    id integer NOT NULL,
    version_title character varying DEFAULT 'Inschrijven bij Scouts Sint-Johannes'::character varying,
    version_subtitle character varying DEFAULT 'Word lid of hernieuw je inschrijving voor een nieuw jaar vol avonturen!'::character varying,
    version_cta_button_text character varying DEFAULT 'Schrijf je nu in!'::character varying,
    version_cta_button_url character varying DEFAULT 'https://scouts-sint-johannes.stamhoofd.be'::character varying,
    version_cta_subtext character varying DEFAULT 'Via ons online inschrijvingssysteem Stamhoofd'::character varying,
    version_why_join_title character varying DEFAULT 'Waarom lid worden/blijven?'::character varying,
    version_existing_members_section_title character varying DEFAULT 'Lid worden'::character varying,
    version_existing_members_section_content character varying DEFAULT 'Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?

Ieder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.
Bij het tabblad ''''agenda/ratel'''' vind je steeds terug waar en wanneer er vergadering plaatsvindt.'::character varying,
    version_existing_members_section_info_box_title character varying DEFAULT 'Hoe schrijf ik mijn kind in?'::character varying,
    version_existing_members_section_info_box_content character varying DEFAULT 'Leden die vorig jaar al ingeschreven waren kunnen zich inloggen op de website van stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kun je de gegevens van het lid controleren. Wanneer je het lidgeld betaald hebt, is je kind ingeschreven. Zijn er binnen je gezin nieuwe leden? Dan klik je bij ''''inschrijven'''' ''''nieuw lid toevoegen''''.

Nieuwe leden maken een account aan op stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kom je terecht op de pagina waar je je zoon/dochter kunt inschrijven met zijn/haar gegevens. Je kunt meerdere kinderen inschrijven onder hetzelfde account. Wanneer dat gebeurt is, ga je naar het tabblad ''''afrekeningen''''. Daar zie je onderaan de pagina hoeveel je moet overschrijven naar het juiste rekeningnummer. Dat blijft even staan totdat wij de betaling goedkeurden, wat soms eventjes kan duren. Bij vragen kun je oms steeds bereiken via groepsleiding@scoutssintjohannes.be.

Hoeveel bedraagt het lidgeld?

Het lidgeld bedraagt 45 euro per kind.
Vanaf 3 kinderen ingeschreven in de scouts bedraagt het 35 euro per kind.
Het lidgeld is voor de verzekering die vanuit Scouts en Gidsen Vlaanderen gevraagd wordt.

Er is ook een mogelijkheid voor verminderd lidgeld. We willen ieder kind de kans geven om lid te worden van scouting. Geld mag daarbij geen rol spelen. Voor wie het financieel wat moeilijker is, bestaat het verminderd lidgeld. Je betaalt dan 15 euro lidgeld.'::character varying,
    version_divisions_title character varying DEFAULT 'Onze takken'::character varying,
    version_divisions_subtitle character varying DEFAULT 'Bij de scouts is er voor elke leeftijd een aangepast programma. Ontdek welke tak bij jouw leeftijd past!'::character varying,
    version_practical_info_title character varying DEFAULT 'Praktische informatie'::character varying,
    version_final_cta_section_title character varying DEFAULT 'Klaar voor een nieuw scoutsjaar?'::character varying,
    version_final_cta_section_content character varying DEFAULT 'Nieuwe leden: word deel van onze scouts familie!
Bestaande leden: hernieuw je inschrijving voor het komende jaar!'::character varying,
    version_final_cta_section_button_text character varying DEFAULT 'Start je inschrijving hier!'::character varying,
    version__status public.enum__inschrijven_page_v_version_status DEFAULT 'draft'::public.enum__inschrijven_page_v_version_status,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean,
    autosave boolean
);


ALTER TABLE public._inschrijven_page_v OWNER TO postgres;

--
-- Name: _inschrijven_page_v_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._inschrijven_page_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._inschrijven_page_v_id_seq OWNER TO postgres;

--
-- Name: _inschrijven_page_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._inschrijven_page_v_id_seq OWNED BY public._inschrijven_page_v.id;


--
-- Name: _inschrijven_page_v_version_practical_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._inschrijven_page_v_version_practical_info (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon public.enum__inschrijven_page_v_version_practical_info_icon,
    title character varying,
    content character varying,
    _uuid character varying
);


ALTER TABLE public._inschrijven_page_v_version_practical_info OWNER TO postgres;

--
-- Name: _inschrijven_page_v_version_practical_info_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._inschrijven_page_v_version_practical_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._inschrijven_page_v_version_practical_info_id_seq OWNER TO postgres;

--
-- Name: _inschrijven_page_v_version_practical_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._inschrijven_page_v_version_practical_info_id_seq OWNED BY public._inschrijven_page_v_version_practical_info.id;


--
-- Name: _inschrijven_page_v_version_why_join_reasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._inschrijven_page_v_version_why_join_reasons (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon public.enum__inschrijven_page_v_version_why_join_reasons_icon,
    title character varying,
    description character varying,
    _uuid character varying
);


ALTER TABLE public._inschrijven_page_v_version_why_join_reasons OWNER TO postgres;

--
-- Name: _inschrijven_page_v_version_why_join_reasons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._inschrijven_page_v_version_why_join_reasons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._inschrijven_page_v_version_why_join_reasons_id_seq OWNER TO postgres;

--
-- Name: _inschrijven_page_v_version_why_join_reasons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._inschrijven_page_v_version_why_join_reasons_id_seq OWNED BY public._inschrijven_page_v_version_why_join_reasons.id;


--
-- Name: _weekends_v; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._weekends_v (
    id integer NOT NULL,
    parent_id integer,
    version_title character varying,
    version_start_date timestamp(3) with time zone,
    version_end_date timestamp(3) with time zone,
    version_banner_image_id integer,
    version_enrollment_settings_enabled boolean DEFAULT false,
    version_enrollment_settings_closed boolean DEFAULT false,
    version_enrollment_settings_hide_button boolean DEFAULT false,
    version_enrollment_settings_closed_message character varying DEFAULT 'De inschrijvingen voor dit weekend zijn helaas gesloten.'::character varying,
    version_enrollment_settings_enrollment_link character varying,
    version_enrollment_settings_info_document_id integer,
    version_enrollment_settings_enrollment_deadline timestamp(3) with time zone,
    version_enrollment_settings_custom_message character varying DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.'::character varying,
    version_enrollment_settings_is_paid boolean DEFAULT false,
    version_enrollment_settings_price_per_child numeric,
    version_enrollment_settings_payment_instructions character varying,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__weekends_v_version_status DEFAULT 'draft'::public.enum__weekends_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean,
    autosave boolean
);


ALTER TABLE public._weekends_v OWNER TO postgres;

--
-- Name: _weekends_v_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._weekends_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._weekends_v_id_seq OWNER TO postgres;

--
-- Name: _weekends_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._weekends_v_id_seq OWNED BY public._weekends_v.id;


--
-- Name: _weekends_v_version_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._weekends_v_version_division (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum__weekends_v_version_division,
    id integer NOT NULL
);


ALTER TABLE public._weekends_v_version_division OWNER TO postgres;

--
-- Name: _weekends_v_version_division_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._weekends_v_version_division_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._weekends_v_version_division_id_seq OWNER TO postgres;

--
-- Name: _weekends_v_version_division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._weekends_v_version_division_id_seq OWNED BY public._weekends_v_version_division.id;


--
-- Name: _weekends_v_version_enrollment_settings_custom_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._weekends_v_version_enrollment_settings_custom_questions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    question character varying,
    required boolean DEFAULT false,
    _uuid character varying
);


ALTER TABLE public._weekends_v_version_enrollment_settings_custom_questions OWNER TO postgres;

--
-- Name: _weekends_v_version_enrollment_settings_custom_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._weekends_v_version_enrollment_settings_custom_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._weekends_v_version_enrollment_settings_custom_questions_id_seq OWNER TO postgres;

--
-- Name: _weekends_v_version_enrollment_settings_custom_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._weekends_v_version_enrollment_settings_custom_questions_id_seq OWNED BY public._weekends_v_version_enrollment_settings_custom_questions.id;


--
-- Name: activiteiten; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activiteiten (
    id integer NOT NULL,
    title character varying,
    start_date timestamp(3) with time zone,
    end_date timestamp(3) with time zone,
    description jsonb,
    enrollment_settings_enabled boolean DEFAULT false,
    enrollment_settings_closed boolean DEFAULT false,
    enrollment_settings_hide_button boolean DEFAULT false,
    enrollment_settings_closed_message character varying DEFAULT 'De inschrijvingen voor deze activiteit zijn helaas gesloten.'::character varying,
    enrollment_settings_enrollment_link character varying,
    enrollment_settings_info_document_id integer,
    enrollment_settings_enrollment_deadline timestamp(3) with time zone,
    enrollment_settings_custom_message character varying DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.'::character varying,
    enrollment_settings_is_paid boolean DEFAULT false,
    enrollment_settings_price_per_child numeric,
    enrollment_settings_payment_instructions character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_activiteiten_status DEFAULT 'draft'::public.enum_activiteiten_status
);


ALTER TABLE public.activiteiten OWNER TO postgres;

--
-- Name: activiteiten_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activiteiten_division (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum_activiteiten_division,
    id integer NOT NULL
);


ALTER TABLE public.activiteiten_division OWNER TO postgres;

--
-- Name: activiteiten_division_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activiteiten_division_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activiteiten_division_id_seq OWNER TO postgres;

--
-- Name: activiteiten_division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activiteiten_division_id_seq OWNED BY public.activiteiten_division.id;


--
-- Name: activiteiten_enrollment_settings_custom_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activiteiten_enrollment_settings_custom_questions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    question character varying,
    required boolean DEFAULT false
);


ALTER TABLE public.activiteiten_enrollment_settings_custom_questions OWNER TO postgres;

--
-- Name: activiteiten_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activiteiten_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activiteiten_id_seq OWNER TO postgres;

--
-- Name: activiteiten_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activiteiten_id_seq OWNED BY public.activiteiten.id;


--
-- Name: banner_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banner_images (
    id integer NOT NULL,
    name character varying NOT NULL,
    alt character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric,
    sizes_card_url character varying,
    sizes_card_width numeric,
    sizes_card_height numeric,
    sizes_card_mime_type character varying,
    sizes_card_filesize numeric,
    sizes_card_filename character varying,
    sizes_thumbnail_url character varying,
    sizes_thumbnail_width numeric,
    sizes_thumbnail_height numeric,
    sizes_thumbnail_mime_type character varying,
    sizes_thumbnail_filesize numeric,
    sizes_thumbnail_filename character varying
);


ALTER TABLE public.banner_images OWNER TO postgres;

--
-- Name: banner_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banner_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banner_images_id_seq OWNER TO postgres;

--
-- Name: banner_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banner_images_id_seq OWNED BY public.banner_images.id;


--
-- Name: camps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.camps (
    id integer NOT NULL,
    title character varying,
    start_date timestamp(3) with time zone,
    end_date timestamp(3) with time zone,
    banner_image_id integer,
    enrollment_settings_enabled boolean DEFAULT false,
    enrollment_settings_closed boolean DEFAULT false,
    enrollment_settings_hide_button boolean DEFAULT false,
    enrollment_settings_closed_message character varying DEFAULT 'De inschrijvingen voor dit kamp zijn helaas gesloten.'::character varying,
    enrollment_settings_enrollment_link character varying,
    enrollment_settings_info_document_id integer,
    enrollment_settings_enrollment_deadline timestamp(3) with time zone,
    enrollment_settings_custom_message character varying DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.'::character varying,
    enrollment_settings_is_paid boolean DEFAULT false,
    enrollment_settings_price_per_child numeric,
    enrollment_settings_payment_instructions character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_camps_status DEFAULT 'draft'::public.enum_camps_status
);


ALTER TABLE public.camps OWNER TO postgres;

--
-- Name: camps_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.camps_division (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum_camps_division,
    id integer NOT NULL
);


ALTER TABLE public.camps_division OWNER TO postgres;

--
-- Name: camps_division_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.camps_division_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.camps_division_id_seq OWNER TO postgres;

--
-- Name: camps_division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.camps_division_id_seq OWNED BY public.camps_division.id;


--
-- Name: camps_enrollment_settings_custom_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.camps_enrollment_settings_custom_questions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    question character varying,
    required boolean DEFAULT false
);


ALTER TABLE public.camps_enrollment_settings_custom_questions OWNER TO postgres;

--
-- Name: camps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.camps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.camps_id_seq OWNER TO postgres;

--
-- Name: camps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.camps_id_seq OWNED BY public.camps.id;


--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments (
    id integer NOT NULL,
    participant_email character varying,
    target_type public.enum_enrollments_target_type NOT NULL,
    target_id character varying NOT NULL,
    target_title character varying,
    number_of_children numeric DEFAULT 1,
    contact_info_email character varying NOT NULL,
    additional_options_comments character varying,
    additional_options_custom_answers jsonb,
    total_price numeric,
    submitted_at timestamp(3) with time zone,
    status public.enum_enrollments_status DEFAULT 'pending'::public.enum_enrollments_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.enrollments OWNER TO postgres;

--
-- Name: enrollments_children; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments_children (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    participant_info_first_name character varying NOT NULL,
    participant_info_last_name character varying NOT NULL
);


ALTER TABLE public.enrollments_children OWNER TO postgres;

--
-- Name: enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrollments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrollments_id_seq OWNER TO postgres;

--
-- Name: enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrollments_id_seq OWNED BY public.enrollments.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying NOT NULL,
    start_date timestamp(3) with time zone NOT NULL,
    end_date timestamp(3) with time zone,
    description jsonb,
    button_text character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: homepage_hero_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homepage_hero_images (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.homepage_hero_images OWNER TO postgres;

--
-- Name: homepage_hero_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.homepage_hero_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.homepage_hero_images_id_seq OWNER TO postgres;

--
-- Name: homepage_hero_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.homepage_hero_images_id_seq OWNED BY public.homepage_hero_images.id;


--
-- Name: homepage_heros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homepage_heros (
    id integer NOT NULL,
    name character varying NOT NULL,
    presence numeric NOT NULL,
    home_hero_image_id integer NOT NULL,
    title character varying,
    description character varying,
    button_text character varying,
    button_link character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.homepage_heros OWNER TO postgres;

--
-- Name: homepage_heros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.homepage_heros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.homepage_heros_id_seq OWNER TO postgres;

--
-- Name: homepage_heros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.homepage_heros_id_seq OWNED BY public.homepage_heros.id;


--
-- Name: info_page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.info_page (
    id integer NOT NULL,
    title character varying,
    intro character varying,
    hero_image_id integer,
    _status public.enum_info_page_status DEFAULT 'draft'::public.enum_info_page_status,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.info_page OWNER TO postgres;

--
-- Name: info_page_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.info_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.info_page_id_seq OWNER TO postgres;

--
-- Name: info_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.info_page_id_seq OWNED BY public.info_page.id;


--
-- Name: info_page_pillars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.info_page_pillars (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    heading character varying,
    body character varying
);


ALTER TABLE public.info_page_pillars OWNER TO postgres;

--
-- Name: inschrijven_page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inschrijven_page (
    id integer NOT NULL,
    title character varying DEFAULT 'Inschrijven bij Scouts Sint-Johannes'::character varying,
    subtitle character varying DEFAULT 'Word lid of hernieuw je inschrijving voor een nieuw jaar vol avonturen!'::character varying,
    cta_button_text character varying DEFAULT 'Schrijf je nu in!'::character varying,
    cta_button_url character varying DEFAULT 'https://scouts-sint-johannes.stamhoofd.be'::character varying,
    cta_subtext character varying DEFAULT 'Via ons online inschrijvingssysteem Stamhoofd'::character varying,
    why_join_title character varying DEFAULT 'Waarom lid worden/blijven?'::character varying,
    existing_members_section_title character varying DEFAULT 'Lid worden'::character varying,
    existing_members_section_content character varying DEFAULT 'Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?

Ieder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.
Bij het tabblad ''''agenda/ratel'''' vind je steeds terug waar en wanneer er vergadering plaatsvindt.'::character varying,
    existing_members_section_info_box_title character varying DEFAULT 'Hoe schrijf ik mijn kind in?'::character varying,
    existing_members_section_info_box_content character varying DEFAULT 'Leden die vorig jaar al ingeschreven waren kunnen zich inloggen op de website van stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kun je de gegevens van het lid controleren. Wanneer je het lidgeld betaald hebt, is je kind ingeschreven. Zijn er binnen je gezin nieuwe leden? Dan klik je bij ''''inschrijven'''' ''''nieuw lid toevoegen''''.

Nieuwe leden maken een account aan op stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kom je terecht op de pagina waar je je zoon/dochter kunt inschrijven met zijn/haar gegevens. Je kunt meerdere kinderen inschrijven onder hetzelfde account. Wanneer dat gebeurt is, ga je naar het tabblad ''''afrekeningen''''. Daar zie je onderaan de pagina hoeveel je moet overschrijven naar het juiste rekeningnummer. Dat blijft even staan totdat wij de betaling goedkeurden, wat soms eventjes kan duren. Bij vragen kun je oms steeds bereiken via groepsleiding@scoutssintjohannes.be.

Hoeveel bedraagt het lidgeld?

Het lidgeld bedraagt 45 euro per kind.
Vanaf 3 kinderen ingeschreven in de scouts bedraagt het 35 euro per kind.
Het lidgeld is voor de verzekering die vanuit Scouts en Gidsen Vlaanderen gevraagd wordt.

Er is ook een mogelijkheid voor verminderd lidgeld. We willen ieder kind de kans geven om lid te worden van scouting. Geld mag daarbij geen rol spelen. Voor wie het financieel wat moeilijker is, bestaat het verminderd lidgeld. Je betaalt dan 15 euro lidgeld.'::character varying,
    divisions_title character varying DEFAULT 'Onze takken'::character varying,
    divisions_subtitle character varying DEFAULT 'Bij de scouts is er voor elke leeftijd een aangepast programma. Ontdek welke tak bij jouw leeftijd past!'::character varying,
    practical_info_title character varying DEFAULT 'Praktische informatie'::character varying,
    final_cta_section_title character varying DEFAULT 'Klaar voor een nieuw scoutsjaar?'::character varying,
    final_cta_section_content character varying DEFAULT 'Nieuwe leden: word deel van onze scouts familie!
Bestaande leden: hernieuw je inschrijving voor het komende jaar!'::character varying,
    final_cta_section_button_text character varying DEFAULT 'Start je inschrijving hier!'::character varying,
    _status public.enum_inschrijven_page_status DEFAULT 'draft'::public.enum_inschrijven_page_status,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.inschrijven_page OWNER TO postgres;

--
-- Name: inschrijven_page_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inschrijven_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inschrijven_page_id_seq OWNER TO postgres;

--
-- Name: inschrijven_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inschrijven_page_id_seq OWNED BY public.inschrijven_page.id;


--
-- Name: inschrijven_page_practical_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inschrijven_page_practical_info (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    icon public.enum_inschrijven_page_practical_info_icon,
    title character varying,
    content character varying
);


ALTER TABLE public.inschrijven_page_practical_info OWNER TO postgres;

--
-- Name: inschrijven_page_why_join_reasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inschrijven_page_why_join_reasons (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    icon public.enum_inschrijven_page_why_join_reasons_icon,
    title character varying,
    description character varying
);


ALTER TABLE public.inschrijven_page_why_join_reasons OWNER TO postgres;

--
-- Name: leiders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leiders (
    id integer NOT NULL,
    name character varying NOT NULL,
    year numeric NOT NULL,
    stop_year numeric,
    totem character varying,
    totem_beschrijving character varying,
    description character varying,
    image_id integer,
    phone_number character varying NOT NULL,
    email character varying NOT NULL,
    kapoenen_naam character varying,
    wouter_naam character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.leiders OWNER TO postgres;

--
-- Name: leiders_foto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leiders_foto (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.leiders_foto OWNER TO postgres;

--
-- Name: leiders_foto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leiders_foto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leiders_foto_id_seq OWNER TO postgres;

--
-- Name: leiders_foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leiders_foto_id_seq OWNED BY public.leiders_foto.id;


--
-- Name: leiders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leiders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leiders_id_seq OWNER TO postgres;

--
-- Name: leiders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leiders_id_seq OWNED BY public.leiders.id;


--
-- Name: leiders_takken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leiders_takken (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum_leiders_takken,
    id integer NOT NULL
);


ALTER TABLE public.leiders_takken OWNER TO postgres;

--
-- Name: leiders_takken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leiders_takken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leiders_takken_id_seq OWNER TO postgres;

--
-- Name: leiders_takken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leiders_takken_id_seq OWNED BY public.leiders_takken.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_id_seq OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_locked_documents_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    media_id integer,
    banner_images_id integer,
    activiteiten_id integer,
    leiders_id integer,
    leiders_foto_id integer,
    random_afbeeldingen_id integer,
    homepage_hero_images_id integer,
    homepage_heros_id integer,
    events_id integer,
    weekends_id integer,
    camps_id integer,
    enrollments_id integer,
    users_id integer,
    photo_albums_id integer
);


ALTER TABLE public.payload_locked_documents_rels OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_locked_documents_rels_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_migrations_id_seq OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_preferences_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_preferences_rels_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: photo_albums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photo_albums (
    id integer NOT NULL,
    name character varying NOT NULL,
    year numeric NOT NULL,
    tak public.enum_photo_albums_tak NOT NULL,
    link character varying NOT NULL,
    cover_image_id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    location character varying
);


ALTER TABLE public.photo_albums OWNER TO postgres;

--
-- Name: photo_albums_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.photo_albums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photo_albums_id_seq OWNER TO postgres;

--
-- Name: photo_albums_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photo_albums_id_seq OWNED BY public.photo_albums.id;


--
-- Name: random_afbeeldingen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.random_afbeeldingen (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.random_afbeeldingen OWNER TO postgres;

--
-- Name: random_afbeeldingen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.random_afbeeldingen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.random_afbeeldingen_id_seq OWNER TO postgres;

--
-- Name: random_afbeeldingen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.random_afbeeldingen_id_seq OWNED BY public.random_afbeeldingen.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: weekends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.weekends (
    id integer NOT NULL,
    title character varying,
    start_date timestamp(3) with time zone,
    end_date timestamp(3) with time zone,
    banner_image_id integer,
    enrollment_settings_enabled boolean DEFAULT false,
    enrollment_settings_closed boolean DEFAULT false,
    enrollment_settings_hide_button boolean DEFAULT false,
    enrollment_settings_closed_message character varying DEFAULT 'De inschrijvingen voor dit weekend zijn helaas gesloten.'::character varying,
    enrollment_settings_enrollment_link character varying,
    enrollment_settings_info_document_id integer,
    enrollment_settings_enrollment_deadline timestamp(3) with time zone,
    enrollment_settings_custom_message character varying DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.'::character varying,
    enrollment_settings_is_paid boolean DEFAULT false,
    enrollment_settings_price_per_child numeric,
    enrollment_settings_payment_instructions character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_weekends_status DEFAULT 'draft'::public.enum_weekends_status
);


ALTER TABLE public.weekends OWNER TO postgres;

--
-- Name: weekends_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.weekends_division (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum_weekends_division,
    id integer NOT NULL
);


ALTER TABLE public.weekends_division OWNER TO postgres;

--
-- Name: weekends_division_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.weekends_division_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.weekends_division_id_seq OWNER TO postgres;

--
-- Name: weekends_division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.weekends_division_id_seq OWNED BY public.weekends_division.id;


--
-- Name: weekends_enrollment_settings_custom_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.weekends_enrollment_settings_custom_questions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    question character varying,
    required boolean DEFAULT false
);


ALTER TABLE public.weekends_enrollment_settings_custom_questions OWNER TO postgres;

--
-- Name: weekends_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.weekends_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.weekends_id_seq OWNER TO postgres;

--
-- Name: weekends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.weekends_id_seq OWNED BY public.weekends.id;


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: supabase_admin
--

CREATE VIEW vault.decrypted_secrets AS
 SELECT secrets.id,
    secrets.name,
    secrets.description,
    secrets.secret,
        CASE
            WHEN (secrets.secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (secrets.key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secrets.secret, 'base64'::text), convert_to(((((secrets.id)::text || secrets.description) || (secrets.created_at)::text) || (secrets.updated_at)::text), 'utf8'::name), secrets.key_id, secrets.nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    secrets.key_id,
    secrets.nonce,
    secrets.created_at,
    secrets.updated_at
   FROM vault.secrets;


ALTER TABLE vault.decrypted_secrets OWNER TO supabase_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: _activiteiten_v id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v ALTER COLUMN id SET DEFAULT nextval('public._activiteiten_v_id_seq'::regclass);


--
-- Name: _activiteiten_v_version_division id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v_version_division ALTER COLUMN id SET DEFAULT nextval('public._activiteiten_v_version_division_id_seq'::regclass);


--
-- Name: _activiteiten_v_version_enrollment_settings_custom_questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v_version_enrollment_settings_custom_questions ALTER COLUMN id SET DEFAULT nextval('public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq'::regclass);


--
-- Name: _camps_v id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v ALTER COLUMN id SET DEFAULT nextval('public._camps_v_id_seq'::regclass);


--
-- Name: _camps_v_version_division id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v_version_division ALTER COLUMN id SET DEFAULT nextval('public._camps_v_version_division_id_seq'::regclass);


--
-- Name: _camps_v_version_enrollment_settings_custom_questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v_version_enrollment_settings_custom_questions ALTER COLUMN id SET DEFAULT nextval('public._camps_v_version_enrollment_settings_custom_questions_id_seq'::regclass);


--
-- Name: _info_page_v id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._info_page_v ALTER COLUMN id SET DEFAULT nextval('public._info_page_v_id_seq'::regclass);


--
-- Name: _info_page_v_version_pillars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._info_page_v_version_pillars ALTER COLUMN id SET DEFAULT nextval('public._info_page_v_version_pillars_id_seq'::regclass);


--
-- Name: _inschrijven_page_v id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v ALTER COLUMN id SET DEFAULT nextval('public._inschrijven_page_v_id_seq'::regclass);


--
-- Name: _inschrijven_page_v_version_practical_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v_version_practical_info ALTER COLUMN id SET DEFAULT nextval('public._inschrijven_page_v_version_practical_info_id_seq'::regclass);


--
-- Name: _inschrijven_page_v_version_why_join_reasons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v_version_why_join_reasons ALTER COLUMN id SET DEFAULT nextval('public._inschrijven_page_v_version_why_join_reasons_id_seq'::regclass);


--
-- Name: _weekends_v id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v ALTER COLUMN id SET DEFAULT nextval('public._weekends_v_id_seq'::regclass);


--
-- Name: _weekends_v_version_division id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v_version_division ALTER COLUMN id SET DEFAULT nextval('public._weekends_v_version_division_id_seq'::regclass);


--
-- Name: _weekends_v_version_enrollment_settings_custom_questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v_version_enrollment_settings_custom_questions ALTER COLUMN id SET DEFAULT nextval('public._weekends_v_version_enrollment_settings_custom_questions_id_seq'::regclass);


--
-- Name: activiteiten id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten ALTER COLUMN id SET DEFAULT nextval('public.activiteiten_id_seq'::regclass);


--
-- Name: activiteiten_division id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten_division ALTER COLUMN id SET DEFAULT nextval('public.activiteiten_division_id_seq'::regclass);


--
-- Name: banner_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banner_images ALTER COLUMN id SET DEFAULT nextval('public.banner_images_id_seq'::regclass);


--
-- Name: camps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps ALTER COLUMN id SET DEFAULT nextval('public.camps_id_seq'::regclass);


--
-- Name: camps_division id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps_division ALTER COLUMN id SET DEFAULT nextval('public.camps_division_id_seq'::regclass);


--
-- Name: enrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN id SET DEFAULT nextval('public.enrollments_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: homepage_hero_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_hero_images ALTER COLUMN id SET DEFAULT nextval('public.homepage_hero_images_id_seq'::regclass);


--
-- Name: homepage_heros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_heros ALTER COLUMN id SET DEFAULT nextval('public.homepage_heros_id_seq'::regclass);


--
-- Name: info_page id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.info_page ALTER COLUMN id SET DEFAULT nextval('public.info_page_id_seq'::regclass);


--
-- Name: inschrijven_page id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inschrijven_page ALTER COLUMN id SET DEFAULT nextval('public.inschrijven_page_id_seq'::regclass);


--
-- Name: leiders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders ALTER COLUMN id SET DEFAULT nextval('public.leiders_id_seq'::regclass);


--
-- Name: leiders_foto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders_foto ALTER COLUMN id SET DEFAULT nextval('public.leiders_foto_id_seq'::regclass);


--
-- Name: leiders_takken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders_takken ALTER COLUMN id SET DEFAULT nextval('public.leiders_takken_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: photo_albums id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo_albums ALTER COLUMN id SET DEFAULT nextval('public.photo_albums_id_seq'::regclass);


--
-- Name: random_afbeeldingen id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.random_afbeeldingen ALTER COLUMN id SET DEFAULT nextval('public.random_afbeeldingen_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: weekends id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends ALTER COLUMN id SET DEFAULT nextval('public.weekends_id_seq'::regclass);


--
-- Name: weekends_division id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends_division ALTER COLUMN id SET DEFAULT nextval('public.weekends_division_id_seq'::regclass);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: _activiteiten_v _activiteiten_v_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v
    ADD CONSTRAINT _activiteiten_v_pkey PRIMARY KEY (id);


--
-- Name: _activiteiten_v_version_division _activiteiten_v_version_division_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v_version_division
    ADD CONSTRAINT _activiteiten_v_version_division_pkey PRIMARY KEY (id);


--
-- Name: _activiteiten_v_version_enrollment_settings_custom_questions _activiteiten_v_version_enrollment_settings_custom_questio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v_version_enrollment_settings_custom_questions
    ADD CONSTRAINT _activiteiten_v_version_enrollment_settings_custom_questio_pkey PRIMARY KEY (id);


--
-- Name: _camps_v _camps_v_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v
    ADD CONSTRAINT _camps_v_pkey PRIMARY KEY (id);


--
-- Name: _camps_v_version_division _camps_v_version_division_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v_version_division
    ADD CONSTRAINT _camps_v_version_division_pkey PRIMARY KEY (id);


--
-- Name: _camps_v_version_enrollment_settings_custom_questions _camps_v_version_enrollment_settings_custom_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v_version_enrollment_settings_custom_questions
    ADD CONSTRAINT _camps_v_version_enrollment_settings_custom_questions_pkey PRIMARY KEY (id);


--
-- Name: _info_page_v _info_page_v_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._info_page_v
    ADD CONSTRAINT _info_page_v_pkey PRIMARY KEY (id);


--
-- Name: _info_page_v_version_pillars _info_page_v_version_pillars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._info_page_v_version_pillars
    ADD CONSTRAINT _info_page_v_version_pillars_pkey PRIMARY KEY (id);


--
-- Name: _inschrijven_page_v _inschrijven_page_v_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v
    ADD CONSTRAINT _inschrijven_page_v_pkey PRIMARY KEY (id);


--
-- Name: _inschrijven_page_v_version_practical_info _inschrijven_page_v_version_practical_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v_version_practical_info
    ADD CONSTRAINT _inschrijven_page_v_version_practical_info_pkey PRIMARY KEY (id);


--
-- Name: _inschrijven_page_v_version_why_join_reasons _inschrijven_page_v_version_why_join_reasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v_version_why_join_reasons
    ADD CONSTRAINT _inschrijven_page_v_version_why_join_reasons_pkey PRIMARY KEY (id);


--
-- Name: _weekends_v _weekends_v_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v
    ADD CONSTRAINT _weekends_v_pkey PRIMARY KEY (id);


--
-- Name: _weekends_v_version_division _weekends_v_version_division_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v_version_division
    ADD CONSTRAINT _weekends_v_version_division_pkey PRIMARY KEY (id);


--
-- Name: _weekends_v_version_enrollment_settings_custom_questions _weekends_v_version_enrollment_settings_custom_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v_version_enrollment_settings_custom_questions
    ADD CONSTRAINT _weekends_v_version_enrollment_settings_custom_questions_pkey PRIMARY KEY (id);


--
-- Name: activiteiten_division activiteiten_division_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten_division
    ADD CONSTRAINT activiteiten_division_pkey PRIMARY KEY (id);


--
-- Name: activiteiten_enrollment_settings_custom_questions activiteiten_enrollment_settings_custom_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten_enrollment_settings_custom_questions
    ADD CONSTRAINT activiteiten_enrollment_settings_custom_questions_pkey PRIMARY KEY (id);


--
-- Name: activiteiten activiteiten_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten
    ADD CONSTRAINT activiteiten_pkey PRIMARY KEY (id);


--
-- Name: banner_images banner_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banner_images
    ADD CONSTRAINT banner_images_pkey PRIMARY KEY (id);


--
-- Name: camps_division camps_division_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps_division
    ADD CONSTRAINT camps_division_pkey PRIMARY KEY (id);


--
-- Name: camps_enrollment_settings_custom_questions camps_enrollment_settings_custom_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps_enrollment_settings_custom_questions
    ADD CONSTRAINT camps_enrollment_settings_custom_questions_pkey PRIMARY KEY (id);


--
-- Name: camps camps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps
    ADD CONSTRAINT camps_pkey PRIMARY KEY (id);


--
-- Name: enrollments_children enrollments_children_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments_children
    ADD CONSTRAINT enrollments_children_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: homepage_hero_images homepage_hero_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_hero_images
    ADD CONSTRAINT homepage_hero_images_pkey PRIMARY KEY (id);


--
-- Name: homepage_heros homepage_heros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_heros
    ADD CONSTRAINT homepage_heros_pkey PRIMARY KEY (id);


--
-- Name: info_page_pillars info_page_pillars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.info_page_pillars
    ADD CONSTRAINT info_page_pillars_pkey PRIMARY KEY (id);


--
-- Name: info_page info_page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.info_page
    ADD CONSTRAINT info_page_pkey PRIMARY KEY (id);


--
-- Name: inschrijven_page inschrijven_page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inschrijven_page
    ADD CONSTRAINT inschrijven_page_pkey PRIMARY KEY (id);


--
-- Name: inschrijven_page_practical_info inschrijven_page_practical_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inschrijven_page_practical_info
    ADD CONSTRAINT inschrijven_page_practical_info_pkey PRIMARY KEY (id);


--
-- Name: inschrijven_page_why_join_reasons inschrijven_page_why_join_reasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inschrijven_page_why_join_reasons
    ADD CONSTRAINT inschrijven_page_why_join_reasons_pkey PRIMARY KEY (id);


--
-- Name: leiders_foto leiders_foto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders_foto
    ADD CONSTRAINT leiders_foto_pkey PRIMARY KEY (id);


--
-- Name: leiders leiders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders
    ADD CONSTRAINT leiders_pkey PRIMARY KEY (id);


--
-- Name: leiders_takken leiders_takken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders_takken
    ADD CONSTRAINT leiders_takken_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: photo_albums photo_albums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo_albums
    ADD CONSTRAINT photo_albums_pkey PRIMARY KEY (id);


--
-- Name: random_afbeeldingen random_afbeeldingen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.random_afbeeldingen
    ADD CONSTRAINT random_afbeeldingen_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: weekends_division weekends_division_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends_division
    ADD CONSTRAINT weekends_division_pkey PRIMARY KEY (id);


--
-- Name: weekends_enrollment_settings_custom_questions weekends_enrollment_settings_custom_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends_enrollment_settings_custom_questions
    ADD CONSTRAINT weekends_enrollment_settings_custom_questions_pkey PRIMARY KEY (id);


--
-- Name: weekends weekends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends
    ADD CONSTRAINT weekends_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_token_idx ON auth.refresh_tokens USING btree (token);


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, email);


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: _activiteiten_v_autosave_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_autosave_idx ON public._activiteiten_v USING btree (autosave);


--
-- Name: _activiteiten_v_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_created_at_idx ON public._activiteiten_v USING btree (created_at);


--
-- Name: _activiteiten_v_latest_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_latest_idx ON public._activiteiten_v USING btree (latest);


--
-- Name: _activiteiten_v_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_parent_idx ON public._activiteiten_v USING btree (parent_id);


--
-- Name: _activiteiten_v_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_updated_at_idx ON public._activiteiten_v USING btree (updated_at);


--
-- Name: _activiteiten_v_version_division_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_division_order_idx ON public._activiteiten_v_version_division USING btree ("order");


--
-- Name: _activiteiten_v_version_division_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_division_parent_idx ON public._activiteiten_v_version_division USING btree (parent_id);


--
-- Name: _activiteiten_v_version_enrollment_settings_custom_questions_or; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_enrollment_settings_custom_questions_or ON public._activiteiten_v_version_enrollment_settings_custom_questions USING btree (_order);


--
-- Name: _activiteiten_v_version_enrollment_settings_custom_questions_pa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_enrollment_settings_custom_questions_pa ON public._activiteiten_v_version_enrollment_settings_custom_questions USING btree (_parent_id);


--
-- Name: _activiteiten_v_version_enrollment_settings_version_enrollment_; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_enrollment_settings_version_enrollment_ ON public._activiteiten_v USING btree (version_enrollment_settings_info_document_id);


--
-- Name: _activiteiten_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_version__status_idx ON public._activiteiten_v USING btree (version__status);


--
-- Name: _activiteiten_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_version_created_at_idx ON public._activiteiten_v USING btree (version_created_at);


--
-- Name: _activiteiten_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _activiteiten_v_version_version_updated_at_idx ON public._activiteiten_v USING btree (version_updated_at);


--
-- Name: _camps_v_autosave_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_autosave_idx ON public._camps_v USING btree (autosave);


--
-- Name: _camps_v_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_created_at_idx ON public._camps_v USING btree (created_at);


--
-- Name: _camps_v_latest_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_latest_idx ON public._camps_v USING btree (latest);


--
-- Name: _camps_v_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_parent_idx ON public._camps_v USING btree (parent_id);


--
-- Name: _camps_v_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_updated_at_idx ON public._camps_v USING btree (updated_at);


--
-- Name: _camps_v_version_division_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_division_order_idx ON public._camps_v_version_division USING btree ("order");


--
-- Name: _camps_v_version_division_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_division_parent_idx ON public._camps_v_version_division USING btree (parent_id);


--
-- Name: _camps_v_version_enrollment_settings_custom_questions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_enrollment_settings_custom_questions_order_idx ON public._camps_v_version_enrollment_settings_custom_questions USING btree (_order);


--
-- Name: _camps_v_version_enrollment_settings_custom_questions_parent_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_enrollment_settings_custom_questions_parent_id ON public._camps_v_version_enrollment_settings_custom_questions USING btree (_parent_id);


--
-- Name: _camps_v_version_enrollment_settings_version_enrollment_setting; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_enrollment_settings_version_enrollment_setting ON public._camps_v USING btree (version_enrollment_settings_info_document_id);


--
-- Name: _camps_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_version__status_idx ON public._camps_v USING btree (version__status);


--
-- Name: _camps_v_version_version_banner_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_version_banner_image_idx ON public._camps_v USING btree (version_banner_image_id);


--
-- Name: _camps_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_version_created_at_idx ON public._camps_v USING btree (version_created_at);


--
-- Name: _camps_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _camps_v_version_version_updated_at_idx ON public._camps_v USING btree (version_updated_at);


--
-- Name: _info_page_v_autosave_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_autosave_idx ON public._info_page_v USING btree (autosave);


--
-- Name: _info_page_v_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_created_at_idx ON public._info_page_v USING btree (created_at);


--
-- Name: _info_page_v_latest_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_latest_idx ON public._info_page_v USING btree (latest);


--
-- Name: _info_page_v_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_updated_at_idx ON public._info_page_v USING btree (updated_at);


--
-- Name: _info_page_v_version_pillars_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_version_pillars_order_idx ON public._info_page_v_version_pillars USING btree (_order);


--
-- Name: _info_page_v_version_pillars_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_version_pillars_parent_id_idx ON public._info_page_v_version_pillars USING btree (_parent_id);


--
-- Name: _info_page_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_version_version__status_idx ON public._info_page_v USING btree (version__status);


--
-- Name: _info_page_v_version_version_hero_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _info_page_v_version_version_hero_image_idx ON public._info_page_v USING btree (version_hero_image_id);


--
-- Name: _inschrijven_page_v_autosave_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_autosave_idx ON public._inschrijven_page_v USING btree (autosave);


--
-- Name: _inschrijven_page_v_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_created_at_idx ON public._inschrijven_page_v USING btree (created_at);


--
-- Name: _inschrijven_page_v_latest_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_latest_idx ON public._inschrijven_page_v USING btree (latest);


--
-- Name: _inschrijven_page_v_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_updated_at_idx ON public._inschrijven_page_v USING btree (updated_at);


--
-- Name: _inschrijven_page_v_version_practical_info_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_version_practical_info_order_idx ON public._inschrijven_page_v_version_practical_info USING btree (_order);


--
-- Name: _inschrijven_page_v_version_practical_info_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_version_practical_info_parent_id_idx ON public._inschrijven_page_v_version_practical_info USING btree (_parent_id);


--
-- Name: _inschrijven_page_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_version_version__status_idx ON public._inschrijven_page_v USING btree (version__status);


--
-- Name: _inschrijven_page_v_version_why_join_reasons_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_version_why_join_reasons_order_idx ON public._inschrijven_page_v_version_why_join_reasons USING btree (_order);


--
-- Name: _inschrijven_page_v_version_why_join_reasons_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _inschrijven_page_v_version_why_join_reasons_parent_id_idx ON public._inschrijven_page_v_version_why_join_reasons USING btree (_parent_id);


--
-- Name: _weekends_v_autosave_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_autosave_idx ON public._weekends_v USING btree (autosave);


--
-- Name: _weekends_v_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_created_at_idx ON public._weekends_v USING btree (created_at);


--
-- Name: _weekends_v_latest_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_latest_idx ON public._weekends_v USING btree (latest);


--
-- Name: _weekends_v_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_parent_idx ON public._weekends_v USING btree (parent_id);


--
-- Name: _weekends_v_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_updated_at_idx ON public._weekends_v USING btree (updated_at);


--
-- Name: _weekends_v_version_division_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_division_order_idx ON public._weekends_v_version_division USING btree ("order");


--
-- Name: _weekends_v_version_division_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_division_parent_idx ON public._weekends_v_version_division USING btree (parent_id);


--
-- Name: _weekends_v_version_enrollment_settings_custom_questions_order_; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_enrollment_settings_custom_questions_order_ ON public._weekends_v_version_enrollment_settings_custom_questions USING btree (_order);


--
-- Name: _weekends_v_version_enrollment_settings_custom_questions_parent; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_enrollment_settings_custom_questions_parent ON public._weekends_v_version_enrollment_settings_custom_questions USING btree (_parent_id);


--
-- Name: _weekends_v_version_enrollment_settings_version_enrollment_sett; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_enrollment_settings_version_enrollment_sett ON public._weekends_v USING btree (version_enrollment_settings_info_document_id);


--
-- Name: _weekends_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_version__status_idx ON public._weekends_v USING btree (version__status);


--
-- Name: _weekends_v_version_version_banner_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_version_banner_image_idx ON public._weekends_v USING btree (version_banner_image_id);


--
-- Name: _weekends_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_version_created_at_idx ON public._weekends_v USING btree (version_created_at);


--
-- Name: _weekends_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX _weekends_v_version_version_updated_at_idx ON public._weekends_v USING btree (version_updated_at);


--
-- Name: activiteiten__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten__status_idx ON public.activiteiten USING btree (_status);


--
-- Name: activiteiten_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten_created_at_idx ON public.activiteiten USING btree (created_at);


--
-- Name: activiteiten_division_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten_division_order_idx ON public.activiteiten_division USING btree ("order");


--
-- Name: activiteiten_division_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten_division_parent_idx ON public.activiteiten_division USING btree (parent_id);


--
-- Name: activiteiten_enrollment_settings_custom_questions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten_enrollment_settings_custom_questions_order_idx ON public.activiteiten_enrollment_settings_custom_questions USING btree (_order);


--
-- Name: activiteiten_enrollment_settings_custom_questions_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten_enrollment_settings_custom_questions_parent_id_idx ON public.activiteiten_enrollment_settings_custom_questions USING btree (_parent_id);


--
-- Name: activiteiten_enrollment_settings_enrollment_settings_info_docum; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten_enrollment_settings_enrollment_settings_info_docum ON public.activiteiten USING btree (enrollment_settings_info_document_id);


--
-- Name: activiteiten_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX activiteiten_updated_at_idx ON public.activiteiten USING btree (updated_at);


--
-- Name: banner_images_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX banner_images_created_at_idx ON public.banner_images USING btree (created_at);


--
-- Name: banner_images_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX banner_images_filename_idx ON public.banner_images USING btree (filename);


--
-- Name: banner_images_sizes_card_sizes_card_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX banner_images_sizes_card_sizes_card_filename_idx ON public.banner_images USING btree (sizes_card_filename);


--
-- Name: banner_images_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX banner_images_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.banner_images USING btree (sizes_thumbnail_filename);


--
-- Name: banner_images_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX banner_images_updated_at_idx ON public.banner_images USING btree (updated_at);


--
-- Name: camps__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps__status_idx ON public.camps USING btree (_status);


--
-- Name: camps_banner_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_banner_image_idx ON public.camps USING btree (banner_image_id);


--
-- Name: camps_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_created_at_idx ON public.camps USING btree (created_at);


--
-- Name: camps_division_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_division_order_idx ON public.camps_division USING btree ("order");


--
-- Name: camps_division_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_division_parent_idx ON public.camps_division USING btree (parent_id);


--
-- Name: camps_enrollment_settings_custom_questions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_enrollment_settings_custom_questions_order_idx ON public.camps_enrollment_settings_custom_questions USING btree (_order);


--
-- Name: camps_enrollment_settings_custom_questions_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_enrollment_settings_custom_questions_parent_id_idx ON public.camps_enrollment_settings_custom_questions USING btree (_parent_id);


--
-- Name: camps_enrollment_settings_enrollment_settings_info_document_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_enrollment_settings_enrollment_settings_info_document_idx ON public.camps USING btree (enrollment_settings_info_document_id);


--
-- Name: camps_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX camps_updated_at_idx ON public.camps USING btree (updated_at);


--
-- Name: enrollments_children_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrollments_children_order_idx ON public.enrollments_children USING btree (_order);


--
-- Name: enrollments_children_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrollments_children_parent_id_idx ON public.enrollments_children USING btree (_parent_id);


--
-- Name: enrollments_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrollments_created_at_idx ON public.enrollments USING btree (created_at);


--
-- Name: enrollments_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrollments_updated_at_idx ON public.enrollments USING btree (updated_at);


--
-- Name: events_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_created_at_idx ON public.events USING btree (created_at);


--
-- Name: events_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_updated_at_idx ON public.events USING btree (updated_at);


--
-- Name: homepage_hero_images_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_hero_images_created_at_idx ON public.homepage_hero_images USING btree (created_at);


--
-- Name: homepage_hero_images_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX homepage_hero_images_filename_idx ON public.homepage_hero_images USING btree (filename);


--
-- Name: homepage_hero_images_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_hero_images_updated_at_idx ON public.homepage_hero_images USING btree (updated_at);


--
-- Name: homepage_heros_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_heros_created_at_idx ON public.homepage_heros USING btree (created_at);


--
-- Name: homepage_heros_home_hero_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_heros_home_hero_image_idx ON public.homepage_heros USING btree (home_hero_image_id);


--
-- Name: homepage_heros_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_heros_updated_at_idx ON public.homepage_heros USING btree (updated_at);


--
-- Name: info_page__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX info_page__status_idx ON public.info_page USING btree (_status);


--
-- Name: info_page_hero_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX info_page_hero_image_idx ON public.info_page USING btree (hero_image_id);


--
-- Name: info_page_pillars_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX info_page_pillars_order_idx ON public.info_page_pillars USING btree (_order);


--
-- Name: info_page_pillars_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX info_page_pillars_parent_id_idx ON public.info_page_pillars USING btree (_parent_id);


--
-- Name: inschrijven_page__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inschrijven_page__status_idx ON public.inschrijven_page USING btree (_status);


--
-- Name: inschrijven_page_practical_info_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inschrijven_page_practical_info_order_idx ON public.inschrijven_page_practical_info USING btree (_order);


--
-- Name: inschrijven_page_practical_info_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inschrijven_page_practical_info_parent_id_idx ON public.inschrijven_page_practical_info USING btree (_parent_id);


--
-- Name: inschrijven_page_why_join_reasons_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inschrijven_page_why_join_reasons_order_idx ON public.inschrijven_page_why_join_reasons USING btree (_order);


--
-- Name: inschrijven_page_why_join_reasons_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inschrijven_page_why_join_reasons_parent_id_idx ON public.inschrijven_page_why_join_reasons USING btree (_parent_id);


--
-- Name: leiders_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leiders_created_at_idx ON public.leiders USING btree (created_at);


--
-- Name: leiders_foto_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leiders_foto_created_at_idx ON public.leiders_foto USING btree (created_at);


--
-- Name: leiders_foto_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX leiders_foto_filename_idx ON public.leiders_foto USING btree (filename);


--
-- Name: leiders_foto_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leiders_foto_updated_at_idx ON public.leiders_foto USING btree (updated_at);


--
-- Name: leiders_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leiders_image_idx ON public.leiders USING btree (image_id);


--
-- Name: leiders_takken_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leiders_takken_order_idx ON public.leiders_takken USING btree ("order");


--
-- Name: leiders_takken_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leiders_takken_parent_idx ON public.leiders_takken USING btree (parent_id);


--
-- Name: leiders_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX leiders_updated_at_idx ON public.leiders USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_activiteiten_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_activiteiten_id_idx ON public.payload_locked_documents_rels USING btree (activiteiten_id);


--
-- Name: payload_locked_documents_rels_banner_images_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_banner_images_id_idx ON public.payload_locked_documents_rels USING btree (banner_images_id);


--
-- Name: payload_locked_documents_rels_camps_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_camps_id_idx ON public.payload_locked_documents_rels USING btree (camps_id);


--
-- Name: payload_locked_documents_rels_enrollments_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_enrollments_id_idx ON public.payload_locked_documents_rels USING btree (enrollments_id);


--
-- Name: payload_locked_documents_rels_events_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_events_id_idx ON public.payload_locked_documents_rels USING btree (events_id);


--
-- Name: payload_locked_documents_rels_homepage_hero_images_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_homepage_hero_images_id_idx ON public.payload_locked_documents_rels USING btree (homepage_hero_images_id);


--
-- Name: payload_locked_documents_rels_homepage_heros_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_homepage_heros_id_idx ON public.payload_locked_documents_rels USING btree (homepage_heros_id);


--
-- Name: payload_locked_documents_rels_leiders_foto_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_leiders_foto_id_idx ON public.payload_locked_documents_rels USING btree (leiders_foto_id);


--
-- Name: payload_locked_documents_rels_leiders_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_leiders_id_idx ON public.payload_locked_documents_rels USING btree (leiders_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_photo_albums_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_photo_albums_id_idx ON public.payload_locked_documents_rels USING btree (photo_albums_id);


--
-- Name: payload_locked_documents_rels_random_afbeeldingen_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_random_afbeeldingen_id_idx ON public.payload_locked_documents_rels USING btree (random_afbeeldingen_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_rels_weekends_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_weekends_id_idx ON public.payload_locked_documents_rels USING btree (weekends_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: photo_albums_cover_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX photo_albums_cover_image_idx ON public.photo_albums USING btree (cover_image_id);


--
-- Name: photo_albums_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX photo_albums_created_at_idx ON public.photo_albums USING btree (created_at);


--
-- Name: photo_albums_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX photo_albums_updated_at_idx ON public.photo_albums USING btree (updated_at);


--
-- Name: random_afbeeldingen_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX random_afbeeldingen_created_at_idx ON public.random_afbeeldingen USING btree (created_at);


--
-- Name: random_afbeeldingen_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX random_afbeeldingen_filename_idx ON public.random_afbeeldingen USING btree (filename);


--
-- Name: random_afbeeldingen_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX random_afbeeldingen_updated_at_idx ON public.random_afbeeldingen USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: weekends__status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends__status_idx ON public.weekends USING btree (_status);


--
-- Name: weekends_banner_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_banner_image_idx ON public.weekends USING btree (banner_image_id);


--
-- Name: weekends_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_created_at_idx ON public.weekends USING btree (created_at);


--
-- Name: weekends_division_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_division_order_idx ON public.weekends_division USING btree ("order");


--
-- Name: weekends_division_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_division_parent_idx ON public.weekends_division USING btree (parent_id);


--
-- Name: weekends_enrollment_settings_custom_questions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_enrollment_settings_custom_questions_order_idx ON public.weekends_enrollment_settings_custom_questions USING btree (_order);


--
-- Name: weekends_enrollment_settings_custom_questions_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_enrollment_settings_custom_questions_parent_id_idx ON public.weekends_enrollment_settings_custom_questions USING btree (_parent_id);


--
-- Name: weekends_enrollment_settings_enrollment_settings_info_document_; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_enrollment_settings_enrollment_settings_info_document_ ON public.weekends USING btree (enrollment_settings_info_document_id);


--
-- Name: weekends_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX weekends_updated_at_idx ON public.weekends USING btree (updated_at);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: _activiteiten_v _activiteiten_v_parent_id_activiteiten_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v
    ADD CONSTRAINT _activiteiten_v_parent_id_activiteiten_id_fk FOREIGN KEY (parent_id) REFERENCES public.activiteiten(id) ON DELETE SET NULL;


--
-- Name: _activiteiten_v_version_division _activiteiten_v_version_division_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v_version_division
    ADD CONSTRAINT _activiteiten_v_version_division_parent_fk FOREIGN KEY (parent_id) REFERENCES public._activiteiten_v(id) ON DELETE CASCADE;


--
-- Name: _activiteiten_v_version_enrollment_settings_custom_questions _activiteiten_v_version_enrollment_settings_custom_questions_pa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v_version_enrollment_settings_custom_questions
    ADD CONSTRAINT _activiteiten_v_version_enrollment_settings_custom_questions_pa FOREIGN KEY (_parent_id) REFERENCES public._activiteiten_v(id) ON DELETE CASCADE;


--
-- Name: _activiteiten_v _activiteiten_v_version_enrollment_settings_info_document_id_me; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._activiteiten_v
    ADD CONSTRAINT _activiteiten_v_version_enrollment_settings_info_document_id_me FOREIGN KEY (version_enrollment_settings_info_document_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _camps_v _camps_v_parent_id_camps_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v
    ADD CONSTRAINT _camps_v_parent_id_camps_id_fk FOREIGN KEY (parent_id) REFERENCES public.camps(id) ON DELETE SET NULL;


--
-- Name: _camps_v _camps_v_version_banner_image_id_banner_images_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v
    ADD CONSTRAINT _camps_v_version_banner_image_id_banner_images_id_fk FOREIGN KEY (version_banner_image_id) REFERENCES public.banner_images(id) ON DELETE SET NULL;


--
-- Name: _camps_v_version_division _camps_v_version_division_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v_version_division
    ADD CONSTRAINT _camps_v_version_division_parent_fk FOREIGN KEY (parent_id) REFERENCES public._camps_v(id) ON DELETE CASCADE;


--
-- Name: _camps_v_version_enrollment_settings_custom_questions _camps_v_version_enrollment_settings_custom_questions_parent_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v_version_enrollment_settings_custom_questions
    ADD CONSTRAINT _camps_v_version_enrollment_settings_custom_questions_parent_id FOREIGN KEY (_parent_id) REFERENCES public._camps_v(id) ON DELETE CASCADE;


--
-- Name: _camps_v _camps_v_version_enrollment_settings_info_document_id_media_id_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._camps_v
    ADD CONSTRAINT _camps_v_version_enrollment_settings_info_document_id_media_id_ FOREIGN KEY (version_enrollment_settings_info_document_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _info_page_v _info_page_v_version_hero_image_id_random_afbeeldingen_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._info_page_v
    ADD CONSTRAINT _info_page_v_version_hero_image_id_random_afbeeldingen_id_fk FOREIGN KEY (version_hero_image_id) REFERENCES public.random_afbeeldingen(id) ON DELETE SET NULL;


--
-- Name: _info_page_v_version_pillars _info_page_v_version_pillars_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._info_page_v_version_pillars
    ADD CONSTRAINT _info_page_v_version_pillars_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._info_page_v(id) ON DELETE CASCADE;


--
-- Name: _inschrijven_page_v_version_practical_info _inschrijven_page_v_version_practical_info_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v_version_practical_info
    ADD CONSTRAINT _inschrijven_page_v_version_practical_info_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._inschrijven_page_v(id) ON DELETE CASCADE;


--
-- Name: _inschrijven_page_v_version_why_join_reasons _inschrijven_page_v_version_why_join_reasons_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._inschrijven_page_v_version_why_join_reasons
    ADD CONSTRAINT _inschrijven_page_v_version_why_join_reasons_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._inschrijven_page_v(id) ON DELETE CASCADE;


--
-- Name: _weekends_v _weekends_v_parent_id_weekends_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v
    ADD CONSTRAINT _weekends_v_parent_id_weekends_id_fk FOREIGN KEY (parent_id) REFERENCES public.weekends(id) ON DELETE SET NULL;


--
-- Name: _weekends_v _weekends_v_version_banner_image_id_banner_images_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v
    ADD CONSTRAINT _weekends_v_version_banner_image_id_banner_images_id_fk FOREIGN KEY (version_banner_image_id) REFERENCES public.banner_images(id) ON DELETE SET NULL;


--
-- Name: _weekends_v_version_division _weekends_v_version_division_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v_version_division
    ADD CONSTRAINT _weekends_v_version_division_parent_fk FOREIGN KEY (parent_id) REFERENCES public._weekends_v(id) ON DELETE CASCADE;


--
-- Name: _weekends_v_version_enrollment_settings_custom_questions _weekends_v_version_enrollment_settings_custom_questions_parent; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v_version_enrollment_settings_custom_questions
    ADD CONSTRAINT _weekends_v_version_enrollment_settings_custom_questions_parent FOREIGN KEY (_parent_id) REFERENCES public._weekends_v(id) ON DELETE CASCADE;


--
-- Name: _weekends_v _weekends_v_version_enrollment_settings_info_document_id_media_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._weekends_v
    ADD CONSTRAINT _weekends_v_version_enrollment_settings_info_document_id_media_ FOREIGN KEY (version_enrollment_settings_info_document_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: activiteiten_division activiteiten_division_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten_division
    ADD CONSTRAINT activiteiten_division_parent_fk FOREIGN KEY (parent_id) REFERENCES public.activiteiten(id) ON DELETE CASCADE;


--
-- Name: activiteiten_enrollment_settings_custom_questions activiteiten_enrollment_settings_custom_questions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten_enrollment_settings_custom_questions
    ADD CONSTRAINT activiteiten_enrollment_settings_custom_questions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.activiteiten(id) ON DELETE CASCADE;


--
-- Name: activiteiten activiteiten_enrollment_settings_info_document_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activiteiten
    ADD CONSTRAINT activiteiten_enrollment_settings_info_document_id_media_id_fk FOREIGN KEY (enrollment_settings_info_document_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: camps camps_banner_image_id_banner_images_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps
    ADD CONSTRAINT camps_banner_image_id_banner_images_id_fk FOREIGN KEY (banner_image_id) REFERENCES public.banner_images(id) ON DELETE SET NULL;


--
-- Name: camps_division camps_division_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps_division
    ADD CONSTRAINT camps_division_parent_fk FOREIGN KEY (parent_id) REFERENCES public.camps(id) ON DELETE CASCADE;


--
-- Name: camps_enrollment_settings_custom_questions camps_enrollment_settings_custom_questions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps_enrollment_settings_custom_questions
    ADD CONSTRAINT camps_enrollment_settings_custom_questions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.camps(id) ON DELETE CASCADE;


--
-- Name: camps camps_enrollment_settings_info_document_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.camps
    ADD CONSTRAINT camps_enrollment_settings_info_document_id_media_id_fk FOREIGN KEY (enrollment_settings_info_document_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: enrollments_children enrollments_children_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments_children
    ADD CONSTRAINT enrollments_children_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.enrollments(id) ON DELETE CASCADE;


--
-- Name: homepage_heros homepage_heros_home_hero_image_id_homepage_hero_images_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_heros
    ADD CONSTRAINT homepage_heros_home_hero_image_id_homepage_hero_images_id_fk FOREIGN KEY (home_hero_image_id) REFERENCES public.homepage_hero_images(id) ON DELETE SET NULL;


--
-- Name: info_page info_page_hero_image_id_random_afbeeldingen_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.info_page
    ADD CONSTRAINT info_page_hero_image_id_random_afbeeldingen_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.random_afbeeldingen(id) ON DELETE SET NULL;


--
-- Name: info_page_pillars info_page_pillars_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.info_page_pillars
    ADD CONSTRAINT info_page_pillars_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.info_page(id) ON DELETE CASCADE;


--
-- Name: inschrijven_page_practical_info inschrijven_page_practical_info_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inschrijven_page_practical_info
    ADD CONSTRAINT inschrijven_page_practical_info_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.inschrijven_page(id) ON DELETE CASCADE;


--
-- Name: inschrijven_page_why_join_reasons inschrijven_page_why_join_reasons_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inschrijven_page_why_join_reasons
    ADD CONSTRAINT inschrijven_page_why_join_reasons_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.inschrijven_page(id) ON DELETE CASCADE;


--
-- Name: leiders leiders_image_id_leiders_foto_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders
    ADD CONSTRAINT leiders_image_id_leiders_foto_id_fk FOREIGN KEY (image_id) REFERENCES public.leiders_foto(id) ON DELETE SET NULL;


--
-- Name: leiders_takken leiders_takken_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leiders_takken
    ADD CONSTRAINT leiders_takken_parent_fk FOREIGN KEY (parent_id) REFERENCES public.leiders(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_activiteiten_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_activiteiten_fk FOREIGN KEY (activiteiten_id) REFERENCES public.activiteiten(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_banner_images_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_banner_images_fk FOREIGN KEY (banner_images_id) REFERENCES public.banner_images(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_camps_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_camps_fk FOREIGN KEY (camps_id) REFERENCES public.camps(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_enrollments_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_enrollments_fk FOREIGN KEY (enrollments_id) REFERENCES public.enrollments(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_events_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_events_fk FOREIGN KEY (events_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_homepage_hero_images_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_homepage_hero_images_fk FOREIGN KEY (homepage_hero_images_id) REFERENCES public.homepage_hero_images(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_homepage_heros_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_homepage_heros_fk FOREIGN KEY (homepage_heros_id) REFERENCES public.homepage_heros(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_leiders_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_leiders_fk FOREIGN KEY (leiders_id) REFERENCES public.leiders(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_leiders_foto_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_leiders_foto_fk FOREIGN KEY (leiders_foto_id) REFERENCES public.leiders_foto(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_photo_albums_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_photo_albums_fk FOREIGN KEY (photo_albums_id) REFERENCES public.photo_albums(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_random_afbeeldingen_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_random_afbeeldingen_fk FOREIGN KEY (random_afbeeldingen_id) REFERENCES public.random_afbeeldingen(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_weekends_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_weekends_fk FOREIGN KEY (weekends_id) REFERENCES public.weekends(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: photo_albums photo_albums_cover_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo_albums
    ADD CONSTRAINT photo_albums_cover_image_id_media_id_fk FOREIGN KEY (cover_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: weekends weekends_banner_image_id_banner_images_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends
    ADD CONSTRAINT weekends_banner_image_id_banner_images_id_fk FOREIGN KEY (banner_image_id) REFERENCES public.banner_images(id) ON DELETE SET NULL;


--
-- Name: weekends_division weekends_division_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends_division
    ADD CONSTRAINT weekends_division_parent_fk FOREIGN KEY (parent_id) REFERENCES public.weekends(id) ON DELETE CASCADE;


--
-- Name: weekends_enrollment_settings_custom_questions weekends_enrollment_settings_custom_questions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends_enrollment_settings_custom_questions
    ADD CONSTRAINT weekends_enrollment_settings_custom_questions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.weekends(id) ON DELETE CASCADE;


--
-- Name: weekends weekends_enrollment_settings_info_document_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekends
    ADD CONSTRAINT weekends_enrollment_settings_info_document_id_media_id_fk FOREIGN KEY (enrollment_settings_info_document_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: buckets buckets_owner_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_owner_fkey FOREIGN KEY (owner) REFERENCES auth.users(id);


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: objects objects_owner_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_owner_fkey FOREIGN KEY (owner) REFERENCES auth.users(id);


--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.try_cast_double(inp text) FROM postgres;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.url_decode(data text) FROM postgres;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.url_encode(data bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) FROM postgres;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION comment_directive(comment_ text); Type: ACL; Schema: graphql; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO postgres;
GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO anon;
GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO authenticated;
GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO service_role;


--
-- Name: FUNCTION exception(message text); Type: ACL; Schema: graphql; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql.exception(message text) TO postgres;
GRANT ALL ON FUNCTION graphql.exception(message text) TO anon;
GRANT ALL ON FUNCTION graphql.exception(message text) TO authenticated;
GRANT ALL ON FUNCTION graphql.exception(message text) TO service_role;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO anon;
GRANT ALL ON FUNCTION storage.extension(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.extension(name text) TO service_role;
GRANT ALL ON FUNCTION storage.extension(name text) TO dashboard_user;
GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO anon;
GRANT ALL ON FUNCTION storage.filename(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.filename(name text) TO service_role;
GRANT ALL ON FUNCTION storage.filename(name text) TO dashboard_user;
GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO anon;
GRANT ALL ON FUNCTION storage.foldername(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.foldername(name text) TO service_role;
GRANT ALL ON FUNCTION storage.foldername(name text) TO dashboard_user;
GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;


--
-- Name: FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO anon;
GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO authenticated;
GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO service_role;
GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO dashboard_user;
GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer) TO postgres;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT ALL ON TABLE auth.audit_log_entries TO postgres;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT ALL ON TABLE auth.instances TO postgres;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT ALL ON TABLE auth.refresh_tokens TO postgres;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.schema_migrations TO dashboard_user;
GRANT ALL ON TABLE auth.schema_migrations TO postgres;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT ALL ON TABLE auth.users TO postgres;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE _activiteiten_v; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._activiteiten_v TO anon;
GRANT ALL ON TABLE public._activiteiten_v TO authenticated;
GRANT ALL ON TABLE public._activiteiten_v TO service_role;


--
-- Name: SEQUENCE _activiteiten_v_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._activiteiten_v_id_seq TO anon;
GRANT ALL ON SEQUENCE public._activiteiten_v_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._activiteiten_v_id_seq TO service_role;


--
-- Name: TABLE _activiteiten_v_version_division; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._activiteiten_v_version_division TO anon;
GRANT ALL ON TABLE public._activiteiten_v_version_division TO authenticated;
GRANT ALL ON TABLE public._activiteiten_v_version_division TO service_role;


--
-- Name: SEQUENCE _activiteiten_v_version_division_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._activiteiten_v_version_division_id_seq TO anon;
GRANT ALL ON SEQUENCE public._activiteiten_v_version_division_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._activiteiten_v_version_division_id_seq TO service_role;


--
-- Name: TABLE _activiteiten_v_version_enrollment_settings_custom_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._activiteiten_v_version_enrollment_settings_custom_questions TO anon;
GRANT ALL ON TABLE public._activiteiten_v_version_enrollment_settings_custom_questions TO authenticated;
GRANT ALL ON TABLE public._activiteiten_v_version_enrollment_settings_custom_questions TO service_role;


--
-- Name: SEQUENCE _activiteiten_v_version_enrollment_settings_custom_quest_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq TO anon;
GRANT ALL ON SEQUENCE public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq TO service_role;


--
-- Name: TABLE _camps_v; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._camps_v TO anon;
GRANT ALL ON TABLE public._camps_v TO authenticated;
GRANT ALL ON TABLE public._camps_v TO service_role;


--
-- Name: SEQUENCE _camps_v_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._camps_v_id_seq TO anon;
GRANT ALL ON SEQUENCE public._camps_v_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._camps_v_id_seq TO service_role;


--
-- Name: TABLE _camps_v_version_division; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._camps_v_version_division TO anon;
GRANT ALL ON TABLE public._camps_v_version_division TO authenticated;
GRANT ALL ON TABLE public._camps_v_version_division TO service_role;


--
-- Name: SEQUENCE _camps_v_version_division_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._camps_v_version_division_id_seq TO anon;
GRANT ALL ON SEQUENCE public._camps_v_version_division_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._camps_v_version_division_id_seq TO service_role;


--
-- Name: TABLE _camps_v_version_enrollment_settings_custom_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._camps_v_version_enrollment_settings_custom_questions TO anon;
GRANT ALL ON TABLE public._camps_v_version_enrollment_settings_custom_questions TO authenticated;
GRANT ALL ON TABLE public._camps_v_version_enrollment_settings_custom_questions TO service_role;


--
-- Name: SEQUENCE _camps_v_version_enrollment_settings_custom_questions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._camps_v_version_enrollment_settings_custom_questions_id_seq TO anon;
GRANT ALL ON SEQUENCE public._camps_v_version_enrollment_settings_custom_questions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._camps_v_version_enrollment_settings_custom_questions_id_seq TO service_role;


--
-- Name: TABLE _info_page_v; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._info_page_v TO anon;
GRANT ALL ON TABLE public._info_page_v TO authenticated;
GRANT ALL ON TABLE public._info_page_v TO service_role;


--
-- Name: SEQUENCE _info_page_v_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._info_page_v_id_seq TO anon;
GRANT ALL ON SEQUENCE public._info_page_v_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._info_page_v_id_seq TO service_role;


--
-- Name: TABLE _info_page_v_version_pillars; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._info_page_v_version_pillars TO anon;
GRANT ALL ON TABLE public._info_page_v_version_pillars TO authenticated;
GRANT ALL ON TABLE public._info_page_v_version_pillars TO service_role;


--
-- Name: SEQUENCE _info_page_v_version_pillars_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._info_page_v_version_pillars_id_seq TO anon;
GRANT ALL ON SEQUENCE public._info_page_v_version_pillars_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._info_page_v_version_pillars_id_seq TO service_role;


--
-- Name: TABLE _inschrijven_page_v; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._inschrijven_page_v TO anon;
GRANT ALL ON TABLE public._inschrijven_page_v TO authenticated;
GRANT ALL ON TABLE public._inschrijven_page_v TO service_role;


--
-- Name: SEQUENCE _inschrijven_page_v_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._inschrijven_page_v_id_seq TO anon;
GRANT ALL ON SEQUENCE public._inschrijven_page_v_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._inschrijven_page_v_id_seq TO service_role;


--
-- Name: TABLE _inschrijven_page_v_version_practical_info; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._inschrijven_page_v_version_practical_info TO anon;
GRANT ALL ON TABLE public._inschrijven_page_v_version_practical_info TO authenticated;
GRANT ALL ON TABLE public._inschrijven_page_v_version_practical_info TO service_role;


--
-- Name: SEQUENCE _inschrijven_page_v_version_practical_info_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._inschrijven_page_v_version_practical_info_id_seq TO anon;
GRANT ALL ON SEQUENCE public._inschrijven_page_v_version_practical_info_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._inschrijven_page_v_version_practical_info_id_seq TO service_role;


--
-- Name: TABLE _inschrijven_page_v_version_why_join_reasons; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._inschrijven_page_v_version_why_join_reasons TO anon;
GRANT ALL ON TABLE public._inschrijven_page_v_version_why_join_reasons TO authenticated;
GRANT ALL ON TABLE public._inschrijven_page_v_version_why_join_reasons TO service_role;


--
-- Name: SEQUENCE _inschrijven_page_v_version_why_join_reasons_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._inschrijven_page_v_version_why_join_reasons_id_seq TO anon;
GRANT ALL ON SEQUENCE public._inschrijven_page_v_version_why_join_reasons_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._inschrijven_page_v_version_why_join_reasons_id_seq TO service_role;


--
-- Name: TABLE _weekends_v; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._weekends_v TO anon;
GRANT ALL ON TABLE public._weekends_v TO authenticated;
GRANT ALL ON TABLE public._weekends_v TO service_role;


--
-- Name: SEQUENCE _weekends_v_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._weekends_v_id_seq TO anon;
GRANT ALL ON SEQUENCE public._weekends_v_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._weekends_v_id_seq TO service_role;


--
-- Name: TABLE _weekends_v_version_division; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._weekends_v_version_division TO anon;
GRANT ALL ON TABLE public._weekends_v_version_division TO authenticated;
GRANT ALL ON TABLE public._weekends_v_version_division TO service_role;


--
-- Name: SEQUENCE _weekends_v_version_division_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._weekends_v_version_division_id_seq TO anon;
GRANT ALL ON SEQUENCE public._weekends_v_version_division_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._weekends_v_version_division_id_seq TO service_role;


--
-- Name: TABLE _weekends_v_version_enrollment_settings_custom_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._weekends_v_version_enrollment_settings_custom_questions TO anon;
GRANT ALL ON TABLE public._weekends_v_version_enrollment_settings_custom_questions TO authenticated;
GRANT ALL ON TABLE public._weekends_v_version_enrollment_settings_custom_questions TO service_role;


--
-- Name: SEQUENCE _weekends_v_version_enrollment_settings_custom_questions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public._weekends_v_version_enrollment_settings_custom_questions_id_seq TO anon;
GRANT ALL ON SEQUENCE public._weekends_v_version_enrollment_settings_custom_questions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public._weekends_v_version_enrollment_settings_custom_questions_id_seq TO service_role;


--
-- Name: TABLE activiteiten; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activiteiten TO anon;
GRANT ALL ON TABLE public.activiteiten TO authenticated;
GRANT ALL ON TABLE public.activiteiten TO service_role;


--
-- Name: TABLE activiteiten_division; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activiteiten_division TO anon;
GRANT ALL ON TABLE public.activiteiten_division TO authenticated;
GRANT ALL ON TABLE public.activiteiten_division TO service_role;


--
-- Name: SEQUENCE activiteiten_division_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activiteiten_division_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activiteiten_division_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activiteiten_division_id_seq TO service_role;


--
-- Name: TABLE activiteiten_enrollment_settings_custom_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.activiteiten_enrollment_settings_custom_questions TO anon;
GRANT ALL ON TABLE public.activiteiten_enrollment_settings_custom_questions TO authenticated;
GRANT ALL ON TABLE public.activiteiten_enrollment_settings_custom_questions TO service_role;


--
-- Name: SEQUENCE activiteiten_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.activiteiten_id_seq TO anon;
GRANT ALL ON SEQUENCE public.activiteiten_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.activiteiten_id_seq TO service_role;


--
-- Name: TABLE banner_images; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.banner_images TO anon;
GRANT ALL ON TABLE public.banner_images TO authenticated;
GRANT ALL ON TABLE public.banner_images TO service_role;


--
-- Name: SEQUENCE banner_images_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.banner_images_id_seq TO anon;
GRANT ALL ON SEQUENCE public.banner_images_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.banner_images_id_seq TO service_role;


--
-- Name: TABLE camps; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.camps TO anon;
GRANT ALL ON TABLE public.camps TO authenticated;
GRANT ALL ON TABLE public.camps TO service_role;


--
-- Name: TABLE camps_division; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.camps_division TO anon;
GRANT ALL ON TABLE public.camps_division TO authenticated;
GRANT ALL ON TABLE public.camps_division TO service_role;


--
-- Name: SEQUENCE camps_division_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.camps_division_id_seq TO anon;
GRANT ALL ON SEQUENCE public.camps_division_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.camps_division_id_seq TO service_role;


--
-- Name: TABLE camps_enrollment_settings_custom_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.camps_enrollment_settings_custom_questions TO anon;
GRANT ALL ON TABLE public.camps_enrollment_settings_custom_questions TO authenticated;
GRANT ALL ON TABLE public.camps_enrollment_settings_custom_questions TO service_role;


--
-- Name: SEQUENCE camps_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.camps_id_seq TO anon;
GRANT ALL ON SEQUENCE public.camps_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.camps_id_seq TO service_role;


--
-- Name: TABLE enrollments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.enrollments TO anon;
GRANT ALL ON TABLE public.enrollments TO authenticated;
GRANT ALL ON TABLE public.enrollments TO service_role;


--
-- Name: TABLE enrollments_children; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.enrollments_children TO anon;
GRANT ALL ON TABLE public.enrollments_children TO authenticated;
GRANT ALL ON TABLE public.enrollments_children TO service_role;


--
-- Name: SEQUENCE enrollments_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.enrollments_id_seq TO anon;
GRANT ALL ON SEQUENCE public.enrollments_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.enrollments_id_seq TO service_role;


--
-- Name: TABLE events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.events TO anon;
GRANT ALL ON TABLE public.events TO authenticated;
GRANT ALL ON TABLE public.events TO service_role;


--
-- Name: SEQUENCE events_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.events_id_seq TO anon;
GRANT ALL ON SEQUENCE public.events_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.events_id_seq TO service_role;


--
-- Name: TABLE homepage_hero_images; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.homepage_hero_images TO anon;
GRANT ALL ON TABLE public.homepage_hero_images TO authenticated;
GRANT ALL ON TABLE public.homepage_hero_images TO service_role;


--
-- Name: SEQUENCE homepage_hero_images_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.homepage_hero_images_id_seq TO anon;
GRANT ALL ON SEQUENCE public.homepage_hero_images_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.homepage_hero_images_id_seq TO service_role;


--
-- Name: TABLE homepage_heros; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.homepage_heros TO anon;
GRANT ALL ON TABLE public.homepage_heros TO authenticated;
GRANT ALL ON TABLE public.homepage_heros TO service_role;


--
-- Name: SEQUENCE homepage_heros_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.homepage_heros_id_seq TO anon;
GRANT ALL ON SEQUENCE public.homepage_heros_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.homepage_heros_id_seq TO service_role;


--
-- Name: TABLE info_page; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.info_page TO anon;
GRANT ALL ON TABLE public.info_page TO authenticated;
GRANT ALL ON TABLE public.info_page TO service_role;


--
-- Name: SEQUENCE info_page_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.info_page_id_seq TO anon;
GRANT ALL ON SEQUENCE public.info_page_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.info_page_id_seq TO service_role;


--
-- Name: TABLE info_page_pillars; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.info_page_pillars TO anon;
GRANT ALL ON TABLE public.info_page_pillars TO authenticated;
GRANT ALL ON TABLE public.info_page_pillars TO service_role;


--
-- Name: TABLE inschrijven_page; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.inschrijven_page TO anon;
GRANT ALL ON TABLE public.inschrijven_page TO authenticated;
GRANT ALL ON TABLE public.inschrijven_page TO service_role;


--
-- Name: SEQUENCE inschrijven_page_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.inschrijven_page_id_seq TO anon;
GRANT ALL ON SEQUENCE public.inschrijven_page_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.inschrijven_page_id_seq TO service_role;


--
-- Name: TABLE inschrijven_page_practical_info; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.inschrijven_page_practical_info TO anon;
GRANT ALL ON TABLE public.inschrijven_page_practical_info TO authenticated;
GRANT ALL ON TABLE public.inschrijven_page_practical_info TO service_role;


--
-- Name: TABLE inschrijven_page_why_join_reasons; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.inschrijven_page_why_join_reasons TO anon;
GRANT ALL ON TABLE public.inschrijven_page_why_join_reasons TO authenticated;
GRANT ALL ON TABLE public.inschrijven_page_why_join_reasons TO service_role;


--
-- Name: TABLE leiders; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.leiders TO anon;
GRANT ALL ON TABLE public.leiders TO authenticated;
GRANT ALL ON TABLE public.leiders TO service_role;


--
-- Name: TABLE leiders_foto; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.leiders_foto TO anon;
GRANT ALL ON TABLE public.leiders_foto TO authenticated;
GRANT ALL ON TABLE public.leiders_foto TO service_role;


--
-- Name: SEQUENCE leiders_foto_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.leiders_foto_id_seq TO anon;
GRANT ALL ON SEQUENCE public.leiders_foto_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.leiders_foto_id_seq TO service_role;


--
-- Name: SEQUENCE leiders_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.leiders_id_seq TO anon;
GRANT ALL ON SEQUENCE public.leiders_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.leiders_id_seq TO service_role;


--
-- Name: TABLE leiders_takken; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.leiders_takken TO anon;
GRANT ALL ON TABLE public.leiders_takken TO authenticated;
GRANT ALL ON TABLE public.leiders_takken TO service_role;


--
-- Name: SEQUENCE leiders_takken_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.leiders_takken_id_seq TO anon;
GRANT ALL ON SEQUENCE public.leiders_takken_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.leiders_takken_id_seq TO service_role;


--
-- Name: TABLE media; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.media TO anon;
GRANT ALL ON TABLE public.media TO authenticated;
GRANT ALL ON TABLE public.media TO service_role;


--
-- Name: SEQUENCE media_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.media_id_seq TO anon;
GRANT ALL ON SEQUENCE public.media_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.media_id_seq TO service_role;


--
-- Name: TABLE payload_locked_documents; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.payload_locked_documents TO anon;
GRANT ALL ON TABLE public.payload_locked_documents TO authenticated;
GRANT ALL ON TABLE public.payload_locked_documents TO service_role;


--
-- Name: SEQUENCE payload_locked_documents_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.payload_locked_documents_id_seq TO anon;
GRANT ALL ON SEQUENCE public.payload_locked_documents_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.payload_locked_documents_id_seq TO service_role;


--
-- Name: TABLE payload_locked_documents_rels; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.payload_locked_documents_rels TO anon;
GRANT ALL ON TABLE public.payload_locked_documents_rels TO authenticated;
GRANT ALL ON TABLE public.payload_locked_documents_rels TO service_role;


--
-- Name: SEQUENCE payload_locked_documents_rels_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.payload_locked_documents_rels_id_seq TO anon;
GRANT ALL ON SEQUENCE public.payload_locked_documents_rels_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.payload_locked_documents_rels_id_seq TO service_role;


--
-- Name: TABLE payload_migrations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.payload_migrations TO anon;
GRANT ALL ON TABLE public.payload_migrations TO authenticated;
GRANT ALL ON TABLE public.payload_migrations TO service_role;


--
-- Name: SEQUENCE payload_migrations_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.payload_migrations_id_seq TO anon;
GRANT ALL ON SEQUENCE public.payload_migrations_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.payload_migrations_id_seq TO service_role;


--
-- Name: TABLE payload_preferences; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.payload_preferences TO anon;
GRANT ALL ON TABLE public.payload_preferences TO authenticated;
GRANT ALL ON TABLE public.payload_preferences TO service_role;


--
-- Name: SEQUENCE payload_preferences_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.payload_preferences_id_seq TO anon;
GRANT ALL ON SEQUENCE public.payload_preferences_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.payload_preferences_id_seq TO service_role;


--
-- Name: TABLE payload_preferences_rels; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.payload_preferences_rels TO anon;
GRANT ALL ON TABLE public.payload_preferences_rels TO authenticated;
GRANT ALL ON TABLE public.payload_preferences_rels TO service_role;


--
-- Name: SEQUENCE payload_preferences_rels_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.payload_preferences_rels_id_seq TO anon;
GRANT ALL ON SEQUENCE public.payload_preferences_rels_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.payload_preferences_rels_id_seq TO service_role;


--
-- Name: TABLE photo_albums; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.photo_albums TO anon;
GRANT ALL ON TABLE public.photo_albums TO authenticated;
GRANT ALL ON TABLE public.photo_albums TO service_role;


--
-- Name: SEQUENCE photo_albums_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.photo_albums_id_seq TO anon;
GRANT ALL ON SEQUENCE public.photo_albums_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.photo_albums_id_seq TO service_role;


--
-- Name: TABLE random_afbeeldingen; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.random_afbeeldingen TO anon;
GRANT ALL ON TABLE public.random_afbeeldingen TO authenticated;
GRANT ALL ON TABLE public.random_afbeeldingen TO service_role;


--
-- Name: SEQUENCE random_afbeeldingen_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.random_afbeeldingen_id_seq TO anon;
GRANT ALL ON SEQUENCE public.random_afbeeldingen_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.random_afbeeldingen_id_seq TO service_role;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.users_id_seq TO anon;
GRANT ALL ON SEQUENCE public.users_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.users_id_seq TO service_role;


--
-- Name: TABLE weekends; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.weekends TO anon;
GRANT ALL ON TABLE public.weekends TO authenticated;
GRANT ALL ON TABLE public.weekends TO service_role;


--
-- Name: TABLE weekends_division; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.weekends_division TO anon;
GRANT ALL ON TABLE public.weekends_division TO authenticated;
GRANT ALL ON TABLE public.weekends_division TO service_role;


--
-- Name: SEQUENCE weekends_division_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.weekends_division_id_seq TO anon;
GRANT ALL ON SEQUENCE public.weekends_division_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.weekends_division_id_seq TO service_role;


--
-- Name: TABLE weekends_enrollment_settings_custom_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.weekends_enrollment_settings_custom_questions TO anon;
GRANT ALL ON TABLE public.weekends_enrollment_settings_custom_questions TO authenticated;
GRANT ALL ON TABLE public.weekends_enrollment_settings_custom_questions TO service_role;


--
-- Name: SEQUENCE weekends_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.weekends_id_seq TO anon;
GRANT ALL ON SEQUENCE public.weekends_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.weekends_id_seq TO service_role;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE migrations; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.migrations TO anon;
GRANT ALL ON TABLE storage.migrations TO authenticated;
GRANT ALL ON TABLE storage.migrations TO service_role;
GRANT ALL ON TABLE storage.migrations TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES  TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON TABLES  TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON TABLES  TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES  TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES  TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO postgres;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

