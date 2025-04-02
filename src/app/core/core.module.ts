import {NgModule}              from '@angular/core';

import {CommonModule}          from '@angular/common';
import {SharedModule}          from '../shared/shared.module';
import {CoreRoutingModule}     from './core-routing.module';

import {CoreComponent}         from './core.component';
import {BillPageComponent}     from './bill-page/bill-page.component';
import {HistoryPageComponent}  from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent}  from './records-page/records-page.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {DropdownDirective} from './shared/components/directives/dropdown.directive';


@NgModule({
  declarations: [
    CoreComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,

    DropdownDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
  ],
})

export class CoreModule {}
