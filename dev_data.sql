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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
1	\N	2025-06-08 08:00:24.398+00	2025-06-08 08:00:24.38+00	\N	\N	inschrijving-kapoenen-kamp-2025-39.pdf	application/pdf	11488092	\N	\N	\N	\N
2	\N	2025-06-13 14:11:08.108+00	2025-06-13 14:11:08.099+00	\N	\N	DSC_0725.JPG	image/jpeg	886677	1620	1080	50	50
\.


--
-- Data for Name: activiteiten; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activiteiten (id, title, start_date, end_date, description, enrollment_settings_enabled, enrollment_settings_closed, enrollment_settings_hide_button, enrollment_settings_closed_message, enrollment_settings_enrollment_link, enrollment_settings_info_document_id, enrollment_settings_enrollment_deadline, enrollment_settings_custom_message, enrollment_settings_is_paid, enrollment_settings_price_per_child, enrollment_settings_payment_instructions, updated_at, created_at, _status) FROM stdin;
1	sfdahjmklfdsq	2025-06-15 12:00:00+00	2025-06-15 15:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "qsdfsdgfqsd", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 07:57:51.957+00	2025-06-08 07:57:09.587+00	published
2	Rechtendoortocht	2025-06-22 12:00:00+00	2025-06-22 15:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "ghc", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:25:23.372+00	2025-06-08 08:07:20.09+00	published
3	kapoenen	2025-06-28 16:00:00+00	2025-06-28 18:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:30:43.072+00	2025-06-08 08:25:27.748+00	published
5	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:45:52.298+00	2025-06-08 08:45:52.296+00	draft
6	sdfg	2025-06-20 11:00:00+00	2025-06-20 12:00:00+00	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:54:48.219+00	2025-06-08 08:53:26.589+00	published
7	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:54:51.388+00	2025-06-08 08:54:51.388+00	draft
\.


--
-- Data for Name: _activiteiten_v; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._activiteiten_v (id, parent_id, version_title, version_start_date, version_end_date, version_description, version_enrollment_settings_enabled, version_enrollment_settings_closed, version_enrollment_settings_hide_button, version_enrollment_settings_closed_message, version_enrollment_settings_enrollment_link, version_enrollment_settings_info_document_id, version_enrollment_settings_enrollment_deadline, version_enrollment_settings_custom_message, version_enrollment_settings_is_paid, version_enrollment_settings_price_per_child, version_enrollment_settings_payment_instructions, version_updated_at, version_created_at, version__status, created_at, updated_at, latest, autosave) FROM stdin;
16	6	sdfg	2025-06-20 11:00:00+00	2025-06-20 12:00:00+00	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:54:48.219+00	2025-06-08 08:53:26.589+00	published	2025-06-08 08:54:48.226+00	2025-06-08 08:54:48.226+00	t	f
15	6	sdfg	2025-06-20 11:00:00+00	2025-06-20 12:00:00+00	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:54:47.318+00	2025-06-08 08:53:26.589+00	draft	2025-06-08 08:53:29.734+00	2025-06-08 08:54:47.321+00	f	t
14	6	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:53:26.606+00	2025-06-08 08:53:26.589+00	draft	2025-06-08 08:53:26.642+00	2025-06-08 08:53:26.642+00	f	f
17	7	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:54:51.388+00	2025-06-08 08:54:51.388+00	draft	2025-06-08 08:54:51.391+00	2025-06-08 08:54:51.391+00	f	f
3	1	sfdahjmklfdsq	2025-06-15 12:00:00+00	2025-06-15 15:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "qsdfsdgfqsd", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 07:57:51.957+00	2025-06-08 07:57:09.587+00	published	2025-06-08 07:57:51.976+00	2025-06-08 07:57:51.976+00	t	f
1	1	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 07:57:09.596+00	2025-06-08 07:57:09.587+00	draft	2025-06-08 07:57:09.609+00	2025-06-08 07:57:09.61+00	f	f
2	1	sfdahjmklfdsq	2025-06-15 12:00:00+00	2025-06-15 15:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "qsdfsdgfqsd", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 07:57:41.543+00	2025-06-08 07:57:09.587+00	draft	2025-06-08 07:57:13.556+00	2025-06-08 07:57:41.544+00	f	t
18	7	fgsdfg	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:55:11.852+00	2025-06-08 08:54:51.388+00	draft	2025-06-08 08:54:53.341+00	2025-06-08 08:55:11.854+00	t	t
6	2	Rechtendoortocht	2025-06-22 12:00:00+00	2025-06-22 15:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "ghc", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:25:23.372+00	2025-06-08 08:07:20.09+00	published	2025-06-08 08:25:23.378+00	2025-06-08 08:25:23.379+00	t	f
4	2	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:07:20.094+00	2025-06-08 08:07:20.09+00	draft	2025-06-08 08:07:20.1+00	2025-06-08 08:07:20.102+00	f	f
5	2	Rechtendoortocht	2025-06-22 12:00:00+00	2025-06-22 15:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "ghc", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:25:20.901+00	2025-06-08 08:07:20.09+00	draft	2025-06-08 08:07:26.049+00	2025-06-08 08:25:20.904+00	f	t
9	3	kapoenen	2025-06-28 16:00:00+00	2025-06-28 18:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:30:43.072+00	2025-06-08 08:25:27.748+00	published	2025-06-08 08:30:43.08+00	2025-06-08 08:30:43.08+00	t	f
7	3	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:25:27.751+00	2025-06-08 08:25:27.748+00	draft	2025-06-08 08:25:27.764+00	2025-06-08 08:25:27.764+00	f	f
8	3	kapoenen	2025-06-28 16:00:00+00	2025-06-28 18:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:30:41.017+00	2025-06-08 08:25:27.748+00	draft	2025-06-08 08:29:31.775+00	2025-06-08 08:30:41.024+00	f	t
12	5	\N	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:45:52.298+00	2025-06-08 08:45:52.296+00	draft	2025-06-08 08:45:52.319+00	2025-06-08 08:45:52.32+00	f	f
13	5	fqs	\N	\N	\N	f	f	f	De inschrijvingen voor deze activiteit zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 08:45:56.797+00	2025-06-08 08:45:52.296+00	draft	2025-06-08 08:45:55.791+00	2025-06-08 08:45:56.8+00	t	t
\.


--
-- Data for Name: _activiteiten_v_version_division; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._activiteiten_v_version_division ("order", parent_id, value, id) FROM stdin;
1	2	kapoenen	7
1	3	kapoenen	8
1	5	kapoenen	14
1	6	kapoenen	15
1	8	kapoenen	26
1	9	kapoenen	27
1	13	kapoenen	32
1	15	wouters	47
1	16	wouters	48
1	18	wouters	56
\.


--
-- Data for Name: _activiteiten_v_version_enrollment_settings_custom_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._activiteiten_v_version_enrollment_settings_custom_questions (_order, _parent_id, id, question, required, _uuid) FROM stdin;
\.


--
-- Data for Name: banner_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banner_images (id, name, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename) FROM stdin;
1	Kapoenen aan het wandelen	Banner afbeelding: Kapoenen aan het wandelen	2025-06-08 07:59:12.46+00	2025-06-08 07:59:12.326+00	\N	\N	kapoenenkamp24-29.jpg	image/jpeg	544827	3500	955	50	50	\N	1200	300	image/jpeg	85677	kapoenenkamp24-29-1200x300.jpg	\N	400	100	image/jpeg	12033	kapoenenkamp24-29-400x100.jpg
\.


--
-- Data for Name: camps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.camps (id, title, start_date, end_date, banner_image_id, enrollment_settings_enabled, enrollment_settings_closed, enrollment_settings_hide_button, enrollment_settings_closed_message, enrollment_settings_enrollment_link, enrollment_settings_info_document_id, enrollment_settings_enrollment_deadline, enrollment_settings_custom_message, enrollment_settings_is_paid, enrollment_settings_price_per_child, enrollment_settings_payment_instructions, updated_at, created_at, _status) FROM stdin;
1	Kapoenenkamp 2025	2025-06-13 12:00:00+00	2025-06-14 12:00:00+00	1	t	f	f	De inschrijvingen voor dit kamp zijn helaas gesloten.	/inschrijven/kampen/1	1	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	t	30	OVerschrijven naar BEfhqsdfqsdl	2025-06-08 08:00:57.379+00	2025-06-08 07:58:06.996+00	published
\.


--
-- Data for Name: _camps_v; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._camps_v (id, parent_id, version_title, version_start_date, version_end_date, version_banner_image_id, version_enrollment_settings_enabled, version_enrollment_settings_closed, version_enrollment_settings_hide_button, version_enrollment_settings_closed_message, version_enrollment_settings_enrollment_link, version_enrollment_settings_info_document_id, version_enrollment_settings_enrollment_deadline, version_enrollment_settings_custom_message, version_enrollment_settings_is_paid, version_enrollment_settings_price_per_child, version_enrollment_settings_payment_instructions, version_updated_at, version_created_at, version__status, created_at, updated_at, latest, autosave) FROM stdin;
3	1	Kapoenenkamp 2025	2025-06-13 12:00:00+00	2025-06-14 12:00:00+00	1	t	f	f	De inschrijvingen voor dit kamp zijn helaas gesloten.	/inschrijven/kampen/1	1	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	t	30	OVerschrijven naar BEfhqsdfqsdl	2025-06-08 08:00:57.379+00	2025-06-08 07:58:06.996+00	published	2025-06-08 08:00:57.395+00	2025-06-08 08:00:57.397+00	t	f
1	1	\N	\N	\N	\N	f	f	f	De inschrijvingen voor dit kamp zijn helaas gesloten.		\N	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	f	\N	\N	2025-06-08 07:58:06.998+00	2025-06-08 07:58:06.996+00	draft	2025-06-08 07:58:07.009+00	2025-06-08 07:58:07.009+00	f	f
2	1	Kapoenenkamp 2025	2025-06-13 12:00:00+00	2025-06-14 12:00:00+00	1	t	f	f	De inschrijvingen voor dit kamp zijn helaas gesloten.	/inschrijven/kampen/1	1	\N	Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.	t	30	OVerschrijven naar BEfhqsdfqsdl	2025-06-08 08:00:53.06+00	2025-06-08 07:58:06.996+00	draft	2025-06-08 07:58:12.188+00	2025-06-08 08:00:53.063+00	f	t
\.


--
-- Data for Name: _camps_v_version_division; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._camps_v_version_division ("order", parent_id, value, id) FROM stdin;
1	2	kapoenen	13
1	3	kapoenen	14
\.


--
-- Data for Name: _camps_v_version_enrollment_settings_custom_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._camps_v_version_enrollment_settings_custom_questions (_order, _parent_id, id, question, required, _uuid) FROM stdin;
1	2	7	Wil je carpoolen?	t	6845431daa282d013827ab51
1	3	8	Wil je carpoolen?	t	6845431daa282d013827ab51
\.


--
-- Data for Name: random_afbeeldingen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.random_afbeeldingen (id, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
\.


--
-- Data for Name: _info_page_v; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._info_page_v (id, version_title, version_intro, version_hero_image_id, version__status, version_updated_at, version_created_at, created_at, updated_at, latest, autosave) FROM stdin;
\.


--
-- Data for Name: _info_page_v_version_pillars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._info_page_v_version_pillars (_order, _parent_id, id, heading, body, _uuid) FROM stdin;
\.


--
-- Data for Name: _inschrijven_page_v; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._inschrijven_page_v (id, version_title, version_subtitle, version_cta_button_text, version_cta_button_url, version_cta_subtext, version_why_join_title, version_existing_members_section_title, version_existing_members_section_content, version_existing_members_section_info_box_title, version_existing_members_section_info_box_content, version_divisions_title, version_divisions_subtitle, version_practical_info_title, version_final_cta_section_title, version_final_cta_section_content, version_final_cta_section_button_text, version__status, version_updated_at, version_created_at, created_at, updated_at, latest, autosave) FROM stdin;
1	Inschrijven bij Scouts Sint-Johannes	Word lid of hernieuw je inschrijving voor een nieuw jaar vol avonturen!	Schrijf je nu in!	https://scouts-sint-johannes.stamhoofd.be	Via ons online inschrijvingssysteem Stamhoofd	Waarom lid worden/blijven?	Lid worden	Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?\n\nIeder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.\nBij het tabblad 'agenda/ratel' vind je steeds terug waar en wanneer er vergadering plaatsvindt.	Hoe schrijf ik mijn kind in?	Leden die vorig jaar al ingeschreven waren kunnen zich inloggen op de website van stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kun je de gegevens van het lid controleren. Wanneer je het lidgeld betaald hebt, is je kind ingeschreven. Zijn er binnen je gezin nieuwe leden? Dan klik je bij 'inschrijven' 'nieuw lid toevoegen'.\n\nNieuwe leden maken een account aan op stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kom je terecht op de pagina waar je je zoon/dochter kunt inschrijven met zijn/haar gegevens. Je kunt meerdere kinderen inschrijven onder hetzelfde account. Wanneer dat gebeurt is, ga je naar het tabblad 'afrekeningen'. Daar zie je onderaan de pagina hoeveel je moet overschrijven naar het juiste rekeningnummer. Dat blijft even staan totdat wij de betaling goedkeurden, wat soms eventjes kan duren. Bij vragen kun je ons steeds bereiken via groepsleiding@scoutssintjohannes.be.\n\nHoeveel bedraagt het lidgeld?\n\nHet lidgeld bedraagt 45 euro per kind.\nVanaf 3 kinderen ingeschreven in de scouts bedraagt het 35 euro per kind.\nHet lidgeld is voor de verzekering die vanuit Scouts en Gidsen Vlaanderen gevraagd wordt.\n\nEr is ook een mogelijkheid voor verminderd lidgeld. We willen ieder kind de kans geven om lid te worden van scouting. Geld mag daarbij geen rol spelen. Voor wie het financieel wat moeilijker is, bestaat het verminderd lidgeld. Je betaalt dan 15 euro lidgeld.	Onze takken	Bij de scouts is er voor elke leeftijd een aangepast programma. Ontdek welke tak bij jouw leeftijd past!	Praktische informatie	Klaar voor een nieuw scoutsjaar?	Nieuwe leden: word deel van onze scouts familie!\nBestaande leden: hernieuw je inschrijving voor het komende jaar!	Start je inschrijving hier!	draft	2025-06-13 15:12:59.933+00	2025-06-13 15:12:59.931+00	2025-06-13 15:12:59.943+00	2025-06-13 15:12:59.943+00	t	f
\.


--
-- Data for Name: _inschrijven_page_v_version_practical_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._inschrijven_page_v_version_practical_info (_order, _parent_id, id, icon, title, content, _uuid) FROM stdin;
1	1	1	calendar	Wanneer?	Elke zaterdag van 14u tot 17u30 (behalve tijdens schoolvakanties). We organiseren ook weekends en kampen doorheen het jaar!	684c3ffb63b18b001d7d1939
2	1	2	mapPin	Waar?	Onze lokalen bevinden zich in het hart van onze gemeente. Het exacte adres ontvang je na inschrijving.	684c3ffb63b18b001d7d193a
3	1	3	\N	Lidgeld	Het jaarlijkse lidgeld bedraagt €50. Dit omvat verzekering, activiteiten en het lidmaatschap bij Scouts en Gidsen Vlaanderen. Voor bestaande leden: vergeet niet je lidgeld te vernieuwen voor het nieuwe scoutsjaar!	684c3ffb63b18b001d7d193b
4	1	4	\N	Uniform	Elk lid draagt een scouts uniform bestaande uit een beige hemd en groene broek/rok. Das en kentekens van de groep kan je bij ons aankopen.	684c3ffb63b18b001d7d193c
\.


--
-- Data for Name: _inschrijven_page_v_version_why_join_reasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._inschrijven_page_v_version_why_join_reasons (_order, _parent_id, id, icon, title, description, _uuid) FROM stdin;
1	1	1	users	Nieuwe Vrienden	Maak vrienden voor het leven in een hechte groep	684c3ffb63b18b001d7d1935
2	1	2	star	Avontuur	Beleef elke week nieuwe avonturen en uitdagingen	684c3ffb63b18b001d7d1936
3	1	3	heart	Persoonlijke Groei	Ontwikkel vaardigheden en ontdek je talenten	684c3ffb63b18b001d7d1937
4	1	4	mapPin	Natuur	Kom buiten, ontdek de natuur en leer haar respecteren	684c3ffb63b18b001d7d1938
\.


--
-- Data for Name: weekends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.weekends (id, title, start_date, end_date, banner_image_id, enrollment_settings_enabled, enrollment_settings_closed, enrollment_settings_hide_button, enrollment_settings_closed_message, enrollment_settings_enrollment_link, enrollment_settings_info_document_id, enrollment_settings_enrollment_deadline, enrollment_settings_custom_message, enrollment_settings_is_paid, enrollment_settings_price_per_child, enrollment_settings_payment_instructions, updated_at, created_at, _status) FROM stdin;
\.


--
-- Data for Name: _weekends_v; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._weekends_v (id, parent_id, version_title, version_start_date, version_end_date, version_banner_image_id, version_enrollment_settings_enabled, version_enrollment_settings_closed, version_enrollment_settings_hide_button, version_enrollment_settings_closed_message, version_enrollment_settings_enrollment_link, version_enrollment_settings_info_document_id, version_enrollment_settings_enrollment_deadline, version_enrollment_settings_custom_message, version_enrollment_settings_is_paid, version_enrollment_settings_price_per_child, version_enrollment_settings_payment_instructions, version_updated_at, version_created_at, version__status, created_at, updated_at, latest, autosave) FROM stdin;
\.


--
-- Data for Name: _weekends_v_version_division; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._weekends_v_version_division ("order", parent_id, value, id) FROM stdin;
\.


--
-- Data for Name: _weekends_v_version_enrollment_settings_custom_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._weekends_v_version_enrollment_settings_custom_questions (_order, _parent_id, id, question, required, _uuid) FROM stdin;
\.


--
-- Data for Name: activiteiten_division; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activiteiten_division ("order", parent_id, value, id) FROM stdin;
1	1	kapoenen	1
1	2	kapoenen	2
1	3	kapoenen	3
1	6	wouters	4
\.


--
-- Data for Name: activiteiten_enrollment_settings_custom_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activiteiten_enrollment_settings_custom_questions (_order, _parent_id, id, question, required) FROM stdin;
\.


--
-- Data for Name: camps_division; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.camps_division ("order", parent_id, value, id) FROM stdin;
1	1	kapoenen	1
\.


--
-- Data for Name: camps_enrollment_settings_custom_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.camps_enrollment_settings_custom_questions (_order, _parent_id, id, question, required) FROM stdin;
1	1	6845431daa282d013827ab51	Wil je carpoolen?	t
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollments (id, participant_email, target_type, target_id, target_title, number_of_children, contact_info_email, additional_options_comments, additional_options_custom_answers, total_price, submitted_at, status, updated_at, created_at) FROM stdin;
1	jelledegeest@hotmail.be	camps	1	Kapoenenkamp 2025	1	jelledegeest@hotmail.be	fdqsfqsd	{"Wil je carpoolen?": "fqsdfds"}	30	2025-06-08 08:01:18.206+00	paid	2025-06-08 08:09:28.083+00	2025-06-08 08:01:18.206+00
\.


--
-- Data for Name: enrollments_children; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollments_children (_order, _parent_id, id, participant_info_first_name, participant_info_last_name) FROM stdin;
1	1	6845434edda0ab001cbe87be	Jelle	De Geest
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, start_date, end_date, description, button_text, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: homepage_hero_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.homepage_hero_images (id, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
\.


--
-- Data for Name: homepage_heros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.homepage_heros (id, name, presence, home_hero_image_id, title, description, button_text, button_link, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: info_page; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.info_page (id, title, intro, hero_image_id, _status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: info_page_pillars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.info_page_pillars (_order, _parent_id, id, heading, body) FROM stdin;
\.


--
-- Data for Name: inschrijven_page; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inschrijven_page (id, title, subtitle, cta_button_text, cta_button_url, cta_subtext, why_join_title, existing_members_section_title, existing_members_section_content, existing_members_section_info_box_title, existing_members_section_info_box_content, divisions_title, divisions_subtitle, practical_info_title, final_cta_section_title, final_cta_section_content, final_cta_section_button_text, _status, updated_at, created_at) FROM stdin;
1	Inschrijven bij Scouts Sint-Johannes	Word lid of hernieuw je inschrijving voor een nieuw jaar vol avonturen!	Schrijf je nu in!	https://scouts-sint-johannes.stamhoofd.be	Via ons online inschrijvingssysteem Stamhoofd	Waarom lid worden/blijven?	Lid worden	Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?\n\nIeder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.\nBij het tabblad 'agenda/ratel' vind je steeds terug waar en wanneer er vergadering plaatsvindt.	Hoe schrijf ik mijn kind in?	Leden die vorig jaar al ingeschreven waren kunnen zich inloggen op de website van stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kun je de gegevens van het lid controleren. Wanneer je het lidgeld betaald hebt, is je kind ingeschreven. Zijn er binnen je gezin nieuwe leden? Dan klik je bij 'inschrijven' 'nieuw lid toevoegen'.\n\nNieuwe leden maken een account aan op stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kom je terecht op de pagina waar je je zoon/dochter kunt inschrijven met zijn/haar gegevens. Je kunt meerdere kinderen inschrijven onder hetzelfde account. Wanneer dat gebeurt is, ga je naar het tabblad 'afrekeningen'. Daar zie je onderaan de pagina hoeveel je moet overschrijven naar het juiste rekeningnummer. Dat blijft even staan totdat wij de betaling goedkeurden, wat soms eventjes kan duren. Bij vragen kun je ons steeds bereiken via groepsleiding@scoutssintjohannes.be.\n\nHoeveel bedraagt het lidgeld?\n\nHet lidgeld bedraagt 45 euro per kind.\nVanaf 3 kinderen ingeschreven in de scouts bedraagt het 35 euro per kind.\nHet lidgeld is voor de verzekering die vanuit Scouts en Gidsen Vlaanderen gevraagd wordt.\n\nEr is ook een mogelijkheid voor verminderd lidgeld. We willen ieder kind de kans geven om lid te worden van scouting. Geld mag daarbij geen rol spelen. Voor wie het financieel wat moeilijker is, bestaat het verminderd lidgeld. Je betaalt dan 15 euro lidgeld.	Onze takken	Bij de scouts is er voor elke leeftijd een aangepast programma. Ontdek welke tak bij jouw leeftijd past!	Praktische informatie	Klaar voor een nieuw scoutsjaar?	Nieuwe leden: word deel van onze scouts familie!\nBestaande leden: hernieuw je inschrijving voor het komende jaar!	Start je inschrijving hier!	draft	2025-06-13 15:12:59.933+00	2025-06-13 15:12:59.931+00
\.


--
-- Data for Name: inschrijven_page_practical_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inschrijven_page_practical_info (_order, _parent_id, id, icon, title, content) FROM stdin;
1	1	684c3ffb63b18b001d7d1939	calendar	Wanneer?	Elke zaterdag van 14u tot 17u30 (behalve tijdens schoolvakanties). We organiseren ook weekends en kampen doorheen het jaar!
2	1	684c3ffb63b18b001d7d193a	mapPin	Waar?	Onze lokalen bevinden zich in het hart van onze gemeente. Het exacte adres ontvang je na inschrijving.
3	1	684c3ffb63b18b001d7d193b	\N	Lidgeld	Het jaarlijkse lidgeld bedraagt €50. Dit omvat verzekering, activiteiten en het lidmaatschap bij Scouts en Gidsen Vlaanderen. Voor bestaande leden: vergeet niet je lidgeld te vernieuwen voor het nieuwe scoutsjaar!
4	1	684c3ffb63b18b001d7d193c	\N	Uniform	Elk lid draagt een scouts uniform bestaande uit een beige hemd en groene broek/rok. Das en kentekens van de groep kan je bij ons aankopen.
\.


--
-- Data for Name: inschrijven_page_why_join_reasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inschrijven_page_why_join_reasons (_order, _parent_id, id, icon, title, description) FROM stdin;
1	1	684c3ffb63b18b001d7d1935	users	Nieuwe Vrienden	Maak vrienden voor het leven in een hechte groep
2	1	684c3ffb63b18b001d7d1936	star	Avontuur	Beleef elke week nieuwe avonturen en uitdagingen
3	1	684c3ffb63b18b001d7d1937	heart	Persoonlijke Groei	Ontwikkel vaardigheden en ontdek je talenten
4	1	684c3ffb63b18b001d7d1938	mapPin	Natuur	Kom buiten, ontdek de natuur en leer haar respecteren
\.


--
-- Data for Name: leiders_foto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leiders_foto (id, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
1	2025-06-08 21:01:36.684+00	2025-06-08 21:01:36.58+00	\N	\N	Stoel.png	image/png	13884331	3024	4032	50	50
\.


--
-- Data for Name: leiders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leiders (id, name, year, stop_year, totem, totem_beschrijving, description, image_id, phone_number, email, kapoenen_naam, wouter_naam, updated_at, created_at) FROM stdin;
1	Jelle De Geest	2024	\N	Sperwer	fdsSDFSD	FSQDFDSQ	1	0471930175	jelledegeest@hotmail.be	Gigi	\N	2025-06-08 23:55:03.376+00	2025-06-08 21:01:47.31+00
\.


--
-- Data for Name: leiders_takken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leiders_takken ("order", parent_id, value, id) FROM stdin;
1	1	kapoenen	5
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: photo_albums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photo_albums (id, name, year, tak, link, cover_image_id, updated_at, created_at, location) FROM stdin;
1	Zomerkamp 2024 - Kapoenen	2024	kapoenen	https://photos.google.com	1	2025-06-13 12:47:42.758+00	2025-06-13 12:47:42.756+00	\N
2	Paaskamp 2024 - Wouters	2024	wouters	https://photos.google.com	1	2025-06-13 12:47:42.768+00	2025-06-13 12:47:42.768+00	\N
4	Groepsdag 2024	2024	groepsactiviteit	https://photos.google.com	1	2025-06-13 12:47:42.781+00	2025-06-13 12:47:42.781+00	\N
5	Zomerkamp 2023 - Givers	2023	givers	https://photos.google.com	1	2025-06-13 12:47:42.785+00	2025-06-13 12:47:42.785+00	\N
6	Winterweekend 2023 - Jin	2023	jin	https://photos.google.com	1	2025-06-13 12:47:42.788+00	2025-06-13 12:47:42.788+00	\N
7	Kerstfeest 2023	2023	groepsactiviteit	https://photos.google.com	1	2025-06-13 12:47:42.791+00	2025-06-13 12:47:42.791+00	\N
8	Paaskamp 2023 - Kapoenen	2023	kapoenen	https://photos.google.com	1	2025-06-13 12:47:42.793+00	2025-06-13 12:47:42.793+00	\N
9	Halloweentocht 2023 - Wouters	2023	wouters	https://photos.google.com	1	2025-06-13 12:47:42.796+00	2025-06-13 12:47:42.796+00	\N
10	Zomerkamp 2022 - Jonggivers	2022	jonggivers	https://photos.google.com	1	2025-06-13 12:47:42.799+00	2025-06-13 12:47:42.799+00	\N
11	Sinterklaasfeest 2022	2022	groepsactiviteit	https://photos.google.com	1	2025-06-13 12:47:42.802+00	2025-06-13 12:47:42.802+00	\N
12	Pinksterweekend 2022 - Givers	2022	givers	https://photos.google.com	1	2025-06-13 12:47:42.804+00	2025-06-13 12:47:42.804+00	\N
3	Weekend Ardennen 2024 - Jonggivers	2024	jonggivers	https://photos.google.com	2	2025-06-13 14:11:09.824+00	2025-06-13 12:47:42.777+00	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	2025-06-08 07:57:06.032+00	2025-06-08 07:57:05.952+00	jelledegeest@hotmail.be	\N	\N	bf2994de39ae6c00076b756a7ac9996c712087a8ab00320ccd1818cd99eeb351	08082c9e3e60e13e6338631682b65d9f3a20b23ac31f7357d289676d133afd0877bf7a284e0c17a540f9a29cd0e9b0e7225bb5316c196a9c9551545b457f1d23272c2b53eb3302d007cbcb228c53e0336e817651ba4157edf1f2bcd020a13fd606d429f4e3479f6373aee7658b49f870b0e517519654018af166b5765252e25548aedbe57a965ee4e3f22abea1cfc97f1bc9cb714a894e0f748b39879ccd2adc1b8b790d8450bc96243a3a6d9e60e9831326bac6ae32cf7079e64908f0666cdb435d2180310a144f0e56543ca8d1c8f2be63433bb199d56e52936e60f63e3997a8a9f30fe4686415ff109578e69c9307585102fe102aa3d6a5992b511899d8c067d8d153c598c58fce31898eb6e1643bded70093a41f9825965faa809711bdfdb21a2ccf4d806d4949b2581e45d390355bd62a95d31e18645cb640f6527de4f20870fa6ddd4346aaa133b1e6fca2e0cb606e4d13de5e576fd17539631beb55757453f49f9a0b80916562028338467d638bdbcc483f568f546ad349d9ae5ac8dc9365a9225636cd9b9ccb9037948472c335b23bcae75f9884b2f12ca68b87ef3b36a2d243ac8e7fc23b5a44a0ae73d455bce945bba6c0ce5d32bea12e85937c0da2d6564326f176e43df42d702864eb1de86cbe47b73196ca1387fa4cf7e98e68e923518fbfa063c5d74be22c3932482616aa9141e44edca35cd55c227f7d7e42	0	\N
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, media_id, banner_images_id, activiteiten_id, leiders_id, leiders_foto_id, random_afbeeldingen_id, homepage_hero_images_id, homepage_heros_id, events_id, weekends_id, camps_id, enrollments_id, users_id, photo_albums_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2025-06-13 15:13:38.831+00	2025-06-07 22:46:33.768+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
2	camps-list	{"preset": null}	2025-06-08 07:58:06.113+00	2025-06-08 07:58:06.114+00
3	banner-images-list	{"preset": null}	2025-06-08 07:58:19.372+00	2025-06-08 07:58:19.373+00
4	media-list	{"preset": null}	2025-06-08 08:00:14.975+00	2025-06-08 08:00:14.975+00
5	weekends-list	{"preset": null}	2025-06-08 08:08:58.486+00	2025-06-08 08:08:58.487+00
1	activiteiten-list	{"limit": 10, "preset": null, "columns": [{"active": true, "accessor": "title"}, {"active": true, "accessor": "division"}, {"active": true, "accessor": "startDate"}, {"active": true, "accessor": "id"}, {"active": false, "accessor": "dateSuggestion"}, {"active": false, "accessor": "endDate"}, {"active": false, "accessor": "description"}, {"active": false, "accessor": "enrollmentSettings"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}, {"active": false, "accessor": "_status"}]}	2025-06-08 08:45:23.97+00	2025-06-08 07:57:08.381+00
6	homepage-heros-list	{"preset": null}	2025-06-08 09:09:20.594+00	2025-06-08 09:09:20.595+00
8	users-list	{"preset": null}	2025-06-08 09:09:23.259+00	2025-06-08 09:09:23.26+00
7	enrollments-list	{"limit": 10, "preset": null}	2025-06-08 09:09:33.845+00	2025-06-08 09:09:21.699+00
9	leiders-list	{"limit": 10, "preset": null}	2025-06-08 19:15:43.909+00	2025-06-08 19:06:50.425+00
10	leiders-foto-list	{"preset": null}	2025-06-08 21:01:29.61+00	2025-06-08 21:01:29.611+00
11	photoAlbums-list	{"preset": null}	2025-06-13 14:10:43.191+00	2025-06-13 14:10:43.192+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
2	\N	2	user	1
3	\N	3	user	1
4	\N	4	user	1
5	\N	5	user	1
6	\N	1	user	1
7	\N	6	user	1
9	\N	8	user	1
10	\N	7	user	1
12	\N	9	user	1
13	\N	10	user	1
14	\N	11	user	1
\.


--
-- Data for Name: weekends_division; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.weekends_division ("order", parent_id, value, id) FROM stdin;
\.


--
-- Data for Name: weekends_enrollment_settings_custom_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.weekends_enrollment_settings_custom_questions (_order, _parent_id, id, question, required) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: _activiteiten_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._activiteiten_v_id_seq', 18, true);


--
-- Name: _activiteiten_v_version_division_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._activiteiten_v_version_division_id_seq', 56, true);


--
-- Name: _activiteiten_v_version_enrollment_settings_custom_quest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._activiteiten_v_version_enrollment_settings_custom_quest_id_seq', 1, false);


--
-- Name: _camps_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._camps_v_id_seq', 3, true);


--
-- Name: _camps_v_version_division_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._camps_v_version_division_id_seq', 14, true);


--
-- Name: _camps_v_version_enrollment_settings_custom_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._camps_v_version_enrollment_settings_custom_questions_id_seq', 8, true);


--
-- Name: _info_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._info_page_v_id_seq', 1, false);


--
-- Name: _info_page_v_version_pillars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._info_page_v_version_pillars_id_seq', 1, false);


--
-- Name: _inschrijven_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._inschrijven_page_v_id_seq', 1, true);


--
-- Name: _inschrijven_page_v_version_practical_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._inschrijven_page_v_version_practical_info_id_seq', 4, true);


--
-- Name: _inschrijven_page_v_version_why_join_reasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._inschrijven_page_v_version_why_join_reasons_id_seq', 4, true);


--
-- Name: _weekends_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._weekends_v_id_seq', 1, false);


--
-- Name: _weekends_v_version_division_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._weekends_v_version_division_id_seq', 1, false);


--
-- Name: _weekends_v_version_enrollment_settings_custom_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._weekends_v_version_enrollment_settings_custom_questions_id_seq', 1, false);


--
-- Name: activiteiten_division_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activiteiten_division_id_seq', 4, true);


--
-- Name: activiteiten_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activiteiten_id_seq', 7, true);


--
-- Name: banner_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banner_images_id_seq', 1, true);


--
-- Name: camps_division_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.camps_division_id_seq', 1, true);


--
-- Name: camps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.camps_id_seq', 1, true);


--
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 1, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: homepage_hero_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.homepage_hero_images_id_seq', 1, false);


--
-- Name: homepage_heros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.homepage_heros_id_seq', 1, false);


--
-- Name: info_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.info_page_id_seq', 1, false);


--
-- Name: inschrijven_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inschrijven_page_id_seq', 1, true);


--
-- Name: leiders_foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leiders_foto_id_seq', 1, true);


--
-- Name: leiders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leiders_id_seq', 1, true);


--
-- Name: leiders_takken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leiders_takken_id_seq', 5, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 2, true);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 84, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 168, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 11, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 14, true);


--
-- Name: photo_albums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.photo_albums_id_seq', 12, true);


--
-- Name: random_afbeeldingen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.random_afbeeldingen_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: weekends_division_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.weekends_division_id_seq', 1, false);


--
-- Name: weekends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.weekends_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

