import { bootstrapApplication } from "@angular/platform-browser";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { AComponent, BComponent, RootComponent } from "./app/app.component";

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
    ]),
  ],
})
  .then((success) => console.log(`Bootstrap success`))
  .catch((error) => console.error(error));
