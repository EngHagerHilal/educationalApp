import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerviousRunningExamsPage } from './pervious-running-exams.page';

describe('PerviousRunningExamsPage', () => {
  let component: PerviousRunningExamsPage;
  let fixture: ComponentFixture<PerviousRunningExamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerviousRunningExamsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerviousRunningExamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
