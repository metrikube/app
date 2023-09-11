import { WidgetModel, githubProviderMock } from "@metrikube/core"
import { githubLastIssues, githubLastPrs } from "./metrics.mock"


export const lastPullRequestMock: WidgetModel = {
    id: "094bf35c-5d7c-4e0f-b88c-7372c318b32c",
    name: "Les 5 dernières Pull Requests",
    description: undefined,
    resourceId: undefined,
    plugin: githubProviderMock,
    metric: githubLastPrs,
    data: [
        {
            title: "Feat/aws",
            number: 95,
            url: "https://api.github.com/repos/metrikube/app/pulls/95",
            author: "ImRyuk",
            status: "closed"
        },
        {
            title: "style: Rework some components",
            number: 94,
            url: "https://api.github.com/repos/metrikube/app/pulls/94",
            author: "Diarit-S",
            status: "open"
        },
        {
            title: "refacto : clean hexagonal architecture",
            number: 93,
            url: "https://api.github.com/repos/metrikube/app/pulls/93",
            author: "JESSYV96",
            status: "closed"
        },
        {
            title: "feat(github-plugin): update to use new endpoints",
            number: 92,
            url: "https://api.github.com/repos/metrikube/app/pulls/92",
            author: "louis-genestier",
            status: "closed"
        },
        {
            title: "Refacto/optimization",
            number: 91,
            url: "https://api.github.com/repos/metrikube/app/pulls/91",
            author: "JESSYV96",
            status: "closed"
        }
    ]
}

export const lastIssuesMock: WidgetModel = {
    id: "094bf35c-5d7c-4e0f-b88c-7372c318b",
    name: "Les 5 dernières issues",
    description: undefined,
    resourceId: undefined,
    plugin: githubProviderMock,
    metric: githubLastIssues,
    data: [
        {
            title: "Beautify dashboard",
            number: 89,
            url: "https://github.com/metrikube/app/issues/89",
            author: "Diarit-S",
            status: "open"
        },
        {
            title: "US : Afficher le dashboard avec les métriques choisie",
            number: 62,
            url: "https://github.com/metrikube/app/issues/62",
            author: "awuzi",
            status: "closed"
        },
        {
            title: "US : Realtime dashbaord",
            number: 61,
            url: "https://github.com/metrikube/app/issues/61",
            author: "awuzi",
            status: "closed"
        },
        {
            title: "Create a generic card component for metrics",
            number: 56,
            url: "https://github.com/metrikube/app/issues/56",
            author: "Diarit-S",
            status: "closed"
        },
        {
            title: "Make a function retrieve all plugin category",
            number: 55,
            url: "https://github.com/metrikube/app/issues/55",
            author: "JESSYV96",
            status: "open"
        }
    ]
}

export const singleInstanceEC2Mock: WidgetModel = {
    id: "bf32add2-ae8a-42b0-af8f-5a30a851a3ad",
    name: "AWS Second Bucket",
    description: undefined,
    resourceId: null,
    plugin: {
        id: "c5cced6d-095e-4b98-af8c-0d5378a43e24",
        name: "AWS",
        type: "aws",
        description: "Amazon Web Services Plugin"
    },
    metric: {
        id: "02426c10-11dc-42a4-a543-0055d9d2322d",
        name: "AWS Bucket single instance cost",
        type: "aws-bucket-single-instance",
        isNotifiable: false
    },
    data: {
        id: "second-bucket",
        name: "second-bucket",
        region: "eu-west-3",
        cost: 7,
        currency: "USD",
        additionnalData: {
            "creationDate": "2022-09-06T08:44:09.000Z"
        }
    }
}

export const singleBucketS3Mock: WidgetModel = {
    id: "094bf35c-5d7c-4e0f-b88c-73318b32c",
    name: "S3 First Bucket",
    description: undefined,
    resourceId: undefined,
    plugin: {
        id: "c5aded82-094e-7n98-af8c-0d4788a43e24",
        name: "AWS",
        type: "aws",
        description: "Amazon Web Services Plugin"
    },
    metric: {
        id: "02426c10-11dc-42a4-a543-0055d9d2322d",
        name: "AWS Bucket single instance cost",
        type: "aws-bucket-single-instance",
        isNotifiable: false
    },
    data: {
        id: "first-bucket",
        name: "first-bucket",
        region: "eu-west-3",
        cost: "10",
        currency: "USD",
        additionnalData: {
            "creationDate": "2022-09-03T20:47:09.000Z"
        }
    }
}

export const listBucketS3Mock: WidgetModel = {
    id: "20f96417-5333-4dc0-979d-2b4d73f4ec80",
    name: "AWS S3 List of buckets",
    description: undefined,
    resourceId: undefined,
    plugin: {
        id: "c5cced6d-095e-4b98-af8c-0d5378a43e24",
        name: "AWS",
        type: "aws",
        description: "Amazon Web Services Plugin"
    },
    metric: {
        id: "5dda4d85-ec61-49f6-86a5-43e64d2576f7",
        name: "AWS Bucket multiple instances cost",
        type: "aws-bucket-multiple-instances",
        isNotifiable: false
    },
    data: [
        {
            id: "first-bucket",
            name: "first-bucket",
            cost: "10",
            currency: "USD",
            additionnalData: {
                creationDate: "2022-11-17T10:59:05.000Z"
            }
        },
        {
            id: "second-bucket",
            name: "second-bucket",
            cost: "7",
            currency: "USD",
            additionnalData: {
                creationDate: "2022-09-03T20:47:09.000Z"
            }
        },
        {
            id: "third-bucket",
            name: "third-bucket",
            cost: "20",
            currency: "EUR",
            additionnalData: {
                "creationDate": "2022-09-06T08:44:09.000Z"
            }
        }
    ]
}

export const nbRequestsPerHour: WidgetModel = {
    id: "rregergrgg",
    name: "MariaDB - Requête par heures (12 dernières heures)",
    description: undefined,
    resourceId: undefined,
    plugin: {
        id: "maria-db",
        name: "Maria DB",
        type: "sql_database",
        description: "Maria DB plugin"
    },
    metric: {
        id: "b26edf54-a2b2-4ff2-b747-64c761340a30",
        type: "database-queries",
        name: "SQL Database Usage",
        isNotifiable: false
    },
    data: {
        queries: [
            {
                hour: "2023-09-05 21:00:00",
                nbRequests: 12
            },
            {
                hour: "2023-09-05 22:00:00",
                nbRequests: 33
            },
            {
                hour: "2023-09-05 23:00:00",
                nbRequests: 45
            },
            {
                hour: "2023-09-06 00:00:00",
                nbRequests: 67
            },
            {
                hour: "2023-09-06 01:00:00",
                nbRequests: 34
            },
            {
                hour: "2023-09-06 02:00:00",
                nbRequests: 50
            },
            {
                hour: "2023-09-06 03:00:00",
                nbRequests: 78
            },
            {
                hour: "2023-09-06 04:00:00",
                nbRequests: 67
            },
            {
                hour: "2023-09-06 05:00:00",
                nbRequests: 45
            },
            {
                hour: "2023-09-06 06:00:00",
                nbRequests: 426
            },
            {
                hour: "2023-09-06 07:00:00",
                nbRequests: 677
            },
            {
                hour: "2023-09-06 08:00:00",
                nbRequests: 120
            }
        ],
        date: "2023-09-06T08:40:12.106Z"
    }
}

export const dbSizeMock: WidgetModel = {
    id: "db-size213",
    name: "MariaDB - Taille db",
    description: undefined,
    resourceId: undefined,
    plugin: {
        id: "maria-db",
        name: "Maria DB",
        type: "sql_database",
        description: "Maria DB plugin"
    },
    metric: {
        id: "9a18c04e-3643-4488-8d72-8e377fbf3f91",
        type: "database-size",
        name: "SQL Database Size",
        isNotifiable: false
    },
    data: {
        size: 0.0469, // Size en Mb
        numberOfTables: 4,
        numberOfTotalRows: 25,
        databaseName: "metrikube-test"
    }
}

export const slowQueries: WidgetModel = {
    id: "db-size213",
    name: "Database - Requêtes lente",
    description: undefined,
    resourceId: undefined,
    plugin: {
        id: "maria-db",
        name: "Maria DB",
        type: "sql_database",
        description: "Maria DB plugin"
    },
    metric: {
        id: "8233cf2a-0ae1-4b8f-9197-36b564a808b5",
        type: "database-slow-queries",
        name: "SQL Database Slow Queries",
        isNotifiable: false
    },
    data: [
        {
            executionTime: 1.1004,
            query: "CREATE SYSTEM_USER ? @? IDENTIFIED BY ?",
            date: "2023-09-05T09:01:45.231Z"
        },
        {
            executionTime: 0.5636,
            query: "SELECT `UPDATE_TIME` FROM `information_schema` . `TABLES`",
            date: "2023-08-30T06:34:09.059Z"
        },
        {
            executionTime: 0.0916,
            query: "SELECT `MAX_TIMER_WAIT` / ? AS `max_execution_time_seconds` , `AVG_TIMER_WAIT` / ? AS `executionTime` , `DIGEST_TEXT` AS QUERY , `LAST_SEEN` AS DATE FROM `performance_schema` . `events_statements_summary_by_digest` WHERE SCHEMA_NAME = ? ORDER BY `max_execution_time_seconds` DESC LIMIT ?",
            date: "2023-09-05T15:44:59.825Z"
        },
        {
            executionTime: 0.2320,
            query: "SHOW TABLES FROM `information_schema`",
            date: "2023-08-30T06:31:58.077Z"
        },
        {
            executionTime: 0.0569,
            query: "SELECT `DATE_FORMAT` ( `gl` . `event_time` , ? ) AS SQL_TSI_HOUR , COUNT ( * ) AS `nbRequests` FROM `mysql` . `general_log` `gl` JOIN `performance_schema` . `events_statements_history_long` `ps` ON `gl` . `thread_id` = `ps` . `EVENT_ID` WHERE `ps` . `CURRENT_SCHEMA` = ? AND `gl` . `command_type` = ? AND `gl` . `event_time` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR GROUP BY SQL_TSI_HOUR ORDER BY SQL_TSI_HOUR",
            date: "2023-09-05T10:44:15.407Z"
        },
        {
            executionTime: 0.1222,
            query: "SELECT * FROM `performance_schema` . `events_statements_history_long`",
            date: "2023-09-04T11:25:14.743Z"
        },
        {
            executionTime: 0.0501,
            query: "WITH `hours` AS ( SELECT `DATE_FORMAT` ( NOW ( ) - INTERVAL `n` SQL_TSI_HOUR , ? ) AS SQL_TSI_HOUR FROM ( SELECT ? AS `n` UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? ) `numbers` ) , `schema_requests` AS ( SELECT `DATE_FORMAT` ( `es` . `EVENT_TIME` , ? ) AS SQL_TSI_HOUR , COUNT ( * ) AS `nbRequests` FROM `mysql` . `general_log` `es` LEFT JOIN `information_schema` . `processlist` `p` ON `es` . `THREAD_ID` = `p` . `ID` WHERE `es` . `EVENT_TIME` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR AND `p` . `DB` IS NOT NULL GROUP BY SQL_TSI_HOUR ) SELECT `h` . `hour` , `IFNULL` ( `sr` . `nbRequests` , ? ) AS `nbRequests` FROM `hours` `h` LEFT JOIN `schema_requests` `sr` ON `h` . `hour` = `sr` . `hour` WHERE `h` . `hour` >= `DATE_FORMAT` ( NOW ( ) - INTERVAL ? SQL_TSI_HOUR , ? ) AND `h` . `hour` <= `DATE_FORMAT` ( NOW ( ) , ? ) ORDER BY `h` . `hour`",
            date: "2023-09-05T09:50:59.051Z"
        },
        {
            executionTime: 0.1957,
            query: "SELECT * FROM `setup_consumers` WHERE NAME LIKE ? AND `enabled` = ?",
            date: "2023-09-04T11:17:29.083Z"
        },
        {
            executionTime: 0.0498,
            query: "WITH `hours` AS ( SELECT `DATE_FORMAT` ( NOW ( ) - INTERVAL `n` SQL_TSI_HOUR , ? ) AS SQL_TSI_HOUR FROM ( SELECT ? AS `n` UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? ) `numbers` ) SELECT `h` . `hour` , `IFNULL` ( COUNT ( `es` . `EVENT_TIME` ) , ? ) AS `nbRequests` FROM `hours` `h` LEFT JOIN `mysql` . `general_log` `es` ON `DATE_FORMAT` ( `es` . `EVENT_TIME` , ? ) = `h` . `hour` AND `es` . `EVENT_TIME` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR LEFT JOIN `information_schema` . `processlist` `p` ON `es` . `THREAD_ID` = `p` . `ID` WHERE `p` . `DB` IS NOT NULL GROUP BY `h` . `hour` ORDER BY `h` . `hour`",
            date: "2023-09-05T08:38:36.792Z"
        },
        {
            executionTime: 0.0311,
            query: "WITH `hours` AS ( SELECT `DATE_FORMAT` ( NOW ( ) - INTERVAL `n` SQL_TSI_HOUR , ? ) AS SQL_TSI_HOUR , `DATE_FORMAT` ( NOW ( ) - INTERVAL ( `n` - ? ) SQL_TSI_HOUR , ? ) AS `next_hour` FROM ( SELECT ? AS `n` UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? ) `numbers` ) SELECT `h` . `hour` , `IFNULL` ( SUM ( `es` . `COUNT_STAR` ) , ? ) AS `nbRequests` FROM `hours` `h` LEFT JOIN `performance_schema` . `events_statements_summary_by_digest` `es` ON `es` . `QUERY_SAMPLE_SEEN` >= `h` . `hour` AND `es` . `QUERY_SAMPLE_SEEN` < `h` . `next_hour` AND `es` . `SCHEMA_NAME` NOT IN (...) AND `es` . `QUERY_SAMPLE_SEEN` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR GROUP BY `h` . `hour` ORDER BY `h` . `hour`",
            date: "2023-08-30T06:27:37.560Z"
        }
    ]
}

export const activeMetricsMock: WidgetModel[] = [
    singleBucketS3Mock,
    singleInstanceEC2Mock,
    listBucketS3Mock,
    lastPullRequestMock,
    lastIssuesMock,
    nbRequestsPerHour,
    dbSizeMock,
    slowQueries
]