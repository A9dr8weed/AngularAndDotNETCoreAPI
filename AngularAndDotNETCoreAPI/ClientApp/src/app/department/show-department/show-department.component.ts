import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  DepartmentList: any = [];

  ModalTitle: string;
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];

  constructor(private _service: SharedService) { }

  ngOnInit() {
    this.refreshDepartmentList();
  }

  refreshDepartmentList() {
    this._service.getDepartmentList().subscribe(data => {
      this.DepartmentList = data;

      this.DepartmentListWithoutFilter = data;
    });
  }

  filterFunction() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el) {
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      ) &&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop, asc) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }

  addClick() {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ""
    }

    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
  }

  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.refreshDepartmentList();
  }

  editClick(item) {
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item) {
    if (confirm("Are you sure?")) {
      this._service.deleteDepartment(item.DepartmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepartmentList();
      });
    }
  }
}
