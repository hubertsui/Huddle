import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter, ViewChild,ViewChildren,QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { MetricService } from '../services/metric.service';
import { Issue } from '../shared/models/issue';
import { Metric} from '../shared/models/metric';
import { Reason} from '../shared/models/reason';
import { IssueState } from '../shared/models/issueState';
import { IssueViewModel } from '../issueList/issue.viewmodel';
import { MetricViewModel } from './metric.viewmodel';
import { WeekDay } from '../shared/models/weekDay';
import { WeekInputViewModel } from '../shared/models/weekInputViewModel';
import { Constants } from '../shared/constants';
import { CommonUtil } from '../utils/commonUtil';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ReasonListComponent } from '../reason/reasonList.component';
import { DateHelper } from '../utils/dateHelper';
import { AddMetricComponent } from './addMetric.component';
import { EditMetricComponent } from './editMetric.component';
import { WeekSelectorService } from '../services/weekSelector.service';
import { MetricValueService } from '../services/metricValue.service';
import { State } from '../shared/models/state';

declare var microsoftTeams: any;

@Component({
    templateUrl: 'app/metric/metricList.component.html',
    selector: 'metric-list',
    styleUrls: ['app/metric/metricList.component.css', 'app/shared/shared.css']
})

export class MetricListComponent implements OnInit {

    metricArray = new Array<MetricViewModel>();
    teamId = Constants.teamId;

    ifHidden: boolean = true;
    currentIssueId: number = 0;
    currentMetricId: number = 0;

    @Input('currentIssue') currentIssue: Issue;

    @ViewChildren('reasonLists')
    reasonLists:QueryList<ReasonListComponent>;

    currentWeekDays = new Array<Date>();
    selectWeekDay: WeekDay;
    weekInputviewModel: WeekInputViewModel;

    metricWeekInputViewModelArray = new Array<WeekInputViewModel>();
    reasonWeekInputViewModelArray = new Array<WeekInputViewModel>();

    currentMetricValues: string;

    @ViewChild('modalAddMetric')
    modalAddMetric: ModalComponent;
    @ViewChild(AddMetricComponent)
    addMetricPopUp: AddMetricComponent;

    @ViewChild('modalEditMetric')
    modalEditMetric: ModalComponent;
    @ViewChild(EditMetricComponent)
    editMetricPopUp: EditMetricComponent;

    constructor(private metricService: MetricService, private router: Router, private activateRoute: ActivatedRoute, private cookieService: CookieService, private weekSelectorService: WeekSelectorService, private metricValueService: MetricValueService) {
    }

    ngOnInit(): void {
        this.initTeamContext();
        this.subscribeWeekSelector();
        this.currentWeekDays = this.weekSelectorService.getCurrentWeekDays();
    }

    show() {
        this.ifHidden = false;
        this.currentIssueId = this.currentIssue.id;
        this.metricService.getMetricsByIssueId(this.currentIssue.id)
            .subscribe(resp => {
                this.metricArray = resp.map((metric, index) => {
                    metric.issue = this.currentIssue;
                    let metricViewModel = new MetricViewModel();
                    metricViewModel.metric = metric;
                    metricViewModel.expanded = false;
                    return metricViewModel;
                });
                this.rebuildWeekInputViewModel();
            });
    }

    hide() {
        this.ifHidden = true;
    }


    initTeamContext() {
        this.teamId = CommonUtil.getTeamId();
    }

    onSwitch(id: any) {
        this.metricService.updateMetricStatus(id);
        this.metricArray.forEach(metric => {
            if (metric.metric.id == id) {
                if (metric.metric.metricState == State.active)
                    metric.metric.metricState = State.closed;
                else
                    metric.metric.metricState = State.active;
            }
        });
    }

    closed() { }

    expandMetricClick(metric: MetricViewModel) {
        this.metricArray.forEach(metric => {
            metric.expanded = false;
            let metricList = this.getRelatedReasonList(metric);
            if (metricList !== null)
                metricList.hide();
        });
        metric.expanded = true;
        let currentReasonList = this.getRelatedReasonList(metric);
        if (currentReasonList!==null)
            currentReasonList.show();
    }

    getRelatedReasonList(metric: MetricViewModel) {
        let result = this.reasonLists.filter(reasonList => reasonList.currentMetric.id == metric.metric.id);
        if (result.length > 0)
            return result[0];
        return null;
    }



    rebuildWeekInputViewModel() {
        this.selectWeekDay = this.weekSelectorService.getCurrentWeek();
        if (this.metricArray.length > 0) {
            this.metricWeekInputViewModelArray = this.metricArray.map(metricView => {
                return DateHelper.getWeekInputViewModel(true, this.selectWeekDay, metricView.metric, null);
            });
        }
        this.getMetricValues();
    }

    getMetricValues() {
        this.metricWeekInputViewModelArray.forEach(metricWeekVM => metricWeekVM.metricValueArray.forEach(metricVal => {
            metricVal.metricValues = null;
            metricVal.id = 0;
        }));
        this.reasonWeekInputViewModelArray.forEach(reasonWeekVM => reasonWeekVM.reasonValueArray.forEach(reasonVal => {
            reasonVal.reasonMetricValues = null;
            reasonVal.id = 0;
        }));
        let self = this;
        this.metricValueService.getMetricAndReasonValues(this.metricArray.map(metric => metric.metric.id), [], this.selectWeekDay)
            .subscribe(resp => {
                //refill metric values with xhr result
                resp.forEach(weekInputWM => {
                        if (weekInputWM.metricValueArray.length > 0) {
                            let targetMetricWeekInputVM = self.metricWeekInputViewModelArray.find(metricWeekInputVm => metricWeekInputVm.metricValueArray[0].metric.id == weekInputWM.metricValueArray[0].metric.id);
                            if (targetMetricWeekInputVM) {
                                targetMetricWeekInputVM.metricValueArray.forEach((metricValue, index) => {
                                    let backendMetricValue = weekInputWM.metricValueArray.find(mv => DateHelper.isDateEqual(metricValue.inputDate, mv.inputDate));
                                    if (backendMetricValue) {
                                        metricValue.metricValues = backendMetricValue.metricValues;
                                        metricValue.id = backendMetricValue.id;
                                        metricValue.inputDate = DateHelper.UTCToLocal(metricValue.inputDate);
                                    }
                                });
                            }
                        }
                });
                this.currentMetricValues = this.recalcMetricValues();
            });
    }

    subscribeWeekSelector() {
        this.weekSelectorService.selectWeek.subscribe(weekDay => {
            this.currentWeekDays = this.weekSelectorService.getCurrentWeekDays();
        });
    }

    updateMetricValues() {
        this.metricValueService.updateMetricAndReasonValues(
            this.metricWeekInputViewModelArray.map(metricWeekVM => metricWeekVM.metricValueArray),
            [],
            this.currentMetricValues
        );
    }

    recalcMetricValues() {
        return this.metricValueService.getMetricReasonValuesJSON(this.metricWeekInputViewModelArray, this.reasonWeekInputViewModelArray);
    }

    editMetricClick(id) {
        this.currentMetricId = id;
        this.modalEditMetric.open();
    }

    addMetricClick() {
        this.modalAddMetric.open();
    }

    opened() {
        this.addMetricPopUp.open(this.currentIssue.id);
    }

    editMetricOpened() {
        this.editMetricPopUp.open(this.currentIssue.id, this.currentMetricId);
    }

    afterCloseNewMetric(toAddMetric: Metric) {
        this.modalAddMetric.close();
        if (!toAddMetric.id)
            return;
        let viewMode = new MetricViewModel();
        viewMode.metric = toAddMetric;
        viewMode.expanded = false;
        this.metricArray.push(viewMode);
        this.rebuildWeekInputViewModel();
    }
    afterCloseEditMetric(toEditMetric: Metric) {
        this.modalEditMetric.close();
        this.metricArray.forEach(metric => {
            if (metric.metric.id == toEditMetric.id) {
                metric.metric = toEditMetric;
                return;
            }
        });
    }
    afterDeleteMetric(deletedMetric: Metric) {
        this.modalEditMetric.close();
        this.metricArray.forEach((metric,index) => {
            if (metric.metric.id == deletedMetric.id) {
                this.metricArray.splice(index, 1);
                return;
            }
        });
    }
}