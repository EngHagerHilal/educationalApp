export interface Question {
    canAttachFile?: number
    class_id?: number
    created_at?: Date | string
    diff_degree?: number
    id?: number
    isActive?: number
    lesson_id?: number
    ministryQuestion?: number
    nestedQuestions?: NestedQuestions []
    onlyExam?: number
    questionHeader?: string
    subject_id?: number
    teacher_id?: number
    text?: string
    type?: string
    unit_id?: number
    updated_at?: Date | string
    user_id?: number
    weight?: number
    answer_points?: answer_point[]
}
interface NestedQuestions{
    answer?: number
    answers?: answer []
    clarification_false?: string
    clarification_true?: string
    created_at?: Date | string
    id?: number
    question_id?: number
    text?: string
    updated_at?: Date | string
    has_multiple_answer?: number
    wrong_word?: string
    picture?: string
    points?: point []
}
interface answer{
    clarification?: string
    created_at?: Date | string
    id?: number
    question_id?: number
    text?: string
    updated_at?: Date | string
    hint_text?: string
    point?: number
}
interface point{
    created_at?: Date | string
    id?: number
    marker?: string
    point?: number
    question_id?: number
    updated_at?: Date | string
}
interface answer_point{
    created_at?: Date | string
    id?: number
    text?: string
    question_id?: number
    updated_at?: Date | string
}
