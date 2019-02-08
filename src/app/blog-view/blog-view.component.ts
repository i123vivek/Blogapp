import { Component, OnInit,OnDestroy } from '@angular/core';
import {ActivatedRoute,Router}from '@angular/router';
import {BlogHttpService} from "../blog-http.service";
import {Location} from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit ,OnDestroy {
 public currentBlog;
  constructor( public blogHttpService :BlogHttpService,public toastr: ToastrManager,private _route:ActivatedRoute,private router:Router,private location:Location)
   { 
     console.log('blog view constructor called')
   }

  ngOnInit() {
    console.log('blog view oninit called');
    let  myBlogId =this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
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

  public deleteThisBlog():any{
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data =>{
        console.log (`blog ${this.currentBlog.blogId} deleted`);
        console.log(data);
        this.toastr.successToastr('blog deleted.', 'Success!');

        
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

  public goBackToPreviousPage()
  {
    this.location.back();
  }

  ngOnDestroy() {
  }

}
