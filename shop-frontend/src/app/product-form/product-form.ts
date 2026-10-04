import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
  });
  protected id: number | null = null;
  protected error = signal('');
  protected saving = signal(false);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.id = Number(idParam);
    this.productService.getById(this.id).subscribe({
      next: product => this.form.patchValue(product),
      error: () => this.error.set('محصول پیدا نشد'),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const dto = this.form.getRawValue();
    const request$: Observable<unknown> = this.id === null
      ? this.productService.create(dto)
      : this.productService.update(this.id, dto);

    request$.subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => {
        this.saving.set(false);
        this.error.set('خطا در ذخیره‌ی محصول');
      },
    });
  }
}
