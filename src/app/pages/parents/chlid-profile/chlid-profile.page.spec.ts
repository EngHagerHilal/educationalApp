import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChlidProfilePage } from './chlid-profile.page';

describe('ChlidProfilePage', () => {
  let component: ChlidProfilePage;
  let fixture: ComponentFixture<ChlidProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChlidProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChlidProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
