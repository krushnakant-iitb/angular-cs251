import {Course} from './course';
/**
 * this interface is for the list of students registered in a course
 */
export interface UserMyList {
    user: number;
    is_professor: boolean;
    token: string;
    courses: Array<Course>;
    username:String;
}