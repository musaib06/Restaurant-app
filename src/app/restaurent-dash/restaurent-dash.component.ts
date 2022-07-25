import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelobj: RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showAdd!:boolean
  showBtn!:boolean



  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [""],
      email: [""],
      mobile: [""],
      address: [""],
      services: [""],
    })
    this.getAllData()

  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
    }

  //subscribing the data
  addResto() {
    this.restaurentModelobj.name = this.formValue.value.name;
    this.restaurentModelobj.email = this.formValue.value.email;
    this.restaurentModelobj.mobile = this.formValue.value.mobile;
    this.restaurentModelobj.address = this.formValue.value.address;
    this.restaurentModelobj.services = this.formValue.value.services;
     this.api.postRestaurent(this.restaurentModelobj).subscribe(res => {
      console.log(res);
      alert("Records added successfully");
      let ref =document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    },
      err => {
        alert("something went wrong")
      }
    )

  }
  getAllData() {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData = res;
    })
  }
  deleteResto(data:any){

    this.api.deleteRestaurent(data.id).subscribe(res=>{
      alert("Record Deleted ")
      this.getAllData();
    })
  }
  onEditResto(data:any){
    this.showAdd=false;
    this.showBtn=true;
    this.restaurentModelobj.id=data.id
    this.formValue.controls['name'].setValue(data.name); //getter &setter
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
   this.getAllData();
  }
  updateResto(){
    this.restaurentModelobj.name = this.formValue.value.name;
    this.restaurentModelobj.email = this.formValue.value.email;
    this.restaurentModelobj.mobile = this.formValue.value.mobile;
    this.restaurentModelobj.address = this.formValue.value.address;
    this.restaurentModelobj.services = this.formValue.value.services;
     
    this.api.updateRestaurent(this.restaurentModelobj,this.restaurentModelobj.id).subscribe(res=>{
      alert("record updated successfully");
      console.log(res);
    
      let ref =document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();

    })
  }

  displayStyle = "none";

  openPopup() {
    console.log('working')
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
