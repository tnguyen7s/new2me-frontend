import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'

})
export class PhoneService{

  isPhoneOrIpad(){
    const mql = window.matchMedia("(max-width: 1080px)");
    const phoneDevice = mql.matches;

    return phoneDevice;
  }
}
