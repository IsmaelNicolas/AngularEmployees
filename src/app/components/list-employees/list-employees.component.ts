import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
})
export class ListEmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private _employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe((data) => {
      this.employees = [];
      data.forEach((element: any) => {
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  deleteEmployee(id: string) {
    this._employeeService.deleteEmployee(id).then(() => {
      this.toastr.info("Empleado eliminado con exito","Empleado eliminado",{
        positionClass: 'toast-bottom-right'
      })
    }).catch(()=>{
      this.toastr.error("No se pueod eliminar el empleado","No se elimino!!")
    })
    
  }
}
