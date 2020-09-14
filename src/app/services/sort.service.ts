import { Injectable } from '@angular/core';
import { SortOrder } from '../types/sort-order';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  sort(array: any[], order: SortOrder = SortOrder.ASC, key?: string): any[] {
    if (!key) {
      return order === SortOrder.ASC ? array.sort() : array.sort().reverse();
    } else {
      return array.sort((a, b) => {
        if (!a && !b) {
          return 0;
        }

        if (order === SortOrder.ASC) {
          if (a[key] > b[key]) {
            return 1;
          } else if (a[key] < b[key]) {
            return -1;
          } else {
            return 0;
          }
        } else {
          if (a[key] > b[key]) {
            return -1;
          } else if (a[key] < b[key]) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }
  }

  groupedSort(array: any[], groupOrder: string[], key?: string): any[] {
    if (!key) {
      return array.sort((a, b) => {
        let ia = groupOrder.indexOf(a);
        let ib = groupOrder.indexOf(b);
        return ia - ib;
      });
    } else {
      return array.sort((a, b) => {
        let ia = groupOrder.indexOf(a[key]);
        let ib = groupOrder.indexOf(b[key]);
        return ia - ib;
      });
    }
  }

  groupAndSort(
    array: any[],
    groupOrder: string[],
    groupBy: string,
    order: SortOrder = SortOrder.ASC,
    key: string
  ): any[] {
    let sortedArray = [];
    groupOrder.forEach((group) => {
      sortedArray = sortedArray.concat(
        this.sort(
          array.filter((item) => item[groupBy] === group),
          order,
          key
        )
      );
    });
    return sortedArray;
  }
}
