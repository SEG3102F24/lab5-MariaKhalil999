import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);

  
  getEmployees(): Observable<Employee[]> {
    const employeesCollection = collection(this.firestore, 'employees');
    return collectionData(employeesCollection, { idField: 'id' }).pipe(
      map((data: any[]) => data.map(emp => ({
        name: emp['name'],
        dateOfBirth: emp['dateOfBirth'] ? emp['dateOfBirth'].toDate() : null,
        city: emp['city'], 
        salary: emp['salary'],
        gender: emp['gender'],
        email: emp['email'],
        id: emp['id']
      })))
    );
  }

  
  addEmployee(employee: Employee): Promise<void> {
    const employees = collection(this.firestore, 'employees');
    return addDoc(employees, { ...employee }).then(() => {
    
    });
  }
}
