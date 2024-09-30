import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MetalDetectorDirectory} from "../model/MetalDetector";

@Injectable({
  providedIn: 'root'
})
export class MetalDetectorDirectoryService {
  private URL_API = 'https://md.debug.testcenter.kz/md/api/v1';
  private http: HttpClient = inject(HttpClient);

  getTypesMetalDetectors(language:string): Observable<MetalDetectorDirectory[]> {
    const headers = new HttpHeaders({
      'Accept-Language': language
    });
    return this.http.get<MetalDetectorDirectory[]>(`${this.URL_API}/ref/types_metal_detectors`,{headers});
  }

  getCountriesManufacture(language:string): Observable<MetalDetectorDirectory[]> {
    const headers = new HttpHeaders({
      'Accept-Language': language
    });
    return this.http.get<MetalDetectorDirectory[]>(`${this.URL_API}/ref/country_manufacture`,{headers});
  }

  getAvailabilityStatuses(language:string): Observable<MetalDetectorDirectory[]> {
    const headers = new HttpHeaders({
      'Accept-Language': language
    });
    return this.http.get<MetalDetectorDirectory[]>(`${this.URL_API}/ref/availability`,{headers});
  }

}
