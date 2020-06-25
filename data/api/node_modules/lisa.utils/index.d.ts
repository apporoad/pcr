/**类声明*/
declare class Type{

    isString(obj : any) : boolean

    isObject(obj : any) :boolean

    isNumber(obj : any) : boolean

    isArray(obj : any) : boolean

    isUndefined(obj : any) : boolean

    isFunction(obj : any) :boolean

    isNull(obj : any) : boolean

    isSymbol(obj:any) : boolean

    isBoolean(obj: any) : boolean

    isRegExp(obj : any) : boolean

    isAsyncFunction(obj : any) :boolean
}

/**类声明*/
declare class Async{
    /**
     * 同同步
     * @param array 
     * @param one 
     * @param compareFn 支持同异步function
     */
    ArrayContains(array : Array, one , compareFn ? : Promise)  : Promise

    /**
     * 同同步
     * @param array1 
     * @param array2 
     * @param compareFn 支持同异步function
     */
    ArrayEquals (array1 :Array, array2 : Array, compareFn?: Promise) : Promise
    
    /**
     * 
     * @param array 
     * @param one 
     * @param compareFn 
     */
    ArrayIndexOf (array : Array, one , compareFn ? : Promise)  : Promise


    ArrayFilter(array : Array, one, compareFn? : Promise)  : Promise
    
    /**
     * todo
     * @param array 
     * @param compareFn 
     */
    ArraySort (array : Array, compareFn ? : Promise) : Promise

    /**
     * todo
     * @param array 
     * @param compareFn 
     */
    ArrayDistinct(array : Array, compareFn ?: Promise) : Promise

    ArrayRemove (array : Array, arrayOrOneRemoving, compareFn ? : Promise) :Promise
}

declare class Utils{


    /**
     *   is  instance of  string
     *  是否是字符串
     */
     Type: Type


    /**
     * 字符串是否以xx结尾
     * @param originStr 
     * @param endStr 
     */
    endWith(originStr : string,endStr : string): boolean

    /**
     * 生成uuid
     */
    uuid():String

    /**
     * 生成guid
     */
    guid():String
    
    /**
     * 
     * @param str 
     * @param end  string 或者 string[] default is string.blank
     */
    endTrim (str:string,end? : string) : string

    startWith (originStr : string , startStr: string) : boolean

    /**
     * 
     * @param str 
     * @param start  string 或者 string[]   default is string.blank
     */
    startTrim (str:string,start? :string) : string

    /**
     * 生成不重复的随机整数 randUnique(0,100,4)
     * @param start 
     * @param end 
     * @param size 
     */
    randUnique (start : number, end : number, size : number) : Array<number>

    /**
     * 
     * @param str 
     * @param searchStr 支持正则匹配
     */
    indexOfString(str : string,searchStr : string) : number

    ArrayContains (array :Array<any>,one : any, compareFn? : Function) :boolean 

    ArrayEquals ( array1 : Array<any>,array2 : Array<any>,compareFn? : Function) :boolean

    ArrayIndexOf (array : Array<any>,one : any, compareFn? : Function) : number

    ArraySort (array : Array<any>,compareFn? : Function) : Array<any>

    ArrayDistinct (array : Array<any> ,compareFn ? : Function) : Array<any>

    ArrayRemove (array : Array<any>,arrayOrOneRemoving,compareFn ? : Function) : Array<any>

    ArrayFilter ( array : Array<any>,one : any, compareFn? :Function) : Array<any>

    deepCopy( obj : Object) :Object

    /**
     * 异步函数入口
     */
    Async : Async

    /**
     * 删除文件夹
     * @param path 
     */
    rmrf (path : String)

    /**
     * 创建多级文件夹
     * @param dirname  
     */
    mkdirp(dirname :String) : Boolean

    /**
     * 获取hash码
     * @param obj
     * @param caseSenseless 
     */
    hashCode  (obj , caseSenseless ? : Boolean) :String
}


export = new Utils()