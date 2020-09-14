import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AssetAppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AssetTableComponent } from './components/table/table.component';

@NgModule({
  declarations: [AssetAppComponent, AssetTableComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AssetAppComponent],
})
export class AppModule {}
