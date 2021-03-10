import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimulateExamPage } from './simulate-exam.page';

describe('SimulateExamPage', () => {
  let component: SimulateExamPage;
  let fixture: ComponentFixture<SimulateExamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulateExamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulateExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
