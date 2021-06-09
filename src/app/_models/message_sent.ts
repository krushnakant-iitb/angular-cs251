/**
 * this interface is for message content which contains the message text and the message priority 
 * which is either high or low
 */
export interface MessageSent {
    message_text:string;
    message_priority:boolean;
   
}