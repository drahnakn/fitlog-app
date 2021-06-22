import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { TrainingLogCreateComponent } from "./training-logs/training-log-create/training-log-create.component";
import { TrainingLogDisplayComponent } from "./training-logs/training-log-display/training-log-display.component";

const routes: Routes = [
  { path: "display", component: TrainingLogDisplayComponent },
  { path: "create", component: TrainingLogCreateComponent },
  { path: "signin", component: SignInComponent },
  { path: "signup", component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
