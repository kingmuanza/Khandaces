import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecouvrirTagsPage } from './decouvrir-tags.page';

describe('DecouvrirTagsPage', () => {
  let component: DecouvrirTagsPage;
  let fixture: ComponentFixture<DecouvrirTagsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecouvrirTagsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DecouvrirTagsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
