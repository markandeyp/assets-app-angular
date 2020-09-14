import { TestBed } from '@angular/core/testing';

import { AssetService } from './asset.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import Asset from '../types/asset';

const assets: Asset[] = [
  {
    ticker: 'ALPHA',
    price: 3150.67,
    assetClass: 'Credit',
  },
  {
    ticker: 'BETA',
    price: 3791.37,
    assetClass: 'Equities',
  },
];

describe('AssetService', () => {
  let service: AssetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AssetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return assets', () => {
    service.fetchAssets().subscribe((assets) => {
      expect(assets).toBeDefined();
      expect(assets.length).toBe(2);
    });

    const fetchAssetRequest = httpMock.expectOne('assets/data.json');
    expect(fetchAssetRequest.request.method).toBe('GET');
    fetchAssetRequest.flush(assets);
  });
});
