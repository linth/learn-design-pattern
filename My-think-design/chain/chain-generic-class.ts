/**
 * 
 */

{
    interface WrapperObject<T> {
        callSelf(): WrapperObject<T>;
        getT(): T;
    }
    
    
    class GetWrapperObject<T> implements WrapperObject<T> {
        t: T;
        
        // constructor.
        constructor(t: T) {
            this.t = t;
        }

        // get object itself.
        callSelf(): GetWrapperObject<T> {
            return this;
        }

        // get T attributes.
        getT(): T {
            return this.t;
        }
    }

    interface WrapperObject2<T, K> {
        callSelf(): WrapperObject2<T, K>;
        getT(): T;
        getK(): K;
    }

    class GetManyWrapperObject<T, K> implements WrapperObject2<T, K> {
        t: T;
        k: K;

        constructor(t: T, k: K) {
            this.t = t;
            this.k = k;
        }

        callSelf(): GetManyWrapperObject<T, K> {
            return this;
        }

        // get T attributes.
        getT(): T {
            return this.t;
        }

        // get K attributes.
        getK(): K {
            return this.k;
        }
    }

    /** a example concrete class. */
    class Student {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        getName(): string { return this.name; }
        getAge(): number { return this.age; }

        takeAClass(className: string = 'English'): Student {
            console.log(`student: ${this.name} takes a new ${className} class.`);            
            return this;
        }
    }

    /** second example concrete class. */
    class Teacher {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        getName(): string { return this.name; }
        getAge(): number { return this.age; }

        teachStudents(studentName: string): Teacher {
            console.log(`teacher: ${this.name} teachs a student: ${studentName} in a classroom.`);
            return this;
        }
    }

    // example 1: only one class object.
    let s: Student = new Student('george', 33);
    console.log(s); // Student { name: 'george', age: 33 }
    
    let w: WrapperObject<Student> = new GetWrapperObject<Student>(s);
    console.log(w.callSelf().getT()); // Student { name: 'george', age: 33 }


    // example 2: two class objects.
    let t: Teacher = new Teacher('Taylor', 40);
    let g = new GetManyWrapperObject<Student, Teacher>(s, t);

    // get teacher and student by order.
    let res = g.callSelf()
        .getK()
        .teachStudents(g.getT().getName())
    
    let res2 = g.callSelf()
        .getT()
        .takeAClass()
    
            
    console.log('res', res);
    console.log('res2', res2);

    /**
     * !Result:
     * teacher: Taylor teachs a student: george in a classroom.
     * student: george takes a new English class.
     * res Teacher { name: 'Taylor', age: 40 }
     * res2 Student { name: 'george', age: 33 }
     */
}