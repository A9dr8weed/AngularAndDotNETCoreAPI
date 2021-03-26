import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  EmployeeList: any = [];

  ModalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  constructor(private _service: SharedService) { }

  ngOnInit() {
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this._service.getEmployeeList().subscribe(data => {
      this.EmployeeList = data;
    });
  }

  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "immediately.jpg"
    }

    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmployeeList();
  }

  editClick(item) {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item) {
    if (confirm("Are you sure?")) {
      this._service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmployeeList();
      });
    }
  }
}
