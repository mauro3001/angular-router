import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  productDeatil: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private navigate: Router) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        this.productId = params.get('id');
        if(this.productId){
          return this.productService.getOne(this.productId);
        }
        return [null];
      })
    ).subscribe((data) => {
      this.productDeatil = data;
    });
  }

  goToBack() {
    this.navigate.navigate(['/home']);
  }

  /*otherBack() {
    this.location.back();
  }*/
}
