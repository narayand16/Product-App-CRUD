import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, item: string){
    localStorage.setItem(key, item);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getObject(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
