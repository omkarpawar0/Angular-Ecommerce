import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sellerProduct } from 'src/app/core/models/seller';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.scss']
})
export class SellerProductComponent {
  tableFilter: string = '';
  countries: any[] = [];

  selectedCountry: { name: string; code: string } | null = null;

  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('openRegisterButton') openRegisterButton!: ElementRef<HTMLButtonElement>;

  clearFilter() {
    this.tableFilter = '';
  }

  // 
  products: sellerProduct[] = [];
  selectedProduct?: sellerProduct;

  form!: FormGroup;
  sellerId!: string;

  editMode = false;
  editId!: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private errorService: ErrorService
  ) { }

  categories: string[] = [
    'Mobile',
    'fashion',
    'Electronic',
    'Applicance',
    'Furniture',
    'Beauty'
  ];


  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(90)]],
      brand: [''],
      isActive: [true]
    });


    this.authService.seller.subscribe(seller => {
      if (seller) {
        this.sellerId = seller.localId;
        this.loadProducts();
      }
    });
  }

  get f() {
    return this.form.controls as {
      [key: string]: AbstractControl;
    };
  }


  loadProducts() {
    this.productService.getProducts(this.sellerId)
      .subscribe((res) =>
        this.products = res
      );

    console.log("callinng procts", this.products)
  }

  openModal(product?: sellerProduct) {
    this.editMode = !!product;

    if (product) {
      this.editId = product.id!;
      this.form.patchValue(product);
    } else {
      this.form.reset({ isActive: true, stock: 0 });
    }

    // new bootstrap.Modal(
    //   document.getElementById('productModal')
    // ).show();
    this.openRegisterButton.nativeElement.click();
  }

  submit() {
    if (this.form.invalid) return;

    const now = new Date().toISOString();

    const product: sellerProduct = {
      ...this.form.value,
      sellerId: this.sellerId,
      createdAt: this.editMode
        ? this.products.find(p => p.id === this.editId)!.createdAt
        : now,
      updatedAt: this.editMode ? now : undefined
    };

    const req = this.editMode
      ? this.productService.updateProduct(this.editId, product)
      : this.productService.addProduct(product);

    req.subscribe({
      next: () => {

        if (this.editMode == true) {
          this.errorService.showSuccess('Product Edited Successfully');
        }
        else {
          this.errorService.showSuccess('Product Added Successfully');

        }
        this.loadProducts();
        setTimeout(() => {
          this.form.reset();
          this.closeBtn.nativeElement.click();
        }, 1200);
      },
      error: () => {
        this.errorService.showError('Something went wrong');
      }
    });
  }

  deleteProd(id: string) {
    if (confirm('Delete this product?')) {
      this.productService.deleteProduct(id)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.errorService.showSuccess('Product Deleted Successfully');

          },
          error: () => {
            this.errorService.showError('Something went wrong');
          }
        });
    }
  }

  selectProduct(product: sellerProduct) {
    this.selectedProduct = product;
  }

  // closeModal() {
  //   bootstrap.Modal.getInstance(
  //     document.getElementById('productModal')
  //   ).hide();
  // }
}
