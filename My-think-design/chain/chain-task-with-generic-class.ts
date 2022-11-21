/**
 * chain method by created class which I design.
 */

interface GenericChainObject<T> {
    _object: T;
    call(): T;
}

// simple class to provide chain-method to do your job.
class ChainObject<T> implements GenericChainObject<T> {
    /**
     * only support one class to chain functions.
     */
    _object: T;

    /**
     * constructor
     * 
     * @param object 
     */
    constructor(object: T) {
        this._object = object;
    }

    /**
     * the function provides to call the function of object.
     * 
     * @returns _object: the type of object is <T>.
     */
    call(): T {
        return this._object;
    }
}

interface GenericChainTwoObject<T, K> {
    _fobj: T;
    _sobj: K;    
    fCall(): T;
    sCall(): K;
} 

class ChainTwoObject<T, K> implements GenericChainTwoObject<T, K> {
    /**
     * support two class to chain functions.
     */
    _fobj: T; // first object.
    _sobj: K; // second object.

    /**
     * constructor
     * 
     * @param fobj 
     * @param sobj 
     */
    constructor(fobj: T, sobj: K) {
        this._fobj = fobj;
        this._sobj = sobj;
    }

    /**
     * the function provides to call the function of first object.
     * 
     * @returns _fobj
     */
    fCall(): T {
        return this._fobj;
    }

    /**
     * the function provides to call the function of first object.
     * 
     * @returns _sobj
     */
    sCall(): K {
        return this._sobj;
    }
}

interface ITask {
    show(): void;
    exec_task(): void;
}

class Task1 implements ITask {
    show() { console.log('show task1'); }

    exec_task() {
        console.log('exec task1');
        this.subFirstTask();
        this.subSecondTask();
    }

    subFirstTask() {
        console.log('exec first sub-task.'); 
        return this;
    }
    subSecondTask() {
        console.log('exec first sub-task.');
        return this;
    }
}

class Task2 implements ITask {
    show() { console.log('show task2'); }
    exec_task() { console.log('exec task2'); }
}

let t1 = new Task1();
let t2 = new Task2();

let g = new ChainObject<ITask>(t1)
    .call()
    .exec_task();

let g2 = new ChainObject<ITask>(t2)
    .call()
    .exec_task();


/**
 * ! result:
 * exec task1
 * exec first sub-task.
 * exec first sub-task.
 * exec task2
 */