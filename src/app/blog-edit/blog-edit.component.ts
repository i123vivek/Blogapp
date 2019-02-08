import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {BlogHttpService} from '../blog-http.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories = ["comedy","drama","Action","technology"];

  constructor( public blogHttpService :BlogHttpService,public toastr: ToastrManager,private _route:ActivatedRoute,private router:Router) 
  { 
    console.log("blog edit constructor called");
  }

  ngOnInit() {

    console.log("blog edit oninit called");
     let  myBlogId =this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.currentBlog=this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data =>{
        console.log ("logging data");
        console.log(data);
        this.currentBlog=data.data;
        this.toastr.successToastr('This is success toast.', 'Success!');

      },

      error =>{
        console.log ("some error message occured");
        console.log(error.errorMessage);
        this.toastr.errorToastr('This is error toast.', 'Oops!');

        
      }
    )
  }

  public editThisBlog():any{
    this.blogHttpService.editBlog(this.currentBlog.blogId,this.currentBlog).subscribe(
      data =>{
        
        console.log(data);
        this.toastr.successToastr('blog edited .', 'Success!');

        
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },1000)
      },

      error =>{
        console.log ("some error message occured");
        console.log(error.errorMessage);
        this.toastr.errorToastr('This is error toast.', 'Oops!');

        
      }
    )
  }


}
