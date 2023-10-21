import { Component, OnInit } from '@angular/core';
import {AdmEventService, ServiceEventAdm} from "../../shared/services/adm-event.service";

@Component({
  selector: 'app-adm-event',
  providers:[AdmEventService, ServiceEventAdm],
  templateUrl: './adm-event.component.html',
  styleUrls: ['./adm-event.component.scss']
})
export class AdmEventComponent implements OnInit {

  ngOnInit() {
  }

  employees: AdmEventService[];

  lookupData: any;

  constructor(service: ServiceEventAdm) {
    this.employees = service.getEmployees();
    this.lookupData = {
      store: this.employees,
      sort: 'Full_Name',
    };
  }

  editorPreparing(e) {
    if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  }

  initNewRow(e) {
    e.data.Head_ID = 1;
  }


}
