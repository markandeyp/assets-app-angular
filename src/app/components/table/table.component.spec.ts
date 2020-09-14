import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetTableComponent } from './table.component';
import Asset from 'src/app/types/asset';
import { SortService } from 'src/app/services/sort.service';
import { SortOrder } from 'src/app/types/sort-order';

const assets: Asset[] = [
  {
    ticker: 'ALPHA',
    price: 3150.67,
    assetClass: 'Credit',
  },
  {
    ticker: 'BETA',
    price: -3791.37,
    assetClass: 'Equities',
  },
];

const displayedColumns: any = [
  {
    field: 'ticker',
    header: 'Ticker',
    sort: true,
  },
  {
    field: 'price',
    header: 'Price',
    value: function (value: number): string {
      return value >= 0
        ? `$${value.toFixed(2)}`
        : `-$${Math.abs(value).toFixed(2)}`;
    },
    style: function (value: number): string {
      return value > 0 ? 'blue' : 'red';
    },
    sort: true,
  },
  {
    field: 'assetClass',
    header: 'Asset Class',
    style: function (value: string): string {
      return value ? value.toLowerCase() : '';
    },
    sort: true,
  },
];

describe('TableComponent', () => {
  let component: AssetTableComponent;
  let fixture: ComponentFixture<AssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetTableComponent],
      providers: [SortService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have zero rows initially', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
  });

  it('should render 2 rows when assets are set', () => {
    component.assets = assets;
    component.displayedColumns = displayedColumns;
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should render rows with proper color coding class', () => {
    component.assets = assets;
    component.displayedColumns = displayedColumns;
    component.ngOnChanges();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    const equitiesAssetRow = rows[0];
    const creditAssetRow = rows[1];

    expect(creditAssetRow).toBeDefined();
    expect(creditAssetRow.classList).toBeDefined();
    expect(creditAssetRow.classList).toContain('credit');

    expect(equitiesAssetRow).toBeDefined();
    expect(equitiesAssetRow.classList).toBeDefined();
    expect(equitiesAssetRow.classList).toContain('equities');
  });

  it('should render price with proper color coding class', () => {
    component.assets = assets;
    component.displayedColumns = displayedColumns;
    component.ngOnChanges();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    const equitiesAssetRow = rows[0];
    const creditAssetRow = rows[1];

    const creditAssetPriceColumn = creditAssetRow.querySelector(
      'td:nth-child(2)'
    );
    const equitiesAssetPriceColumn = equitiesAssetRow.querySelector(
      'td:nth-child(2)'
    );

    expect(creditAssetPriceColumn.classList).toBeDefined();
    expect(creditAssetPriceColumn.classList).toContain('blue');
    expect(equitiesAssetPriceColumn.classList).toBeDefined();
    expect(equitiesAssetPriceColumn.classList).toContain('red');
  });

  it('should return correct sort icon', () => {
    const component = fixture.componentInstance;
    const sortIcon = component.getSortIcon(undefined);
    const sortIconAsc = component.getSortIcon(SortOrder.ASC);
    const sortIconDesc = component.getSortIcon(SortOrder.DESC);
    expect(sortIcon).toBeUndefined();
    expect('arrow_upward').toBe(sortIconAsc);
    expect('arrow_downward').toBe(sortIconDesc);
  });

  it('should sort when clicked on any sortable header', () => {
    const component = fixture.componentInstance;
    component.assets = assets;
    component.displayedColumns = displayedColumns;
    const columnToSortBy = displayedColumns[0];
    component.sort(columnToSortBy);
    expect(columnToSortBy.order).toBeDefined();
    expect(SortOrder.ASC).toBe(columnToSortBy.order);
    expect('ALPHA').toBe(component.assets[0].ticker);
    component.sort(columnToSortBy);
    expect(columnToSortBy.order).toBeDefined();
    expect(SortOrder.DESC).toBe(columnToSortBy.order);
    expect('BETA').toBe(component.assets[0].ticker);
  });
});
