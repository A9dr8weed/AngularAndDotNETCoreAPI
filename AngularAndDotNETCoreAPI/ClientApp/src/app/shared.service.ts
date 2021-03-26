import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:5001/api";
  readonly PhotoUrl = "https://localhost:5001/Photos/"

  constructor(private _http: HttpClient) { }

  // Методи для роботи з таблицею Department
  getDepartmentList(): Observable<any[]> {
    return this._http.get<any>(this.APIUrl + '/department');
  }

  addDepartment(val: any) {
    return this._http.post(this.APIUrl + '/department', val);
  }

  updateDepartment(val: any) {
    return this._http.put(this.APIUrl + '/department', val);
  }

  deleteDepartment(val: any) {
    return this._http.delete(this.APIUrl + '/department/' + val);
  }

  // Методи для роботи з таблицею Employee
  getEmployeeList(): Observable<any[]> {
    return this._http.get<any>(this.APIUrl + '/Employee');
  }

  addEmployee(val: any) {
    return this._http.post(this.APIUrl + '/Employee', val);
  }

  updateEmployee(val: any) {
    return this._http.put(this.APIUrl + '/Employee', val);
  }

  deleteEmployee(val: any) {
    return this._http.delete(this.APIUrl + '/Employee/' + val);
  }

  UploadPhoto(val: any) {
    return this._http.post(this.APIUrl + '/Employee/SaveFile', val);
  }

  getAllDepartmentNames() :Observable<any[]> {
    return this._http.get<any[]>(this.APIUrl + '/Employee/GetAllDepartmentNames');
  }
}
