﻿import { Component, OnInit, AfterViewChecked, ViewChild, Output, EventEmitter } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { Constants } from '../shared/constants';
import { IssueService } from '../services/issue.service';
import { ReasonService } from '../services/reason.service';
import { MetricService } from '../services/metric.service';

@Component({
    templateUrl: 'app/confirm/confirm.component.html',
    selector: 'confirm-form',
    styleUrls: ['app/confirm/confirm.component.css', 'app/shared/shared.css']
})

export class ConfirmComponent implements OnInit {
    @Output() onClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

    closeParent: boolean = false;
    list: string = '';
    itemToDeleteId: number;

    message: string = Constants.deleteConfirmMessage;
    constructor(private issueService: IssueService, private metricService: MetricService, private reasonService: ReasonService, private router: Router) {
    }

    ngOnInit(): void {
        
    }

    open(list:string, id:number): void {
        this.list = list;
        this.itemToDeleteId = id;
        this.closeParent = false;
    }

    close(): void {
        this.onClosed.emit(this.closeParent);
    }

    delete(): void {
        //delete
        if (this.itemToDeleteId > 0) {
            if (this.list == Constants.issueListName) {
                this.issueService.deleteIssue(this.itemToDeleteId)
                    .subscribe(resp => {
                        this.closeParent = true;
                        this.close();
                    });
            } else if (this.list == Constants.metricListName) {
                this.metricService.deleteMetric(this.itemToDeleteId)
                    .subscribe(resp => {
                        this.closeParent = true;
                        this.close();
                    });
            } else if (this.list == Constants.reasonListName) {
                this.reasonService.deleteReason(this.itemToDeleteId)
                    .subscribe(resp => {
                        this.closeParent = true;
                        this.close();
                    });
            }
        } else {
            this.close();
        }
    }

}
