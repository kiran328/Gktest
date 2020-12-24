import { Component, OnInit } from '@angular/core';

import { HierarchyService } from './hierarchy.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
  entity: any;
  loading: boolean;
  error: string;
  
  constructor(private hierarchyService: HierarchyService) { }

  ngOnInit() {
    this.loading = true;
    this.hierarchyService.getHierarchy()
      .subscribe(response=>{
        this.loading = false;
        this.entity = response.entity.nodeStandardMetadata;
      },err=>{
        this.loading = false;
        this.error = "Something has went wrong";
      })
  }

}
