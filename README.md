# CrudService

A simple crud service for simple applications.

## Installation

npm install @jorns/ng-crud-service

## Usage

### Creating a service

Create a service and extend `CrudService`. Provide a resource prefix for your service which will be
prepended to all your requests made.
Inject the `HttpClient` to the contructor and provide to the baseclass constructor with `super(http)`.

    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { CrudService } from '@jorns/crud-service';

    @Injectable({
      providedIn: 'root'
    })
    export class YourService extends CrudService {
      public resourcePrefix = 'todo';

      constructor(public http: HttpClient) {
        super(http);
      }

### Using the service
Now you can import and use your service inside your components. Add the generic Type you expect
to return from your API. 

    import { YourService } from 'your.service.ts';

    this.myservice.create<Todo>().subscribe();
    this.myservice.read<Todo[]>().subscribe();
    this.myservice.update<Todo>().subscribe();
    this.myservice.delete<Todo>().subscribe();

If the API's response has a different response i.e. 
    { result: 
      { todo-object },
      message: 'Success'
      status: 200
    } 
or an array 
    { result: [
        { todo-object },
        { todo-object },
        { todo-object },
      ],
      message: 'Success'
      status: 200
    }

You can pass in your own Request class or interface `this.myservice.read<Request<Todo[]>>();`

    interface Request<T> {
      result: T;
      status: number;
      message: string;
      errors?: null|[];
    };
    
### Adding route parameters

