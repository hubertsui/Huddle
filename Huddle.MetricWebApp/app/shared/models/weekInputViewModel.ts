import { MetricValue } from './metricValue';
import { ReasonValue } from './reasonValue';
import { WeekDay } from './weekDay';
import { Issue } from './issue';

export class WeekInputViewModel {
    readonly inputLength: number = 7;
    weekDay: WeekDay;
    isMetricValue: boolean;
    isWeeklyReason: boolean;
    metricValueArray = new Array<MetricValue>();
    reasonValueArray = new Array<ReasonValue>();
    constructor() {
        for (let i = 0; i < this.inputLength; i++){
            this.metricValueArray.push(new MetricValue());
            this.reasonValueArray.push(new ReasonValue());
        }
    }
    public resetIssue(issue: Issue) {
        //this.metricValueArray.forEach(metricValue => {
        //    metricValue.issue = issue;
        //});
    }
}