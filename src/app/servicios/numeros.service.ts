import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumerosService {

  constructor() { }

  soloNumeros(event: KeyboardEvent) {
    const key = event.key;
    if (!/^[0-9]$/.test(key)) { // Solo permite números entre 0 y 9
      event.preventDefault();
    }
  }


}
