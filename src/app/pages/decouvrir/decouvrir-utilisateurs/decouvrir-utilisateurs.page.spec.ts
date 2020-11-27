import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecouvrirUtilisateursPage } from './decouvrir-utilisateurs.page';

describe('DecouvrirUtilisateursPage', () => {
  let component: DecouvrirUtilisateursPage;
  let fixture: ComponentFixture<DecouvrirUtilisateursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecouvrirUtilisateursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DecouvrirUtilisateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
