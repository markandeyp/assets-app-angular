import { Component, OnInit } from '@angular/core';
import { AssetService } from './services/asset.service';
import { SortService } from './services/sort.service';
import Asset from './types/asset';
import { SortOrder } from './types/sort-order';

@Component({
  selector: 'asset-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AssetAppComponent implements OnInit {
  assets: Asset[];

  constructor(
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.assetService.fetchAssets().subscribe((assets) => {
      this.assets = assets;
    });
  }
}
