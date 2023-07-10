INSERT INTO plugin (id, name, type, description, instruction, category)
VALUES ('1a1735ca-f552-4783-a509-2420011c0ad3', 'AWS', 'aws', 'aws plugin description', 'pas d''instructions pour le moment', 'cloud'),
       ('1e0753e2-1b13-4f52-a57e-eba262bd947c', 'SQL Database', 'database', 'database plugin description', 'pas d''instructions pour le moment', 'db'),
       ('da3439fd-f637-409c-8267-655a03a2e915', 'API Health Check', 'api', 'api plugin description', 'pas d''instructions pour le moment', 'api'),
       ('acf0dbbd-4df4-4697-85d5-d91d2737bda6', 'Gihub', 'VCS', 'github plugin description', 'pas d''instructions pour le moment', 'versionning');

INSERT INTO credential (id, type, value, pluginId)
VALUES ('23566e03-0dc9-4b97-bc1f-611ea9a4d7b2', 'apiEndpoint', 'eyJhcGlFbmRwb2ludCI6ICJodHRwczovL2h0dHBzdGF0LnVzLzQwNCJ9Cg==', 'da3439fd-f637-409c-8267-655a03a2e915');

-- pour le moment on ne peut avoir qu'une seule alerte par metrique
INSERT INTO alert (id, label, triggered, condition, metricId)
VALUES ('5607a60c-1dc9-455e-817a-59c3f82a176b', 'Si l''api mets +300 ms à repondre on notifie', false, '{ "field": "value", "operator": "gte", "threshold": 300}', 'c0f0aaad-ba2d-4b73-9e62-9c183b186e1c');

INSERT INTO metric (id, type, name, resourceId, pluginId, alertId)
VALUES ('c0f0aaad-ba2d-4b73-9e62-9c183b186e1c', 'api_endpoint_health_check', 'Ping Api', '', 'da3439fd-f637-409c-8267-655a03a2e915', '5607a60c-1dc9-455e-817a-59c3f82a176b');
