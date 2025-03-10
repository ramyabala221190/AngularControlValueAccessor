import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageSelectorComponent } from './profile-image-selector.component';

describe('ProfileImageSelectorComponent', () => {
  let component: ProfileImageSelectorComponent;
  let fixture: ComponentFixture<ProfileImageSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileImageSelectorComponent]
    });
    fixture = TestBed.createComponent(ProfileImageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
