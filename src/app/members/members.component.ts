import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

interface Member {
  id: string;
  login: string;
  avatar_url: string;
}

@Component({
  selector: 'sl-members',
  template: `
    <h3>Angular Orgs Members</h3>
    <ul *ngIf="members">
      <li *ngFor="let member of members;">
        <p>
          <img [src]="member.avatar_url" width="48" height="48"/>
          ID：<span>{{member.id}}</span>
          Name: <span>{{member.login}}</span>
        </p>
      </li>
    </ul>
    `
})
export class MembersComponent implements OnInit {
  
  members: Member[];

  constructor(private http: HttpClient) { } // (2)

  ngOnInit() {
    this.http.get<Member[]>(`https://api.github.com/orgs/angular/members?page=1&per_page=5`) // (3)
      .subscribe(data => {
        if (data) this.members = data; // (4)
      });
  }
}
