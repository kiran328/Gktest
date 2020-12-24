import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { StorageService } from "../shared/storage.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const user = this.storageService.getItem('user');
       if(!user) {
        return next.handle(req);
       }
       let httpParams = new HttpParams();
       httpParams = httpParams.append('token', user.key);
       const request = req.clone({
           params: httpParams
       })
       return next.handle(request);
    }
}