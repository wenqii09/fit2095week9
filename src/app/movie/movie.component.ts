import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  // injecting into constructor, dbService is the provider 
  constructor(private dbService: DatabaseService) {}

  actorsDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  

  //Get all Actors
    onGetActors() { 
      this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data; 
    });
    }
      //Create a new Actor, POST request
    onSaveActor() {
    let obj = { 
      name: this.fullName, 
      bYear: this.bYear 
    }; 
    this.dbService.createActor(obj).subscribe(result => {
    this.onGetActors(); });
    }
      // Update an Actor
    onSelectUpdate(item) { 
      this.fullName = item.name; this.bYear = item.bYear; this.actorId = item._id;
      }
      onUpdateActor() {
      let obj = { 
        name: this.fullName, 
        bYear: this.bYear 
      }; 
      
      this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors(); });
    }
      //Delete Actor
    onDeleteActor(item) { 
      this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors(); });
    }
      // This lifecycle callback function will be invoked with the component get

    ngOnInit() { 
      this.onGetActors();
    }

    changeSection(sectionId) { 
      this.section = sectionId; 
      this.resetValues();
    }

    resetValues() { 
      this.fullName = ""; 
      this.bYear = 0; 
      this.actorId = "";
    } 

}