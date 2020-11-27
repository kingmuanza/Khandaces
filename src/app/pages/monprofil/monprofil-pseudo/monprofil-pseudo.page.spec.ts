import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonprofilPseudoPage } from './monprofil-pseudo.page';

describe('MonprofilPseudoPage', () => {
  let component: MonprofilPseudoPage;
  let fixture: ComponentFixture<MonprofilPseudoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonprofilPseudoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonprofilPseudoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
