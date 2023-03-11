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
export class RootComponent { }

@Component({
  selector: "app-a",
  standalone: true,
  imports: [MatCardModule],
  template: `
    <svg #container viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
        <stop id="stop1" stop-color="rgba(248, 117, 55, 1)" offset="0%"></stop>
        <stop id="stop2" stop-color="rgba(251, 168, 31, 1)" offset="100%"></stop>
      </linearGradient>
    </defs>
    <path
      fill="url(#sw-gradient)"
      d="M12.3,-21.8C16.2,-19,19.8,-16.3,25.7,-12.6C31.7,-9,39.9,-4.5,41.4,0.9C43,6.3,37.9,12.6,32.7,17.5C27.5,22.5,22.3,26.1,16.9,29.9C11.4,33.8,5.7,37.9,-1.1,39.8C-7.9,41.7,-15.8,41.4,-21.9,37.9C-28.1,34.4,-32.5,27.9,-34.2,21C-36,14.2,-35.1,7.1,-33,1.2C-30.9,-4.7,-27.5,-9.3,-24.9,-14.7C-22.3,-20,-20.4,-26.1,-16.4,-28.8C-12.4,-31.5,-6.2,-30.9,-1,-29.2C4.2,-27.4,8.4,-24.6,12.3,-21.8Z"
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
        position: absolute;
        width: 400px;
        height: 400px;
        view-transition-name: card-small;
      }
    `,
  ],
})
export class AComponent {
  @ViewChild("container", { static: true, read: ElementRef }) container!: ElementRef;
  constructor(private router: Router, private zone: NgZone) { }

  @HostListener("click")
  startTransition() {
    this.container.nativeElement.style.viewTransitionName = "card-large";
    (document as any).startViewTransition(() => {
      this.zone.runTask(async () => {
        await this.router.navigateByUrl("/b");
        this.container.nativeElement.style.viewTransitionName = "";
      });
    });
  }
}

@Component({
  selector: "app-b",
  standalone: true,
  imports: [MatCardModule],
  template: `
      <svg #container viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stop-color="rgba(248, 117, 55, 1)" offset="0%"></stop>
          <stop id="stop2" stop-color="rgba(251, 31, 199.101, 1)" offset="100%"></stop>
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
        position: absolute;
        height: 400px;
        width: 400px;
        right: 0;
        view-transition-name: card-large;
      }
    `,
  ],
})
export class BComponent {
  @ViewChild("container", { static: true, read: ElementRef }) container!: ElementRef;
  constructor(private router: Router, private zone: NgZone) { }

  @HostListener("click")
  startTransition() {
    this.container.nativeElement.style.viewTransitionName = "card-small";
    (document as any).startViewTransition(() => {
      this.zone.runTask(() => {
        this.router.navigateByUrl("/a");
        this.container.nativeElement.style.viewTransitionName = "";
      });
    });
  }
}
