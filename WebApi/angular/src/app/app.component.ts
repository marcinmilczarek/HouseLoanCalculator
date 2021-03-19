import { Component, OnDestroy } from "@angular/core";
import { RouteFadeAnimation } from '@loancalc/shared/animations';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
    selector: 'loancalc-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    animations: [RouteFadeAnimation],
})
export class AppComponent implements OnDestroy {
    loading = false;
    subscribtions: Subscription = new Subscription();

    constructor(private router: Router) {
        this.subscribtions.add(
            this.router.events.subscribe((event: Event) => {
                switch (true) {
                    case event instanceof NavigationStart: {
                        this.loading = true;
                        break;
                    }
                    case event instanceof NavigationEnd:
                    case event instanceof NavigationCancel:
                    case event instanceof NavigationError: {
                        this.loading = false;
                        break;
                    }
                }
            })
        );
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }

    ngOnDestroy() {
        this.subscribtions.unsubscribe();
    }
}
