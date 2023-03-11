import { bootstrapApplication } from "@angular/platform-browser";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, withHashLocation } from "@angular/router";
import { AComponent, BComponent, CComponent, DComponent, RootComponent } from "./app/app.component";

bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter([
      {
        path: "",
        redirectTo: "a",
        pathMatch: "full",
      },
      {
        path: "a",
        component: AComponent,
      },
      {
        path: "b",
        component: BComponent,
      },
      {
        path: "c",
        component: CComponent,
      },
      {
        path: "d",
        component: DComponent,
      },
    ], withHashLocation()),
  ],
})
  .then((success) => console.log(`Bootstrap success`))
  .catch((error) => console.error(error));
