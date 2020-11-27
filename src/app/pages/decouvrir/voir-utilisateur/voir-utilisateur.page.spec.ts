import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoirUtilisateurPage } from './voir-utilisateur.page';

describe('VoirUtilisateurPage', () => {
  let component: VoirUtilisateurPage;
  let fixture: ComponentFixture<VoirUtilisateurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirUtilisateurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoirUtilisateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
