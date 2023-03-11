import {
  Component,
  ElementRef,
  HostListener,
  NgZone,
  ViewChild,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class RootComponent {}

@Component({
  selector: "app-a",
  standalone: true,
  imports: [MatCardModule],
  template: `
    <svg #container viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
            <stop id="stop1" stop-color="rgba(215.039, 55, 248, 1)" offset="0%"></stop>
            <stop id="stop2" stop-color="rgba(254.64, 255, 0, 1)" offset="100%"></stop>
        </linearGradient>
    </defs>
    <path fill="url(#sw-gradient)" d="M14.6,-22.7C20.9,-21.6,29.3,-21.7,31.8,-18.1C34.3,-14.5,30.8,-7.3,27.2,-2.1C23.6,3,19.7,6.1,16,7.7C12.4,9.3,9,9.5,6.3,13C3.7,16.6,1.9,23.6,-0.7,24.9C-3.3,26.1,-6.6,21.6,-9.5,18.2C-12.5,14.8,-15.2,12.5,-21.5,9.7C-27.8,6.9,-37.8,3.4,-40.2,-1.3C-42.5,-6.1,-37.1,-12.2,-30.4,-14.3C-23.6,-16.4,-15.5,-14.6,-10.2,-16.2C-4.9,-17.8,-2.4,-22.9,0.9,-24.4C4.2,-25.8,8.3,-23.7,14.6,-22.7Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style="transition: all 0.3s ease 0s;" stroke="url(#sw-gradient)"></path>
</svg>
  `,
  styles: [
    `
      svg {
        view-transition-name: a;
      }
    `,
  ],
})
export class AComponent {
  @ViewChild("container", { static: true, read: ElementRef })
  container!: ElementRef;
  constructor(private router: Router, private zone: NgZone) {}

  @HostListener("click")
  startTransition() {
    this.container.nativeElement.style.viewTransitionName = "b";
    (document as any).startViewTransition(() => {
      this.zone.runTask(async () => {
        await this.router.navigateByUrl("/b");
        this.container.nativeElement.style.viewTransitionName = "a";
      });
    });
  }
}

@Component({
  selector: "app-b",
  standalone: true,
  imports: [MatCardModule],
  template: `
    <svg
      #container
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop
            id="stop1"
            stop-color="rgba(248, 117, 55, 1)"
            offset="0%"
          ></stop>
          <stop
            id="stop2"
            stop-color="rgba(251, 31, 199.101, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M19.4,-35.5C25,-30.5,29.2,-24.9,33.9,-18.9C38.6,-12.9,43.9,-6.4,44,0.1C44.1,6.6,39.1,13.1,34.9,20C30.7,26.9,27.2,34,21.5,37.3C15.9,40.7,7.9,40.1,-0.1,40.2C-8.1,40.4,-16.2,41.2,-21.6,37.7C-27,34.3,-29.8,26.5,-32.2,19.5C-34.6,12.5,-36.6,6.3,-37.9,-0.7C-39.1,-7.7,-39.6,-15.4,-37,-22C-34.3,-28.7,-28.7,-34.3,-22,-38.7C-15.4,-43.1,-7.7,-46.3,-0.4,-45.6C6.9,-45,13.9,-40.5,19.4,-35.5Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        stroke-width="0"
        style="transition: all 0.3s ease 0s"
      ></path>
    </svg>
  `,
  styles: [
    `
      svg {
        left: 100px;
        top: 100px;
        view-transition-name: b;
      }
    `,
  ],
})
export class BComponent {
  @ViewChild("container", { static: true, read: ElementRef })
  container!: ElementRef;
  constructor(private router: Router, private zone: NgZone) {}

  @HostListener("click")
  startTransition() {
    this.container.nativeElement.style.viewTransitionName = "c";
    (document as any).startViewTransition(() => {
      this.zone.runTask(() => {
        this.router.navigateByUrl("/c");
        this.container.nativeElement.style.viewTransitionName = "b";
      });
    });
  }
}

@Component({
  selector: "app-c",
  standalone: true,
  imports: [MatCardModule],
  template: `
    <svg #container viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop
            id="stop1"
            stop-color="rgba(112.606, 0, 190.183, 1)"
            offset="0%"
          ></stop>
          <stop
            id="stop2"
            stop-color="rgba(251, 31, 31, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M16.1,-24.5C18.9,-16.8,18,-9.9,19.2,-3.4C20.3,3.2,23.6,9.4,23.3,16.7C22.9,24,18.9,32.5,12.1,36.2C5.4,39.9,-4.2,38.9,-13.7,36.1C-23.2,33.3,-32.7,28.8,-33.6,22C-34.6,15.1,-27,5.8,-21.1,0.3C-15.3,-5.1,-11.3,-6.9,-8,-14.5C-4.8,-22.2,-2.4,-35.7,2.1,-38.2C6.6,-40.7,13.3,-32.2,16.1,-24.5Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        stroke-width="0"
        style="transition: all 0.3s ease 0s;"
      ></path>
    </svg>
  `,
  styles: [
    `
      svg {
        left: 300px;
        top: 400px;
        view-transition-name: c;
      }
    `,
  ],
})
export class CComponent {
  @ViewChild("container", { static: true, read: ElementRef })
  container!: ElementRef;
  constructor(private router: Router, private zone: NgZone) {}

  @HostListener("click")
  startTransition() {
    this.container.nativeElement.style.viewTransitionName = "d";
    (document as any).startViewTransition(() => {
      this.zone.runTask(() => {
        this.router.navigateByUrl("/d");
        this.container.nativeElement.style.viewTransitionName = "c";
      });
    });
  }
}

@Component({
  selector: "app-d",
  standalone: true,
  imports: [MatCardModule],
  template: `
    <svg #container viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop
            id="stop1"
            stop-color="rgba(255, 133.259, 133.259, 1)"
            offset="0%"
          ></stop>
          <stop
            id="stop2"
            stop-color="rgba(251, 176.787, 31, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M17.6,10.4C11.6,20.4,-11.9,20.5,-17.8,10.4C-23.7,0.4,-11.8,-19.6,-0.1,-19.7C11.7,-19.7,23.5,0.3,17.6,10.4Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        stroke-width="0"
        style="transition: all 0.3s ease 0s;"
      ></path>
    </svg>
  `,
  styles: [
    `
      svg {
        left: 800px;
        top: 300px;
        view-transition-name: d;
      }
    `,
  ],
})
export class DComponent {
  @ViewChild("container", { static: true, read: ElementRef })
  container!: ElementRef;
  constructor(private router: Router, private zone: NgZone) {}

  @HostListener("click")
  startTransition() {
    this.container.nativeElement.style.viewTransitionName = "a";
    (document as any).startViewTransition(() => {
      this.zone.runTask(() => {
        this.router.navigateByUrl("/a");
        this.container.nativeElement.style.viewTransitionName = "d";
      });
    });
  }
}
