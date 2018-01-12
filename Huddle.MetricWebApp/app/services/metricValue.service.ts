import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Subject,BehaviorSubject } from 'rxjs/Rx';
import { DataService } from '../services/data.service';
import { Issue } from '../shared/models/issue';
import { WeekDay } from '../shared/models/weekDay';
import { Reason } from '../shared/models/reason';
import { WeekInputViewModel } from '../shared/models/weekInputViewModel';
import { MetricValue } from '../shared/models/metricValue';
import { ReasonValue } from '../shared/models/reasonValue';
import { Constants } from '../shared/constants';
import { ModelConverter } from '../utils/modelConverter';
import { DateHelper } from '../utils/dateHelper';

@Injectable()
export class MetricValueService {
    //metricAndReasonVals: Array<WeekInputViewModel>;
    //metricAndReasonVals$: BehaviorSubject<WeekInputViewModel[]>;
    
    constructor(private dataService: DataService) {
        //this.metricAndReasonVals$ = <BehaviorSubject<WeekInputViewModel[]>>new BehaviorSubject(new Array<WeekInputViewModel>());
    }

    subscribeToMetricAndReasonValues(): Observable<WeekInputViewModel[]> {
        //return this.metricAndReasonVals$.asObservable();
        return null;
    }

    public getMetricAndReasonValues(metricIds: Array<number>, reasonIds: Array<number>, weekDay: WeekDay): Observable<Array<WeekInputViewModel>> {
        let activeObject: ReplaySubject<WeekInputViewModel[]> = new ReplaySubject(1);
        let splitChar = '-';
        let metricIdCombineStr: string = splitChar;
        if (metricIds.length > 0) {
            metricIdCombineStr = metricIds.map(a => a.toString())
                                          .reduce((x, y) => x + splitChar + y);
        }
        let reasonIdCombineStr: string = splitChar;
        if (reasonIds.length > 0) {
            reasonIdCombineStr = reasonIds.map(a => a.toString())
                                          .reduce((x, y) => x + splitChar + y);
        }
        let weekStartParam = DateHelper.getStartDateString(weekDay);
        this.dataService.getArray<WeekInputViewModel>(Constants.webAPI.metricValuesUrl + "/" + metricIdCombineStr + "/" + reasonIdCombineStr + '/' + weekStartParam)
            .subscribe((resp) => {
                activeObject.next(resp);
                //this.metricAndReasonVals = resp;
                //this.metricAndReasonVals$.next(resp);
            },
            (error) => { activeObject.error(error) });
        return activeObject;
    }

    public updateMetricAndReasonValues(metricVals: Array<Array<MetricValue>>, reasonVals: Array<Array<ReasonValue>>, jsonStr: string): Observable<boolean> {
        let activeObject: ReplaySubject<boolean> = new ReplaySubject(1);
        let originalData = JSON.parse(jsonStr);
        let originalMetricVals = (originalData['metricWeekInputViewModelArray'] as Array<WeekInputViewModel>).map(metricWeekVM => metricWeekVM.metricValueArray);
        let originalReasonVals = (originalData['reasonWeekInputViewModelArray'] as Array<WeekInputViewModel>).map(reasonWeekVM => reasonWeekVM.reasonValueArray);


        let toPostMetricVals = [];
        metricVals.forEach((mvArray, index1) => {            
            let tempMvArray = mvArray.filter((metricValue, index2) => {
                return originalMetricVals[index1][index2].metricValues != metricValue.metricValues; 
            });
            if (tempMvArray.length == 0)
                tempMvArray = [mvArray[0]];
            toPostMetricVals.push(tempMvArray);
        });


        let toPostReasonVals = [];
        reasonVals.forEach((rmArray, index1) => {            
            let tempRmArray = rmArray.filter((reasonMetric, index2) => {
                return originalReasonVals[index1][index2].reasonMetricValues != reasonMetric.reasonMetricValues;
            });
            if (tempRmArray.length == 0)
                tempRmArray = [rmArray[0]];
            toPostReasonVals.push(tempRmArray);
        });

        this.dataService.post(Constants.webAPI.metricValuesUrl, { metricValues: toPostMetricVals.map(mvArray => mvArray.map(mv => ModelConverter.toMetricValueBackend(mv))), reasonValues: toPostReasonVals.map(rvArray => rvArray.map(rv => ModelConverter.toReasonValueBackend(rv))) })
            .subscribe(
            resp => {
                activeObject.next(resp);
            },
            error => activeObject.error(error));
        return activeObject;
    }

    public updateMetricValues(issueMetrics:Array<MetricValue>,reasonMetrics:Array<Array<ReasonValue>>,jsonStr:string): Observable<boolean> {
        let activeObject: ReplaySubject<boolean> = new ReplaySubject(1);
        let originalData = JSON.parse(jsonStr);
        let originalIssueMetrics = (originalData['issueWeekInputviewModel'] as WeekInputViewModel).metricValueArray;
        let originalReasonMetrics = (originalData['reasonWeekInputViewModelArray'] as Array<WeekInputViewModel>).map(reasonWeekVM => reasonWeekVM.reasonValueArray);

        let toPostIssueMetrics = issueMetrics.filter((metricValue, index) => {
            return originalIssueMetrics[index].metricValues != metricValue.metricValues;
        });
        if (toPostIssueMetrics.length == 0)
            toPostIssueMetrics = [issueMetrics[0]];

        let toPostReasonMetrics = [];
        reasonMetrics.forEach((rmArray, index1) => {            
            let tempRmArray = rmArray.filter((reasonMetric, index2) => {
                return originalReasonMetrics[index1][index2].reasonMetricValues != reasonMetric.reasonMetricValues;
            });
            if (tempRmArray.length == 0)
                tempRmArray = [rmArray[0]];
            toPostReasonMetrics.push(tempRmArray);
        });

        this.dataService.post(Constants.webAPI.metricValuesUrl, { issueMetrics: toPostIssueMetrics.map(im => ModelConverter.toMetricValueBackend(im)), reasonMetrics: toPostReasonMetrics.map(rmArray => rmArray.map(rm => ModelConverter.toReasonValueBackend(rm))) })
            .subscribe(
            resp => {
                activeObject.next(resp);
            },
            error => activeObject.error(error));
        return activeObject;
    }

    public getMetricValues(issueId: number, reasonIds: Array<number>, weekDay: WeekDay): Observable<Array<WeekInputViewModel>> {
        let activeObject: ReplaySubject<WeekInputViewModel[]> = new ReplaySubject(1);
        let splitChar = '-';
        let reasonIdCombineStr: string = splitChar;
        if (reasonIds.length > 0) {
            reasonIdCombineStr = reasonIds.map(a => a.toString())
                                          .reduce((x, y) => x + splitChar + y);
        }
        let weekStartParam = DateHelper.getStartDateString(weekDay);
        this.dataService.getArray<WeekInputViewModel>(Constants.webAPI.metricValuesUrl + "/" + issueId + "/" + reasonIdCombineStr + '/' + weekStartParam)
            .subscribe((resp) => {
                activeObject.next(resp);
            },
            (error) => { activeObject.error(error) });
        return activeObject;
    }

    public getMetricReasonValuesJSON(metricWeekInputViewModelArray: Array<WeekInputViewModel>, reasonWeekInputViewModelArray: Array<WeekInputViewModel>): string {
        let jsonResult = JSON.stringify({ metricWeekInputViewModelArray: metricWeekInputViewModelArray, reasonWeekInputViewModelArray: reasonWeekInputViewModelArray });
        return jsonResult;
    }


    public getMetricJSON(issue: Issue, issueReasons: Array<Reason>, issueWeekInputviewModel: WeekInputViewModel, reasonWeekInputViewModelArray: Array<WeekInputViewModel>): string {
        let issueNameEditable = issue.isNameEditable;
        let issueMetricEditable = issue.isMetricEditable;
        issue.isMetricEditable = false;
        issue.isNameEditable = false;
        let reasonIsEditable = [];
        if (issueReasons.length > 0) {
            reasonIsEditable = issueReasons.map(reason => reason.isEditable);
            issueReasons.forEach(reason => reason.isEditable = false);
        }
        let jsonResult = JSON.stringify({issue:issue,issueReasons:issueReasons,issueWeekInputviewModel: issueWeekInputviewModel, reasonWeekInputViewModelArray: reasonWeekInputViewModelArray });
        issue.isMetricEditable = issueMetricEditable;
        issue.isNameEditable = issueNameEditable;
        if (issueReasons.length > 0) {
            issueReasons.forEach((reason, index) => {
                reason.isEditable = reasonIsEditable[index];
            })
        }
        return jsonResult;
    }



    public cancelMetricAndReasonsEdit(jsonStr: string, issue: Issue, issueReasons: Array<Reason>) {
        let parsedData = JSON.parse(jsonStr);
        let originalIssue = parsedData['issue'] as Issue;
        let originalReasons = parsedData['issueReasons'] as Array<Reason>;
        issue.name = originalIssue.name;
        issue.metric = originalIssue.metric;
        issue.isMetricEditable = originalIssue.isMetricEditable;
        issue.isNameEditable = originalIssue.isNameEditable;
        issue.issueState = originalIssue.issueState;
        if (issueReasons.length > 0){
            issueReasons.forEach((reason, index) => {
                let oldReason = originalReasons[index];
                reason.isEditable = oldReason.isEditable;
                reason.name = oldReason.name;
                reason.reasonState = oldReason.reasonState;
            });
        }
    }

}