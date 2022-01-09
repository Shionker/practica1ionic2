import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutPage } from './out.page';

describe('OutPage', () => {
  let component: OutPage;
  let fixture: ComponentFixture<OutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
