import { TestBed } from '@angular/core/testing';
import { AssetAppComponent } from './app.component';
import { AssetService } from './services/asset.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import Asset from './types/asset';
import { AssetTableComponent } from './components/table/table.component';

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

const mockAssetService = {
  fetchAssets(): Observable<Asset[]> {
    return of(assets);
  },
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetAppComponent, AssetTableComponent],
      imports: [HttpClientModule],
      providers: [{ provide: AssetService, useValue: mockAssetService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AssetAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch assets on ngOnInit', () => {
    const fixture = TestBed.createComponent(AssetAppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.assets).toBeDefined();
    expect(app.assets.length).toBe(2);
  });
});
