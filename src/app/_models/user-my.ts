import {Course} from './course';
/**
 * interface to represent the current user loggen in
 */
export interface UserMy {
    /**
     * user id that is stored in the database
     */
    user: number;
    /**
     * holds whether the person is a professor or not
     */
    is_professor: boolean;
    /**
     * contains the list of courses the person is associated.He/She can be 
     * either a Professor or TA or a student
     */
    courses: Array<Course>;
}
