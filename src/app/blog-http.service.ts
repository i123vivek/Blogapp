import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';

import{Observable}from 'rxjs';
import {catchError}from 'rxjs/operators';
import {tap}from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public allBlogs;
  public baseUrl ='https://blogapp.edwisor.com/api/v1/blogs';
  public authKeyMe =' NDc0NDY0NzE3ZGY3MmM0NTE5ZjcxZWVhY2M0Y2U4OTU5MzQ5OWFiNGQ3ZDE1ZDY5MmRhMzQxMzE1MTFjNDg5MjNjZWRhMjliODIzODFlNmY0NTNiOGQ4MmZhZTNlNzIwMDY2MWFjMjY5Y2JjN2MzMzBkYzUwODk5YjUxM2NiZTk2YTM1 ';


  constructor(public _http:HttpClient) { 
    console.log('blog http services called');
  }

  private handleError(err:HttpErrorResponse){
    console.log("handle error http calls");
    console.log(err.message);
    return Observable.throw(err.message);
  }

  public getAllBlogs(): any
  {
    let myResponse=this._http.get(this.baseUrl+'/all?authToken='+this.authKeyMe);
    console.log(myResponse);
    return myResponse;
  }
  public getSingleBlogInformation(currentBlogId): any
  {
    let myResponse=this._http.get(this.baseUrl+'/view'+'/'+currentBlogId+'?authToken='+this.authKeyMe);
    console.log(myResponse);
    return myResponse;
  }

  public createBlog(blogData): any
  {
    let myResponse=this._http.post(this.baseUrl+'/create'+'?authToken='+this.authKeyMe,blogData);
    console.log(myResponse);
    return myResponse;
  }

  public deleteBlog(blogId): any
  {
    let data={};
    let myResponse=this._http.post(this.baseUrl+'/' +blogId+ '/delete' +'?authToken='+this.authKeyMe,data);
    console.log(myResponse);
    return myResponse;
  }

  public editBlog(blogId,blogData): any
  {
    let myResponse=this._http.put(this.baseUrl+'/' +blogId+ '/edit' +'?authToken='+this.authKeyMe,blogData);
    console.log(myResponse);
    return myResponse;
  }
}
