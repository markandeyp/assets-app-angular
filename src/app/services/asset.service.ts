import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Asset from '../types/asset';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private httpClient: HttpClient) {}

  fetchAssets(): Observable<Asset[]> {
    return this.httpClient.get<Asset[]>('assets/data.json');
  }
}
