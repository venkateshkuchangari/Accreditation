import { Routes } from "../../node_modules/@angular/router";
import { UserLoginComponent } from "./auth/user-login/user-login.component";
import { AuthGuard } from "./auth/services/auth-guard.service";

export const routes: Routes = [
  { path: "login", component: UserLoginComponent },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
    canActivateChild: [AuthGuard]
  },
  { path: "", pathMatch: "full", redirectTo: "dashboard" }
];
