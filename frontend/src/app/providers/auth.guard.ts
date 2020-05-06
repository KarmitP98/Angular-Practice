import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "src/app/providers/authentication.service";

// these routes will only be accessible to admin
const ADMIN_ROUTES = [
  "admin-requests",
  "admin",
  "time-sheet-log",
  "leave-requests",
];

/*
 * Guard will be used to protect the routes if they should only be accessible to logged in user
 * */
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const isAdminRoute = ADMIN_ROUTES.includes(route.url[0].path);
    // if it is admin route and current user is not admin, go to login page
    if (isAdminRoute && !this.auth.isAdmin) {
      this.router.navigate(["/"]);
      return false;
    }

    // if user is not logged in, navigate back to login page, else continue
    if (!this.auth.isLoggedIn) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
