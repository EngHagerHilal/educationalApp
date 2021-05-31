import { User } from './user';
import { Subject } from './subject';
import { School } from './school';
import { Grade } from './grade';
import { Class } from './class';
import { Semester } from './semester';
export interface Student {
    class?: Class
    class_id?: number
    created_at?: Date | string
    grade?: Grade
    grade_class?: Grade
    id?: number
    school?: School
    school_id?: number
    subjects?: Subject []
    updated_at?: Date | string
    user?: User
    user_id?: number

    name?: string
    pivot?: {parent_id?: number, student_id?: number}
    user_code?: string

    active_semester?: Semester
}
