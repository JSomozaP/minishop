import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/interfaces';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  error = '';
  isAuthenticated = false;
  isProcessingPayment = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    } else {
      this.error = 'ID de produit invalide';
      this.isLoading = false;
    }
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.product = response.product;
        }
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement du produit';
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  buyProduct(): void {
    if (!this.product || !this.isAuthenticated) {
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
      return;
    }

    this.isProcessingPayment = true;
    this.productService.checkout(this.product.id, 1).subscribe({
      next: (response) => {
        if (response.success && response.checkout_url) {
          // Rediriger vers Stripe Checkout
          window.location.href = response.checkout_url;
        }
      },
      error: (error) => {
        this.error = 'Erreur lors de la création du paiement';
        console.error('Erreur:', error);
        this.isProcessingPayment = false;
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/500x300?text=Image+non+disponible';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
