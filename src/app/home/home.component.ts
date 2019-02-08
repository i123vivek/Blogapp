import { Component, OnInit ,OnDestroy } from '@angular/core';
import { BlogHttpService} from "../blog-http.service";
import { error } from 'util';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {

  public allBlogs;

  constructor( public blogHttpService :BlogHttpService) {
    console .log("home cunstructor called");
   }

  ngOnInit() {

    console .log("home oninit called");
    this.allBlogs=this.blogHttpService.getAllBlogs().subscribe(
      data=>{
        console.log("logging  data");
        console.log(data);
        this.allBlogs=data["data"];
      },
      error=>{
        console.log("some error occurred");
        console.log(error.errorMessage)
      }

    )


  }


  ngOnDestroy() {
    console .log("home Ondestroy called");
  }
}
