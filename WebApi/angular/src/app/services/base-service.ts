import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@hlc/environment';

export abstract class BaseService { 
    private serviceUrl: string;
    
    constructor(private _http: HttpClient) {
        this.serviceUrl = environment.apiUri;
    }

    protected get<TResult>(url: string, param: any) : Observable<TResult> {
        return this._http.get<TResult>(this.serviceUrl + url, { params: this.handleUndefinedProperties(param) });
    }

    protected getWithoutParams<TResult>(url: string) : Observable<TResult> {
        return this._http.get<TResult>(this.serviceUrl + url);
    }

    protected getWithOptions(url: string, options: any) : Observable<any> {
        return this._http.get(this.serviceUrl + url, options);
    }

    protected post<TResult>(url: string, body: any) : Observable<TResult> {
        return this._http.post<TResult>(this.serviceUrl + url, body);
    }

    protected postWithOptions(url: string, body: any, options: any) : Observable<any> {
        return this._http.post(this.serviceUrl + url, body, options);
    }

    protected postWithQueryParams<TResult>(url: string, body: any, params: any) : Observable<TResult> {
        return this._http.post<TResult>(this.serviceUrl + url, body, {params: this.handleUndefinedProperties(params)});
    }

    protected put<TResult>(url: string, body: any): Observable<TResult> {
        return this._http.put<TResult>(this.serviceUrl + url, body);
    }

    protected delete<TResult>(url: string, params: any): Observable<TResult>{
        return this._http.delete<TResult>(this.serviceUrl + url, {params: this.handleUndefinedProperties(params)});
    }

    protected handleError(error: Response) {
        return Observable.throw(error || 'A server error has occurred');
    }

    private handleUndefinedProperties(params: any): any {
        var isArray = Array.isArray(params);
        
        if (isArray && params.length == 0)
            return params;

        var paramsObject = isArray ? params.slice(0) : { ...params };
        var paramKeys = [];

        if (isArray) {
            paramKeys = Object.keys(paramsObject[0]);

            for (let item of paramsObject) {
                for (var i = 0; i < paramKeys.length; i++) {
                    if (typeof item[paramKeys[i]] === "undefined" || item[paramKeys[i]] === null)
                        item[paramKeys[i]] = "";
                }
            }
        }
        else {
            paramKeys = Object.keys(paramsObject);

            for (var i = 0; i < paramKeys.length; i++) {           
                if (typeof paramsObject[paramKeys[i]] === "undefined" || paramsObject[paramKeys[i]] === null)
                    paramsObject[paramKeys[i]] = "";
            }
        }

        return paramsObject;
    }
}
