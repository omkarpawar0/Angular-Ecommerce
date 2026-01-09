import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
constructor(private productService : UserService, private router: Router) {}

  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  slider!: KeenSliderInstance;
  interval: any;
  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      slides: {
        perView: 1,
        spacing: 15,
      },
    });
    // 👉 AUTO SLIDE
    this.interval = setInterval(() => {
      this.slider.next();
    }, 3000); // 3 seconds
  }


  // 🔥 SEARCH ON ENTER
  onEnter( value: any) {
    if (!value.trim()) return;

    this.productService.search(value); 
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }
}
