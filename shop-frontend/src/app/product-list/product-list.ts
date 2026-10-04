import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';
import { ProductService } from '../product';
import { Product } from '../models';

@Component({
  selector: 'app-product-list',
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected readonly pageSize = 10;
  protected products = signal<Product[]>([]);
  protected page = signal(1);
  protected totalPages = signal(1);
  protected totalCount = signal(0);
  protected readonly skeletonRows = [1, 2, 3, 4, 5];
  protected loading = signal(false);
  protected error = signal('');

  protected searchTerm = '';
  protected minPrice: number | null = null;
  protected maxPrice: number | null = null;

  ngOnInit(): void {
    this.load();
  }

  load(page: number = this.page()): void {
    this.loading.set(true);
    this.error.set('');

    this.productService
      .getAll(page, this.pageSize, {
        searchTerm: this.searchTerm.trim(),
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      })
      .subscribe({
        next: result => {
          this.products.set(result.items);
          this.page.set(result.page);
          this.totalPages.set(Math.max(result.totalPages, 1));
          this.totalCount.set(result.totalCount);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('خطا در دریافت محصولات');
          this.loading.set(false);
        },
      });
  }

  search(): void {
    this.load(1);
  }

  delete(product: Product): void {
    if (!confirm(`محصول «${product.name}» حذف بشه؟`)) {
      return;
    }

    this.productService.delete(product.id).subscribe({
      next: () => {
        // If the last item on this page was deleted, step back a page.
        const page = this.products().length === 1 && this.page() > 1 ? this.page() - 1 : this.page();
        this.load(page);
      },
      error: () => this.error.set('خطا در حذف محصول'),
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
