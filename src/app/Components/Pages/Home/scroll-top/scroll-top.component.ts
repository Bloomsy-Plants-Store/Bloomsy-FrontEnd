import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent {
  showArrow = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop;
    this.showArrow = scrollTop > 850;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}
