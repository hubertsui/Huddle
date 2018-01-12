﻿import { Issue } from '../shared/models/issue';
import { Category } from '../shared/models/category';
import { Reason } from '../shared/models/reason';
import { Metric } from '../shared/models/metric';
import { MetricValue } from '../shared/models/metricValue';
import { ReasonValue } from '../shared/models/reasonValue';
import { DateHelper } from '../utils/dateHelper';

export class ModelConverter {

    public static ToReasonListBackend(reasons: Array<Reason>,)
    {
        return reasons.map(reason => this.ToReasonBackend(reason));
    }

    public static ToReasonBackend(reason: Reason): any {        
        return {
            Id: reason.id,
            //issue is removed from reason
            //Issue: this.ToIssueBackend(reason.issue),
            Name: reason.name,
            State: reason.reasonState,
            ReasonTracking: reason.reasonTracking,
            TrackingFrequency: reason.trackingFrequency,
            ValueType: reason.valueType,
            Metric: {
                Id: reason.metric.id,
                Name: reason.metric.name
            }
        };
    }

    public static ToIssueBackend(issue: Issue): any {
        return {
            Id: issue.id,
            Name: issue.name,
            Metric: issue.metric,
            State: issue.issueState,
            TargetGoal: issue.targetGoal,
            Category: this.toCategoryBackend(issue.category),
            StartDate: issue.startDate,
            Owner: issue.owner
        };
    }

    public static ToMetricBackend(metric: Metric): any {
        return {
            Id: metric.id,
            Name: metric.name,
            Issue: {
                Id: metric.issue.id,
                Name: metric.issue.name
            }       ,   
            TargetGoal: metric.targetGoal,            
            ValueType: metric.valueType,
            State: metric.metricState
        };
    }

    public static toCategoryBackend(category: Category): any {
        return {
            Id: category==null?0:category.id,
            Name: category==null?'':category.name
        };
    }

    public static toMetricValueBackend(metricValue: MetricValue) {
        return {
            Id: metricValue.id,
            InputDate: DateHelper.LocalToUTC(metricValue.inputDate),
            Value: metricValue.metricValues,
            Metric: this.ToIssueBackend(metricValue.metric)
        };
    }

    public static toReasonValueBackend(reasonValue: ReasonValue) {
        return {
            Id: reasonValue.id,
            InputDate: DateHelper.LocalToUTC(reasonValue.inputDate),
            Value: reasonValue.reasonMetricValues,
            Reason: this.ToReasonBackend(reasonValue.reason)
        };
    }
}