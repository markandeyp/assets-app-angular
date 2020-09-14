import { Component, Input, OnChanges } from '@angular/core';
import { SortService } from 'src/app/services/sort.service';
import Asset from 'src/app/types/asset';
import { SortOrder } from 'src/app/types/sort-order';

@Component({
  selector: 'asset-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class AssetTableComponent implements OnChanges {
  @Input()
  assets: Asset[];

  displayedColumns: any = [
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

  constructor(private sortService: SortService) {}

  ngOnChanges(): void {
    if (this.assets && this.assets.length) {
      this.assets = this.sortService.groupAndSort(
        this.assets,
        ['Macro', 'Equities', 'Credit'],
        'assetClass',
        SortOrder.ASC,
        'ticker'
      );
    }
  }

  getSortIcon(order: SortOrder): string {
    if (!order) {
      return;
    }
    return order === SortOrder.ASC ? 'arrow_upward' : 'arrow_downward';
  }

  sort(column: any): void {
    this.displayedColumns
      .filter((col: any) => col.field !== column.field)
      .forEach((col: any) => (col.order = undefined));

    column.order =
      column.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

    this.assets = this.sortService.sort(
      this.assets,
      column.order,
      column.field
    );
  }
}
