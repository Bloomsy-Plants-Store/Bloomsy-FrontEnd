import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit{
  body: any;
  sidebar: any;
  toggle: any;

  ngOnInit(): void {
      this.body = document.querySelector(".body");
      this.sidebar = this.body?.querySelector("nav");
      this.toggle = this.body?.querySelector(".toggle");

      this.toggle?.addEventListener("click", () => {
        this.sidebar?.classList.toggle("close");
      });
  }
}

