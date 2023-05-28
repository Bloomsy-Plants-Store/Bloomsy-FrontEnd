import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about-us-review',
  templateUrl: './about-us-review.component.html',
  styleUrls: ['./about-us-review.component.css']
})
export class AboutUsReviewComponent {
  review_secion!: HTMLElement;

  constructor() { }
  ngOnInit() {
    this.review_secion = document.querySelector(".review")!;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const elementTop = this.review_secion.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    let content=document.querySelector(".review-content")!;
    if (elementTop < windowHeight) {
      content.classList.add("active");
    }
  }
}
