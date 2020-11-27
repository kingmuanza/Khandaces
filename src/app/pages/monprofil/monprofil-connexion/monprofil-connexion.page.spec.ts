import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonprofilConnexionPage } from './monprofil-connexion.page';

describe('MonprofilConnexionPage', () => {
  let component: MonprofilConnexionPage;
  let fixture: ComponentFixture<MonprofilConnexionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonprofilConnexionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonprofilConnexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
