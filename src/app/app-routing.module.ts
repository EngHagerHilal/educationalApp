import { IsstudentguardService } from './services/guard/isstudentguard.service';
import { IsloginguardService } from './services/guard/isloginguard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'child/myProfile',
    pathMatch: 'full'
  },
  { path: 'user/login', loadChildren: () => import('./pages/user/login/login.module').then( m => m.LoginPageModule), canActivate: [IsloginguardService]},
  { path: 'child/myProfile', loadChildren: () => import('./pages/child/my-profile/my-profile.module').then( m => m.MyProfilePageModule), canActivate: [IsstudentguardService]},
  { path: 'child/previousFinalExams', loadChildren: () => import('./pages/child/previous-final-exams/previous-exams.module').then( m => m.PreviousExamsPageModule), canActivate: [IsstudentguardService]},
  { path: 'child/newFinalExams', loadChildren: () => import('./pages/child/new-final-exams/coming-exams.module').then( m => m.ComingExamsPageModule), canActivate: [IsstudentguardService]},
  { path: 'child/exam/:id/:type', loadChildren: () => import('./pages/child/exam/exam.module').then( m => m.ExamPageModule), canActivate: [IsstudentguardService]},
  { path: 'child/newRunningExams', loadChildren: () => import('./pages/child/new-running-exams/new-running-exams.module').then( m => m.NewRunningExamsPageModule), canActivate: [IsstudentguardService]},
  { path: 'child/perviousRunningExams', loadChildren: () => import('./pages/child/pervious-running-exams/pervious-running-exams.module').then( m => m.PerviousRunningExamsPageModule), canActivate: [IsstudentguardService]},
  { path: 'child/perviousHomework', loadChildren: () => import('./pages/child/pervious-homework/pervious-homework.module').then( m => m.PerviousHomeworkPageModule), canActivate: [IsstudentguardService] },
  { path: 'child/newHomework', loadChildren: () => import('./pages/child/new-homework/new-homework.module').then( m => m.NewHomeworkPageModule), canActivate: [IsstudentguardService] },
  { path: 'child/resultOfSubjects', loadChildren: () => import('./pages/child/result-of-subjects/result-of-subjects.module').then( m => m.ResultOfSubjectsPageModule), canActivate: [IsstudentguardService] },
  { path: 'child/simulateExam', loadChildren: () => import('./pages/child/simulate-exam/simulate-exam.module').then( m => m.SimulateExamPageModule), canActivate: [IsstudentguardService] },
  { path: 'child/homeworkExam/:id', loadChildren: () => import('./pages/child/homework-exam/homework-exam.module').then( m => m.HomeworkExamPageModule) },
  { path: 'parents/myProfile', loadChildren: () => import('./pages/parents/my-profile/my-profile.module').then( m => m.MyProfilePageModule) },
  { path: 'parents/chlidProfile/:id', loadChildren: () => import('./pages/parents/chlid-profile/chlid-profile.module').then( m => m.ChlidProfilePageModule) },
  { path: 'parents/childexams/:id/:type', loadChildren: () => import('./pages/parents/child-exams/child-exams.module').then( m => m.ChildExamsPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
