# CrudService

A simple crud service for simple Angular applications.

## Installation

    npm install @jorns/ng-crud-service

## Usage

### 
Import the module into your `AppModule`. `.forRoot` Takes an object with an apiUrl property.
Set the desired url for the API you consume and it will be prefixed on al your requests.

    imports: [
        .......,
        CrudServiceModule.forRoot({
          apiUrl: 'https://example.com/api',
        })
    ]

### Creating a service

#### Using a schematic:

    ng generate @jorns/ng-crud-service:crud-service --name YourServiceName --path your/service/path

#### Custom: 

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
    }

### Using the service
Now you can import and use your service inside your components. Add the generic `Type` you expect
to return from your API. Al CRUD methods return an `Observable<T>` of the given generic Type.

    import { YourService } from 'your.service.ts';

    this.myservice.create<Todo>().subscribe();
    this.myservice.read<Todo[]>().subscribe();
    this.myservice.update<Todo>().subscribe();
    this.myservice.delete<Todo>().subscribe();

If the API's response has a different response i.e. 
    { result: 
      { todo },
      message: 'Success'
      status: 200
    } 
or an nested array with your results 
    { result: [
        { todo },
        { todo },
        { todo },
      ],
      message: 'Success'
      status: 200
    }

You can pass in your own Request class or interface if you need more then return a single class/interface or Array.
For instance: 

    interface Request<T> {
      result: T;
      status: number;
      message: string;
      errors?: null|[];
    };

    `this.myservice.read<Request<Todo[]>>().subscribe();`

### Adding route parameters
All CRUD methods take a `Param` type. This can be of type `string|number|array`. When you have 
a singel parameter you can pass in a `string` or `number`. When dealing with multipe url parameters you can add the in
the right order into an `array`;

    create<T>(formData?: FormDat a,param?: Param): Observable<T>
    read<T>(param?: Param): Observable<T>
    update<T>(param: Param, formData?: FormData): Observable<T>
    delete<T>(param: Param): Observable<T>

    this.myservice.update<Todo>([10,'edit'],formData).subscribe();
    // Creates the url todo/10/edit
    this.myservice.create<Todo>(formData,['category','5']).subscribe();
    // Creates the url todo/category/5
    this.myservice.delete<Todo>(10).subscribe();
    // Creates the url todo/10

### Extending the service

Of course you can add your own methods to the service you created when basic CRUD is not enough

  export class YourService extends CrudService {
      public resourcePrefix = 'todo';

      constructor(public http: HttpClient) {
        super(http);
      }
      // for example return all todo's which belong to a category of 10.
      customMethod(id: number): Observable<IRequest<Todo[]>> {
        return this.http.get<IRequest<Todo[]>>(`/${this.resourcePrefix}/categories/10`);
      }
    }

Using `createUrlTree(params: Param)`
    /** 
     * for example return all todo's which belong to a category of 10, the params value
     * givin in this case is an `Array`. `['category','5']`.
     * This method will build up the url including the `resourcePrefix`.
     */
     
    otherCustomMethod(params: Param): Observable<IRequest<Todo[]>> {
      return this.http.get<IRequest<Todo[]>>(this.createUrlTree(params));
    }
