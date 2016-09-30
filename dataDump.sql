--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE links (
    id integer NOT NULL,
    score integer DEFAULT 1,
    link character varying(255) NOT NULL,
    image character varying(255) DEFAULT 'http://image.flaticon.com/icons/svg/46/46080.svg'::character varying,
    timeposted timestamp with time zone DEFAULT now(),
    description character varying(255) NOT NULL,
    user_id integer
);


ALTER TABLE links OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE links_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE links_id_seq OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE links_id_seq OWNED BY links.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY links ALTER COLUMN id SET DEFAULT nextval('links_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY links (id, score, link, image, timeposted, description, user_id) FROM stdin;
1	1	https://www.ineedtosellmykidney.com	http://image.flaticon.com/icons/svg/46/46080.svg	2016-09-28 16:59:59.856646+02	I really need to do this guys	\N
2	1	https://www.silkroad.tor	http://image.flaticon.com/icons/svg/46/46080.svg	2016-09-28 17:27:04.066639+02	I have just the page for you!	1
3	1	https://www.hauntedhouse.co.uk	http://image.flaticon.com/icons/svg/46/46080.svg	2016-09-28 19:27:39.333436+02	Have you ever wondered what happens in the haunted house after every1's gone home?	1
4	1	https://www.google.de	http://image.flaticon.com/icons/svg/46/46080.svg	2016-09-29 11:54:05.793776+02	Hey, I found this awesome site, it lets you find almost anything on the web if you ask it right!	1
5	1	https://www.youtube.com	http://image.flaticon.com/icons/svg/46/46080.svg	2016-09-29 15:35:18.79348+02	Have you heard about this site yet? You can post funny videos of cats and stuff!	1
\.


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('links_id_seq', 5, true);


--
-- Name: links_link_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_link_key UNIQUE (link);


--
-- Name: links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

