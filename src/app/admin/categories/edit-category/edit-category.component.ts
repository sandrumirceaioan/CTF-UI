import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { EditCategoryResolve } from './edit-category.resolve';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryForm } from 'src/app/shared/models/forms.model';
import { map, Observable, Subscription } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  title: string;
  category: Category;
  categoryForm: FormGroup;
  parentSub: Subscription = new Subscription;
  imageSrc: {
    thumbnail: string;
    banner: string;
  } = {
    thumbnail: null,
    banner: null
  };

  constructor(
    private route: ActivatedRoute,
    public categoriesService: CategoriesService,
    private toastService: ToastService
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.data['data'].category;

    this.categoryForm = new FormGroup<CategoryForm>({
      url: new FormControl(this.category.url ? this.category.url : null, [Validators.required]),
      name: new FormControl(this.category.name ? this.category.name : null, [Validators.required]),
      summary: new FormControl(this.category.summary ? this.category.summary : null),
      description: new FormControl(this.category.description ? this.category.description : null),
      thumbnail: new FormControl(null),
      banner: new FormControl(this.category.banner ? this.category.banner : null),
      parent: new FormControl({ value: this.category.parent ? this.category.parent : null, disabled: true }),
      parentName: new FormControl({ value: null, disabled: true }),
      status: new FormControl(this.category.status, [Validators.required]),
    });

    this.categoryForm.get('status').setValue(this.category.status);
  }

  getInitialStatus() {
    return this.categoryForm.get('status').value;
  }

  selectStatus(event) {
    this.categoryForm.get('status').patchValue(event.target.value);
  }

  getParent() {
    if (!this.categoryForm.get('parent').value) {
      this.toastService.present('error', 'No parent available', 2000)
      return;
    };
    this.parentSub = this.categoriesService.getCategory(this.categoryForm.get('parent').value).subscribe((res: any) => {
      this.categoryForm.get('parentName').patchValue(res.name);
    });
  }

  onFileChange(event, type) {
    const reader = new FileReader();
    const [file] = event.target.files;

    if (file) {
      this.categoryForm.patchValue({ [type]: file });

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc[type] = reader.result as string;
      }
    } else {
      this.categoryForm.patchValue({ [type]: null });
      this.imageSrc[type] = null;
    }
  }

  saveCategory(): void {
    this.categoriesService.saveCategory(this.category._id, this.categoryForm.value).subscribe(result => {
      console.log(result);
      //this.category = result;
    });
  }

  ngOnDestroy(): void {
    this.parentSub.unsubscribe();
  }

}
