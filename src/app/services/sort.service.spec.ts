import { TestBed } from '@angular/core/testing';
import { SortOrder } from '../types/sort-order';
import { SortService } from './sort.service';
const assets = [
  {
    ticker: 'BETA',
    price: 3791.37,
    assetClass: 'Equities',
  },
  {
    ticker: 'GAMMA',
    price: 2299.1,
    assetClass: 'Equities',
  },
  {
    ticker: 'ALPHA',
    price: 3150.67,
    assetClass: 'Credit',
  },
  {
    ticker: 'DELTA',
    price: 3132.66,
    assetClass: 'Equities',
  },
  {
    ticker: 'EPSILON',
    price: 1168.46,
    assetClass: 'Credit',
  },
  {
    ticker: 'ZETA',
    price: 2716.78,
    assetClass: 'Credit',
  },
  {
    ticker: 'ETA',
    price: 3089.2,
    assetClass: 'Macro',
  },
  {
    ticker: 'THETA',
    price: 1075.44,
    assetClass: 'Macro',
  },
];

describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort number array in ascending order', () => {
    const array = [2, 1, 4, 5, 3];
    const sortedArray = service.sort(array);
    expect([1, 2, 3, 4, 5]).toEqual(sortedArray);
  });

  it('should sort number array in descending order', () => {
    const array = [2, 1, 4, 5, 3];
    const sortedArray = service.sort(array, SortOrder.DESC);
    expect([5, 4, 3, 2, 1]).toEqual(sortedArray);
  });

  it('should sort string array in ascending order', () => {
    const array = ['Alpha', 'Gamma', 'Beta', 'Epsilon'];
    const sortedArray = service.sort(array);
    expect(['Alpha', 'Beta', 'Epsilon', 'Gamma']).toEqual(sortedArray);
  });

  it('should sort string array in descending order', () => {
    const array = ['Alpha', 'Gamma', 'Beta', 'Epsilon'];
    const sortedArray = service.sort(array, SortOrder.DESC);
    expect(['Gamma', 'Epsilon', 'Beta', 'Alpha']).toEqual(sortedArray);
  });

  it('should sort object array by ticker in ascending order', () => {
    const sortedArray = service.sort(assets, SortOrder.ASC, 'ticker');
    expect('ALPHA').toEqual(sortedArray[0].ticker);
    expect('ZETA').toEqual(sortedArray[sortedArray.length - 1].ticker);
  });

  it('should sort object array by ticker in descending order', () => {
    const sortedArray = service.sort(assets, SortOrder.DESC, 'ticker');
    expect('ZETA').toEqual(sortedArray[0].ticker);
    expect('ALPHA').toEqual(sortedArray[sortedArray.length - 1].ticker);
  });

  it('should sort object array by price in ascending order', () => {
    const sortedArray = service.sort(assets, SortOrder.ASC, 'price');
    expect(1075.44).toEqual(sortedArray[0].price);
    expect(3791.37).toEqual(sortedArray[sortedArray.length - 1].price);
  });

  it('should sort object array by price in descending order', () => {
    const sortedArray = service.sort(assets, SortOrder.DESC, 'price');
    expect(3791.37).toEqual(sortedArray[0].price);
    expect(1075.44).toEqual(sortedArray[sortedArray.length - 1].price);
  });

  it('should sort string array in given order', () => {
    const sortedArray = service.groupedSort(
      ['Credit', 'Macro', 'Equities', 'Equities', 'Credit'],
      ['Macro', 'Equities', 'Credit']
    );
    const expectedArray = ['Macro', 'Equities', 'Equities', 'Credit', 'Credit'];
    expect(expectedArray).toEqual(sortedArray);
  });

  it('should sort object array in given order', () => {
    const sortedArray = service.groupedSort(
      assets,
      ['Macro', 'Equities', 'Credit'],
      'assetClass'
    );
    expect('Macro').toBe(sortedArray[0].assetClass);
    expect('Credit').toBe(sortedArray[sortedArray.length - 1].assetClass);
  });

  it('should group and sort object array in given order', () => {
    const sortedArray = service.groupAndSort(
      assets,
      ['Macro', 'Equities', 'Credit'],
      'assetClass',
      SortOrder.ASC,
      'ticker'
    );
    expect('Macro').toBe(sortedArray[0].assetClass);
    expect('ETA').toBe(sortedArray[0].ticker);
    expect('Credit').toBe(sortedArray[sortedArray.length - 1].assetClass);
    expect('ZETA').toBe(sortedArray[sortedArray.length - 1].ticker);
  });
});
