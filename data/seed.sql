INSERT INTO plugin (id, name, type, description, instruction, category, credentialType, iconUrl)
VALUES ('1a1735ca-f552-4783-a509-2420011c0ad3', 'AWS', 'aws', 'aws plugin description', 'pas d''instructions pour le moment', 'cloud', 'aws', ''),
       ('1e0753e2-1b13-4f52-a57e-eba262bd947c', 'SQL Database', 'sql_database', 'database plugin description', 'pas d''instructions pour le moment', 'db', 'dbConnection', ''),
       ('da3439fd-f637-409c-8267-655a03a2e915', 'API Health Check', 'api_endpoint', 'api plugin description', 'pas d''instructions pour le moment', 'api', 'apiEndpoint', ''),
       ('acf0dbbd-4df4-4697-85d5-d91d2737bda6', 'Github', 'github', 'github plugin description', 'pas d''instructions pour le moment', 'versionning', 'github', '');

INSERT INTO metric (id, type, name, pluginId, isNotifiable)
VALUES ('c0f0aaad-ba2d-4b73-9e62-9c183b186e1c', 'api-endpoint-health-check', 'Ping Api', 'da3439fd-f637-409c-8267-655a03a2e915', true),
       ('1312c015-0634-45db-b8ee-68eeaf06dddc', 'aws-ec2-single-instance-usage', 'AWS EC2 instance cost', '1a1735ca-f552-4783-a509-2420011c0ad3', true),
       ('dc0589e0-f4dd-462c-a856-732192a7dc5e', 'aws-ec2-multiple-instances-usage', 'AWS EC2 multiple instance cost', '1a1735ca-f552-4783-a509-2420011c0ad3', false),
       ('0cbf1b5d-55fa-4756-8a9f-2cac45e430ed', 'github-last-issues', 'Github last ussues', 'acf0dbbd-4df4-4697-85d5-d91d2737bda6', false);

INSERT INTO plugin_to_metric (id, pluginId, metricId, resourceId, name, description, isActive)
VALUES ('3bb59e4c-271a-4b2a-b932-3c6578d9f52e', 'da3439fd-f637-409c-8267-655a03a2e915', 'c0f0aaad-ba2d-4b73-9e62-9c183b186e1c', '', 'Ping l''api jsonplaceholder',  null, true);

INSERT INTO credential (id, pluginId, type, value)
VALUES ('23566e03-0dc9-4b97-bc1f-611ea9a4d7b2', 'da3439fd-f637-409c-8267-655a03a2e915', 'apiEndpoint', 'eyJhcGlFbmRwb2ludCI6ICJodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdXNl
cnMifQo='),
       ('51818df1-9833-4cc3-a9cd-6592fee8ef60', 'acf0dbbd-4df4-4697-85d5-d91d2737bda6', 'github',
        'eyJhY2Nlc3NUb2tlbiI6ImdpdGh1Yl9wYXRfMTFBS1RYRFBBMHhVUGUzbFRUOTFXNl9CMXJzd1hwRGJCU01NTVZUUmdESE1PTUFVTHMwSkV3NlZpaHlYVjd3MFd1V01NTEZHUjRQZDNHVnA3UCIsIm93bmVyIjoibWV0cmlrdWJlIiwicmVwbyI6ImFwcCJ9');

INSERT INTO alert (id, pluginToMetricId, label, triggered, condition)
VALUES ('5607a60c-1dc9-455e-817a-59c3f82a176b', '3bb59e4c-271a-4b2a-b932-3c6578d9f52e', 'Alerte lorsuqe l''api mets + 10 ms à répondre', false, '{
  "field": "value",
  "operator": "gte",
  "threshold": 10
}');
