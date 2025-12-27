import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
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

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }
}
