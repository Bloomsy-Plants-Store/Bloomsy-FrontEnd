import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
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
