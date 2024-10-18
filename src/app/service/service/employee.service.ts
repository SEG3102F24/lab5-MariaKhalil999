import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { Employee } from '../../model/employee';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.employeesCollection = collection(firestore, 'employees'); 
  }

  
  addEmployee(employee: Employee): Promise<void> {
    const docRef = doc(this.employeesCollection); 
    return setDoc(docRef, { ...employee, id: docRef.id });
  }

  
  getEmployees(): Observable<Employee[]> {
    const employees = collection(this.firestore, 'employees');
    return collectionData(employees, { idField: 'id' }) as Observable<Employee[]>;
  }
  
}
