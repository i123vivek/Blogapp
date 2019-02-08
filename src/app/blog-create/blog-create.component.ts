import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  constructor(public blogHttpService: BlogHttpService,public toastr: ToastrManager, private _route: ActivatedRoute, private router: Router) { 

  }
  public blogTitle: string;
  public blogBodyHtml: string;
  public blogDescription: string;
  public blogCategory: string;
  public possibleCategories = ["Comedy","Drama","Action","Technology"]

  ngOnInit() {
  }
  public createBlog1(): any{
    let blogData = {
      title:this.blogTitle,
      description:this.blogDescription,
      blogBody:this.blogBodyHtml,
      category:this.blogCategory
    }

    console.log(blogData);
    this.blogHttpService.createBlog(blogData).subscribe(
      data=>{
        console.log("blog created")
        console.log(data);
        this.toastr.successToastr('blog created.', 'Success!');
        //this.toastr.successToastr('This is success toast.', 'Success!');
       // this.toastr.success('Hello world!', 'Toastr fun!');
        
       

        setTimeout(()=>{
          this.router.navigate(['blog',data.data.blogId]);
        },1000)
       /* this.toastr.success('blog posted successfully','Success!');

       

        setTimeout(()=>{
          this.router.navigate(['blog',data.data.blogId]);
        },1000
        )*/

      },
      error=>{
        console.log("some error occurred");
        console.log(error.errorMessage);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
      }
    )

  }

}
