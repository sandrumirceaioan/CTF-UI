import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Breadcrumb } from './breadcrumbs.interface';
import { filter, distinctUntilChanged, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BreadcrumbService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }

  ngOnInit() {

  }

}