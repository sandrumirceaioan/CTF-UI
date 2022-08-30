import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { CategoriesService } from './categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: any;
  entries: number = 10;
  categories: Category[];
  isMobile: boolean = false;
  title: string;

  categoriesSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    public categoriesService: CategoriesService
  ) {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.isMobile = window.innerWidth < 768 ? true : false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 768 ? true : false;
  }


  async ngOnInit() {
    this.loadTable();

    // get native element promise and subscribe value
    this.searchInput.getInputElement().then(res => {
      fromEvent(res, 'keydown')
        .pipe(
          debounceTime(550),
          map(x => x['target']['value'])
        )
        .subscribe(value => {
          this.categoriesService.page.search = value;
          this.categoriesService.page.offset = 0;
          this.loadTable();
        });
    });


  }

  searchEvent(event) {
    console.log(event)
  }

  // get users using service method
  loadTable() {
    this.categoriesSubscription = this.categoriesService.getCategories().subscribe({
      next: (result) => {
        console.log(result);
        this.categoriesService.page.count = result.count;
        this.categoriesService.page.skip = result.categories.length;
        this.categories = result.categories;
      }
    });
  }

  // pagination change callback
  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.categoriesService.page.offset = pageInfo.offset;
    this.loadTable();
  }

  // columns sort callback
  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    this.categoriesService.page.direction = sortInfo.sorts[0].dir;
    this.categoriesService.page.sort = sortInfo.sorts[0].prop;
    this.loadTable();
  }

  // page size change callback
  entriesChange($event: any) {
    this.entries = $event.target.value;
    this.categoriesService.page.limit = $event.target.value;
    this.loadTable();
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

}
