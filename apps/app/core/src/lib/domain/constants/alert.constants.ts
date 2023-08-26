import { MetricThresholdOperatorEnum } from '@metrikube/common';
import { Option } from "../value-objects"


export const OPERATORS: Option[] = [
    {
        label: 'Egal',
        value: MetricThresholdOperatorEnum.EQ
    },
    {
        label: 'Différent',
        value: MetricThresholdOperatorEnum.NEQ
    },
    {
        label: 'Strictement plus grand',
        value: MetricThresholdOperatorEnum.GT
    },
    {
        label: 'Plus grand ou égal',
        value: MetricThresholdOperatorEnum.GTE
    },
    {
        label: 'Strictement plus petit',
        value: MetricThresholdOperatorEnum.LT
    },
    {
        label: 'Plus petit ou égal',
        value: MetricThresholdOperatorEnum.LTE
    }
];
