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
    <mat-card #card>
      <mat-card-content>
        <section>A</section>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        position: absolute;
        width: 100px;
        height: 100px;
        top: 0;
        left: 0;
        background-color: lightblue;
        view-transition-name: card-small;
      }
    `,
  ],
})
export class AComponent {
  @ViewChild("card", { static: true, read: ElementRef }) card!: ElementRef;
  constructor(private router: Router, private zone: NgZone) {}

  @HostListener("click")
  startTransition() {
    this.card.nativeElement.style.viewTransitionName = "card-large";
    (document as any).startViewTransition(() => {
      this.zone.runTask(async () => {
        await this.router.navigateByUrl("/b");
        this.card.nativeElement.style.viewTransitionName = "";
      });
    });
  }
}

@Component({
  selector: "app-b",
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card #card>
      <mat-card-content>
        <section>B</section>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        width: 400px;
        height: 400px;
        position: absolute;
        top: 200px;
        left: 200px;
        background-color: hotpink;
        view-transition-name: card-large;
      }
    `,
  ],
})
export class BComponent {
  @ViewChild("card", { static: true, read: ElementRef }) card!: ElementRef;
  constructor(private router: Router, private zone: NgZone) {}

  @HostListener("click")
  startTransition() {
    this.card.nativeElement.style.viewTransitionName = "card-small";
    (document as any).startViewTransition(() => {
      this.zone.runTask(() => {
        this.router.navigateByUrl("/a");
        this.card.nativeElement.style.viewTransitionName = "";
      });
    });
  }
}
