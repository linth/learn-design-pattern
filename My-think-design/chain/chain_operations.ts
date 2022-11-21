/**
 * chain operation
 * 
 */

interface OConversion<T> {
    doConvert(input_data: T): T;
}

abstract class OAbsConversion<T> implements OConversion<T> {
    doConvert(item: T): T {
        try {
            return this.executeConversion(item);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    
    executeConversion(item: T): T {
        throw new Error("executeConversion() must be overridden.")
    }
}

class ConcreteConversion<T> extends OAbsConversion<T> {
    executeConversion(item: T): T {
        if (typeof item === 'string') {
            console.log('type is string, ', item);
        } else {
            console.log(item, typeof item);            
        }
        return item;
    }
}


let cc = new ConcreteConversion();
cc.executeConversion("hello world"); // type is string,  hello world
cc.executeConversion(200); // 200 number