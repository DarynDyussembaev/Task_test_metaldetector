import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {concatMap, filter, from, Observable, toArray} from "rxjs";
import {MetalDetector} from "../model/MetalDetector";

@Injectable({
  providedIn: 'root'
})
  export class MetalDetectorService {
  private URL_API = 'https://md.debug.testcenter.kz/md/api/v1/metal_detectors';
  private URL_API_DATA = 'https://md.debug.testcenter.kz/md/api/v1/data';
  private http: HttpClient = inject(HttpClient)

  loadMetalDetectorsByIds(language: string): Observable<MetalDetector[]> {
    const headers = new HttpHeaders({
      'Accept-Language': language
    });
    const ids = Array.from({ length: 200 }, (_, index) => index + 1);

    return from(ids).pipe(
      concatMap(id => this.http.get<MetalDetector>(`${this.URL_API}/${id}`, { headers })),
      filter(detector => detector && detector.id !== 0 && detector.brand?.trim().length > 0),
      toArray()
    );
  }

  addMetalDetector(detector: MetalDetector): Observable<MetalDetector> {
    return this.http.post<MetalDetector>(`${this.URL_API_DATA}`, detector);
  }

  updateMetalDetector(id: number, detector: MetalDetector): Observable<MetalDetector> {
    return this.http.put<MetalDetector>(`${this.URL_API_DATA}/update/${id}`, detector);
  }

  deleteMetalDetector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_API_DATA}/delete/${id}`);
  }



}
