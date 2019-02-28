import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  CanActivateChild,
  Router
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class MenuAccessGaurd implements CanActivate, CanLoad, CanActivateChild {
  constructor(private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let data = route.data["menuId"] as number;
    return this.checkAccesstoMenu(data);
  }
  canLoad(route: Route): boolean {
    let data = route.data["menuId"] as number;
    return this.checkAccesstoMenu(data);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.canActivate(route);
  }

  checkAccesstoMenu(menuId: number): boolean {
    let accessData = JSON.parse(atob(localStorage.getItem("*%%*###")));
    if(accessData==null){   
      this.router.navigate(["/login"])
     }else{
      let matchMenu = accessData.find(element => {
        return element.menuId == menuId;
      });
      return matchMenu.isAccessible;
    }
  }
}
