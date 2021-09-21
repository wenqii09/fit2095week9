import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  //////////////////////////////////// for movie//////////////////////////////////
  title: string = "";
  year: number = 0;
  movieId: string = "";
  y1: number = 0;
  y2: number = 0;

  // injecting into constructor, dbService is the provider 
  constructor(private dbService: DatabaseService) {}


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
    this.onGetActors(); 
    this.onGetMovies();});
    }

      // Update an Actor
    onSelectUpdate(item) { 
      this.fullName = item.name; 
      this.bYear = item.bYear; 
      this.actorId = item._id;
      }

    onUpdateActor() {
    let obj = { 
      name: this.fullName, 
      bYear: this.bYear 
    }; 
    
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
    this.onGetActors();
    this.onGetMovies(); });
    }
      //Delete Actor
    onDeleteActor(item) { 
      this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
      this.onGetMovies(); });
    }
      // This lifecycle callback function will be invoked with the component get

    ngOnInit() { 
      this.onGetActors();
      this.onGetMovies();
    }

    changeSection(sectionId) { 
      this.section = sectionId; 
      this.resetValues();
    }

    resetValues() { 
      this.fullName = ""; 
      this.bYear = 0; 
      this.actorId = "";

      this.title = "";
      this.year = 0; 
    } 


    //////////////////////////////////// Get all Movie//////////////////////////////////
    onGetMovies() { 
      this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data; 
    });
    }


     //Create a new Movie, POST request////
     onSaveMovie() {
      let obj = { 
        title: this.title, 
        year: this.year,
      }; 
      this.dbService.createMovie(obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies(); });
      }

    
      // delete  movie by title
      onDeleteMovie(title) { 
        for(let i=0; i < this.moviesDB.length;i++){
            if (this.moviesDB[i].title == title){
                this.movieId = this.moviesDB[i]._id;
            }
        };

        this.dbService.deleteMovie(this.movieId).subscribe(result => {
        this.onGetActors();
        this.onGetMovies(); });
      }


      // delete movie by year 
      onDeleteMovieByYear(y1, y2) { 
        for(let i=0; i < this.moviesDB.length;i++){
          if (this.moviesDB[i].year <= y1 && this.moviesDB[i].year >= y2){
            this.movieId = this.moviesDB[i]._id;
            this.dbService.deleteMovie(this.movieId).subscribe(result => {})
          }
        };

        // this.dbService.deleteMovieByYear().subscribe(result => {
        this.onGetActors();
        this.onGetMovies(); 
      // });
      }

      onSelectMovie(item) { 
        this.year = item.year;
        this.movieId = item._id;
        this.title = item.title; 
        }


      onAddActor(){
      let obj = { 
        actorid: this.actorId,
      }; 

        this.dbService.addActor(this.movieId, obj).subscribe(result => {
          this.changeSection(1);
          this.onGetActors();
          this.onGetMovies(); 
        })  

      }

}