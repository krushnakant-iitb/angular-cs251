export interface Message {
    id:number;
    sent:string;
    message:string;
    /**
     * it stores the type who should receive,it can be student or TA
     */
    to:string;
    course:number;
    by:number;
    prior:boolean;
    /**
     * It stores who all read the message
     */
    read_by:Array<number>;
    from_username:string;
    is_professor:boolean;
}