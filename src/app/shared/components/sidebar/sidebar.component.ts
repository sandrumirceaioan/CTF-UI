import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { LayoutService } from "../../services/layout.service";

var misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
  public menuItems: any[] = [];
  public isCollapsed: boolean = true;
  collapsedSubscription: Subscription;
  userId: string;
  module: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.module = this.router.url.split('/')[1];
    this.menuItems = this.layoutService.getMenus(this.module, this.authService.userInfo.role);

    this.collapsedSubscription = this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }

  ngOnDestroy(): void {
    this.collapsedSubscription.unsubscribe();
  }
}
