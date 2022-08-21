import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ctf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ctf.component.html',
  styleUrls: ['./ctf.component.scss']
})
export class CtfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
