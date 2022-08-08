import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
})
export class CreateEmployeeComponent implements OnInit {
  createEmploye: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  tittle = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createEmploye = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editEmployee();
  }

  addEmployee()
  {
    const empleado: any = {
      nombre: this.createEmploye.value.nombre,
      apellido: this.createEmploye.value.apellido,
      salario: this.createEmploye.value.salario,
      documento: this.createEmploye.value.documento,
      fechaCreacion: new Date(),
      fechaUp: new Date(),
    };
    this.loading = true;

    this._employeeService
      .addEmployee(empleado)
      .then(() => {
        this.toastr.success(
          'El empleado fue registrado con exito',
          'Empleado registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.router.navigate(['/viewEmployees']);
      })
      .catch((error) => {
        this.toastr.error(
          'El empleado fue registrado con exito',
          'Empleado registrado'
        );
      });
  }

  editEmployeeId(id :string)
  {
    this.loading = true;
    const empleado: any = {
      nombre: this.createEmploye.value.nombre,
      apellido: this.createEmploye.value.apellido,
      salario: this.createEmploye.value.salario,
      documento: this.createEmploye.value.documento,
      fechaUp: new Date(),
    };

    this._employeeService.updateEmployee(id,empleado).then(()=>{
      this.loading =false;
      this.toastr.info("El empleado fue modificado con exito","Empleado modificado",{
        positionClass: 'toast-bottom-right'
      })
    }).catch( error => {
      this.loading =false;
      console.log(error)
      this.toastr.error("El empleado NO fue modificado con exito","Error al modificar",{
        positionClass: 'toast-bottom-right'
      })
    })

    this.router.navigate(['/viewEmployees']);

  }

  addEditEmployee() {
    this.submitted = true;
    if (this.createEmploye.invalid) {
      return;
    }

    if (this.id === null) {
      this.addEmployee();
    }else{
      this.editEmployeeId(this.id)
    }
    
  }

  editEmployee() {
    if (this.id !== null) {
      
      this.tittle = 'Editar';
      this.loading = true;

      this._employeeService.getEmployee(this.id).subscribe((data) => {
        this.loading = false;
        this.createEmploye.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        });
      });
    }


  }
}
